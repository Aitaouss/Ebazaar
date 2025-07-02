const {
  RegisterController,
  LoginController,
  ProfileController,
} = require("./user-controler");

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
        console.error("Unauthorized");
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

  // fastify.route({
  //   method: "GET",
  //   url: "/api/me",
  //   preHandler: async (request, reply) => {
  //     try {
  //       await request.jwtVerify();
  //     } catch (err) {
  //       console.error("Unauthorized");
  //       reply.code(401).send({ error: "Unauthorized" });
  //     }
  //   },
  //   handler: async (request, reply) => {
  //     reply.send({ message: "From Profile endpoint" });
  //   },
  // });

  fastify.get("/healthcheck", (request, reply) => {
    return reply.status(200).send({ message: "The App is working" });
  });
  // GOOGLE route
  fastify.get("/auth/google", (req, res) => {
    const redirectUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.ID_CLIENT_GOOGLE}&redirect_uri=${process.env.CALL_BACK_URL}&response_type=code&scope=profile email&access_type=offline&prompt=consent`;
    console.log("Redirect URI:", redirectUrl);
    res.redirect(redirectUrl);
  });

  fastify.get("/auth/google/callback", async (req, res) => {
    const code = req.query.code;

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
          .code(400)
          .send({ error: "Failed to exchange code for token" });
      }

      const userRes = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: { Authorization: `Bearer ${tokenData.access_token}` },
        }
      );

      const userInfo = await userRes.json();

      const redirectFrontendUrl = "http://localhost:3000";
      console.log("im in the backend callback");
      return res.redirect(redirectFrontendUrl);
    } catch (err) {
      console.error(err);
      return res.code(500).json({ error: "Internal server error" });
    }
  });
}

module.exports = routes;
