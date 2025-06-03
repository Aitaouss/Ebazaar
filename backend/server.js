require("dotenv").config();

const db = require("./db");

const cors = require("@fastify/cors");

async function startServer() {
  const fastify = require("fastify")();

  fastify.register(cors, {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  });

  fastify.register(require("@fastify/jwt"), {
    secret: process.env.JWT_KEY,
  });

  fastify.decorate("authenticate", async function (request, reply) {
    try {
      await request.jwtVerify(); // will throw if token is invalid
    } catch (err) {
      reply.code(401).send({ error: "Unauthorized" });
    }
  });

  fastify.register(require("./routes/auth-route"));
  fastify.register(require("./admin/admin-route"));

  fastify.listen({ port: process.env.PORT }, function (err, address) {
    if (err) {
      console.error(err.message);
      process.exit(1);
    }
    console.log(`Server is listening on ${address}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
