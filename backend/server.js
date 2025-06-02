const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
require("dotenv").config();

// allow oringin
const cors = require("@fastify/cors");

async function startServer() {
  const db = await open({
    filename: "./db/base.db",
    driver: sqlite3.Database,
  });

  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`;

  await db.run(createUsersTable);
  console.log("Table is ready");

  const fastify = require("fastify")({ logger: false });
  fastify.register(cors, {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  });

  fastify.decorate("authenticate", async (req, res) => {
    try {
      await req.jwtVerify();
    } catch (err) {
      res.status(401).send({ error: "Unauthorized" });
    }
  });

  fastify.register(require("@fastify/jwt"), {
    secret: process.env.JWT_KEY,
  });

  fastify.decorate("db", db);

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
