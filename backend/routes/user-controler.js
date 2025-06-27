const db = require("../db");
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

    return reply.status(201).send(token);
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
    console.log("user : ", user);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.error("Password Incorrect");
      return reply.status(404).send({ err: "Password Incorrect" });
    }

    const userData = {
      id: user.id,
      email: user.email,
      password: user.password,
      username: user.username,
    };

    const token = fastify.jwt.sign(userData);
    console.log("Token generated successfully", token);

    console.log("Token : ", token);

    return reply.send({ success: true, token: token });
  } catch (err) {
    return reply.status(400).send({ err: err.message });
  }
}
async function ProfileController(request, reply, fastify) {
  let token;
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
    console.log(userData);
    return reply.send(userData);
  } catch (err) {
    return reply.status(400).send({ err: err.message });
  }
}

module.exports = {
  RegisterController,
  LoginController,
  ProfileController,
};
