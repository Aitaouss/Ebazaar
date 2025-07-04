require("dotenv").config();

const db = require("./db");

const cors = require("@fastify/cors");
const migrate = require("./db/migrate");

async function startServer() {
  try {
    await migrate();
  } catch (err) {
    console.error("❌ Migration failed:", err.message);
    process.exit(1);
  }
  const fastify = require("fastify")();
  //  cookie
  const cookie = require("@fastify/cookie");

  fastify.register(cookie, {
    secret: process.env.COOKIE_SECRET, // optional for signed cookies
  });
  fastify.register(cors, {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  });
  // end
  fastify.register(require("@fastify/jwt"), {
    secret: process.env.JWT_KEY,
  });

  fastify.decorate("authenticate", async function (request, reply) {
    try {
      const token = request.cookies.token; // 👈 get the token from cookies
      request.user = fastify.jwt.verify(token); // verify it
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
