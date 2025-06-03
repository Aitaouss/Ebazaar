const db = require("../db");

async function getAllUsers(request, reply, fastify) {
  try {
    const query = `SELECT * FROM users`;
    const users = await db.allAsync(query);
    return reply.status(200).send(users);
  } catch (err) {
    console.error(err.message);
    return reply.status(500).send({ error: "Internal Server Error" });
  }
}

module.exports = {
  getAllUsers,
};
