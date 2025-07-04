const db = require("../../backend/db");
const bcrypt = require("bcrypt");

async function RegisterController(request, reply, fastify) {
  const SALT_ROUNDS = 10;
  try {
    const { username, email, password } = request.body;
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const userData = {
      email: email,
      password: hash,
      username: username,
    };
    const AddUser = `INSERT INTO users (username, email, password) VALUES(?, ? , ?)`;
    await db.runAsync(AddUser, [
      userData.username,
      userData.email,
      userData.password,
    ]);
    console.log(userData);
    const query = `SELECT * FROM users WHERE email = ?`;
    const newUser = await db.getAsync(query, [email]);

    const token = fastify.jwt.sign(newUser);

    return reply
      .setCookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24,
      })
      .status(200)
      .send({ message: "Register successful", token: token });
  } catch (err) {
    console.error(err.message);
    reply.status(400).send({ err: err.message });
  }
}

async function LoginController(request, reply, fastify) {
  try {
    const email = request.body.email;

    const query = `SELECT * FROM users WHERE email = ?`;
    const user = await db.getAsync(query, [email]);
    if (!user) {
      throw new Error("User Not found");
    }
    const password = request.body.password;
    // console.log("user : ", user);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.error("Password Incorrect");
      return reply
        .status(404)
        .send({ success: false, err: "Password Incorrect" });
    }

    const userData = {
      id: user.id,
      email: user.email,
      password: user.password,
      username: user.username,
      role: user.role, // Default role if not set
      picture: user.picture || null, // Optional picture field
    };

    const token = fastify.jwt.sign(userData);
    console.log("Token generated successfully", token);

    console.log("Token : ", token);
    // Set the token in a cookie
    reply
      .setCookie("token", token, {
        httpOnly: true, // Can't be accessed by JS
        secure: false, // Set to true in production (HTTPS)
        sameSite: "lax", // CSRF protection
        path: "/", // Cookie path
        maxAge: 60 * 60 * 24, // 1 day
      })
      .send({ message: "Logged in", user });

    // return reply.send({ success: true, token: token });
  } catch (err) {
    return reply.status(400).send({ err: err.message });
  }
}
async function ProfileController(request, reply, fastify) {
  try {
    await request.jwtVerify();
  } catch (err) {
    console.error("Unauthorized");
    return reply.status(401).send({ err: "Unauthorized" });
  }
  try {
    const { id } = request.user;
    const userData = await db.getAsync(`SELECT * FROM users WHERE id = ?`, [
      id,
    ]);
    return reply.send(userData);
  } catch (err) {
    return reply.status(400).send({ err: err.message });
  }
}

async function AuthGoogleController(request, reply, fastify) {
  const redirectUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.ID_CLIENT_GOOGLE}&redirect_uri=${process.env.CALL_BACK_URL}&response_type=code&scope=profile email&access_type=offline&prompt=consent`;
  console.log("Redirect URI:", redirectUrl);
  reply.redirect(redirectUrl);
}
async function GoogleControllerCallBack(request, reply, fastify) {
  const code = request.query.code;

  const redirectFrontendUrl = `http://localhost:3000/auth/callback/google?code=${code}`;
  return reply.redirect(redirectFrontendUrl);
}
async function GoogleControllerCallBackPost(request, reply, fastify) {
  const code = request.body.code;
  try {
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.ID_CLIENT_GOOGLE,
        client_secret: process.env.ID_SECRET,
        redirect_uri: process.env.CALL_BACK_URL,
        grant_type: "authorization_code",
      }),
    });
    const tokenData = await tokenRes.json();
    if (!tokenData.access_token) {
      return reply
        .status(400)
        .send({ error: "Failed to exchange code for token" });
    }
    const userRes = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
      }
    );
    const userInfo = await userRes.json();
    const userData = {
      id: userInfo.sub,
      email: userInfo.email,
      username: userInfo.name,
      picture: userInfo.picture,
    };
    const tokenJwt = fastify.jwt.sign(userData, process.env.JWT_KEY);
    const query = `INSERT INTO users (username, email, password) VALUES(?, ?, ?)`;
    await db.runAsync(query, [userData.username, userData.email, "123"]);
    console.log(`user ${userData.username} Set in db`);
    return reply.status(200).send({ token: tokenJwt });
  } catch (err) {
    console.error(err);
    return reply.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  RegisterController,
  LoginController,
  ProfileController,
  GoogleControllerCallBack,
  AuthGoogleController,
  GoogleControllerCallBackPost,
};
