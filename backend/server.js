const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
require("dotenv").config();

const cors = require("@fastify/cors");

async function startServer() {
  const fastify = require("fastify")();

  fastify.register(cors, {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  });

  fastify.register(require("@fastify/jwt"), {
    secret: process.env.JWT_KEY,
  });

  fastify.register(require("./routes/auth-route"));

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
