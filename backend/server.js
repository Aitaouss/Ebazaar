const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

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

  fastify.decorate("authenticate", async (req, res) => {
    try {
      await req.jwtVerify();
    } catch (err) {
      res.status(401).send({ error: "Unauthorized" });
    }
  });

  fastify.register(require("@fastify/jwt"), {
    secret: "testkey123",
  });

  fastify.decorate("db", db);

  fastify.register(require("./routes/auth-route"));

  const PORT = 5000;

  fastify.listen({ port: PORT }, function (err, address) {
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
