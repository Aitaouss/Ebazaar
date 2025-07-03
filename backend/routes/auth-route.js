const db = require("../db");

const {
  RegisterController,
  LoginController,
  ProfileController,
} = require("../controller/user-controler");
async function routes(fastify, options) {
  fastify.addSchema({
    $id: "LoginValidator",
    type: "object",
    required: ["email", "password"],
    properties: {
      id: { type: "string" },
      email: { type: "string", format: "email" },
      password: { type: "string" },
    },
  });
  fastify.addSchema({
    $id: "RegisterValidator",
    type: "object",
    required: ["username", "email", "password"],
    properties: {
      id: { type: "string" },
      username: { type: "string" },
      email: { type: "string", format: "email" },
      password: {
        type: "string",
        minLength: 6,
        maxLength: 30,
        pattern: "^(?=.*[A-Z])(?=.*\\d).+$",
      },
    },
  });

  // main route
  fastify.get("/", async (request, reply) => {
    console.log("Welcome in the First jwt auth");
    return reply.status(200).send({ message: "Welcome in the First jwt auth" });
  });

  // Register Route
  fastify.post(
    "/register",
    {
      schema: { body: { $ref: "RegisterValidator" } },
    },
    (request, reply) => {
      RegisterController(request, reply, fastify);
    }
  );

  // Login Route
  fastify.post(
    "/login",
    {
      schema: { body: { $ref: "LoginValidator" } },
    },
    (request, reply) => {
      LoginController(request, reply, fastify);
    }
  );
  // Add this preHandler hook to your route to verify the JWT token
  fastify.route({
    method: "GET",
    url: "/dashboard",
    preHandler: async (request, reply) => {
      try {
        await request.jwtVerify(); // verifies token from Authorization header or cookie
      } catch (err) {
        console.error("Unauthorized from dashboard route:");
        reply.code(401).send({ error: "Unauthorized" });
      }
    },
    handler: async (request, reply) => {
      // If token is valid, send dashboard data
      reply.send({ message: "Welcome to your dashboard!" });
    },
  });

  // Profile route
  fastify.get("/api/me", (request, reply) => {
    ProfileController(request, reply, fastify);
  });

  fastify.get("/healthcheck", (request, reply) => {
    return reply.status(200).send({ message: "The App is working" });
  });
  // GOOGLE route
  fastify.get("/auth/google", (req, res) => {
    const redirectUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.ID_CLIENT_GOOGLE}&redirect_uri=${process.env.CALL_BACK_URL}&response_type=code&scope=profile email&access_type=offline&prompt=consent`;
    res.redirect(redirectUrl);
  });

  fastify.get("/auth/google/callback", async (req, res) => {
    const code = req.query.code;

    const redirectFrontendUrl = `http://localhost:3000/auth/callback/google?code=${code}`;
    return res.redirect(redirectFrontendUrl);
  });

  fastify.post("/auth/google/callback", async (req, res) => {
    const code = req.body.code;
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
        return res
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
      console.log("user Info ===> ", userInfo);
      let query;

      query = `SELECT * FROM users WHERE email = ?`;
      const check_user = await db.getAsync(query, [userInfo.email]);
      let tokenJwt;

      if (!check_user) {
        query = `INSERT INTO users (username, email, password, picture) VALUES(?, ?, ?, ?)`;
        await db.runAsync(query, [
          userInfo.name,
          userInfo.email,
          "123",
          userInfo.picture,
        ]);
        console.log("iser picture", userInfo.picture);
        query = `SELECT * FROM users WHERE email = ?`;
        const check_user = await db.getAsync(query, [userInfo.email]);
        const userData = {
          id: check_user.id,
          email: userInfo.email,
          username: userInfo.name,
          picture: userInfo.picture,
          role: check_user.role,
        };
        tokenJwt = fastify.jwt.sign(userData, process.env.JWT_KEY);
      } else {
        const userData = {
          id: check_user.id,
          email: userInfo.email,
          username: userInfo.name,
          picture: userInfo.picture,
          role: check_user.role,
        };
        tokenJwt = fastify.jwt.sign(userData, process.env.JWT_KEY);
      }

      return res.status(200).send({ token: tokenJwt });
    } catch (err) {
      console.error(err);
      return res.status(500).send({ error: "Internal server error" });
    }
  });
}

module.exports = routes;
