async function routes(fastify, options) {
  fastify.addSchema({
    $id: "LoginValidator",
    type: "object",
    required: ["id", "email", "password"],
    properties: {
      id: { type: "string" },
      email: { type: "string", format: "email" },
      password: { type: "string" },
    },
  });
  fastify.addSchema({
    $id: "RegisterValidator",
    type: "object",
    required: ["id", "username", "email", "password"],
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
  fastify.get("/", async (req, res) => {
    console.log("Welcome in the First jwt auth");
    return res.status(200).send({ message: "Welcome in the First jwt auth" });
  });
  // Login Route
  fastify.post(
    "/login",
    {
      schema: { body: { $ref: "LoginValidator#" } },
    },
    async (req, res) => {
      // const User
      res.send({ message: "Login Succesfuly" });
    }
  );
  // Register Route
  fastify.post(
    "/register",
    {
      schema: { body: { $ref: "RegisterValidator" } },
    },
    async (req, res) => {
      try {
        const userData = {
          id: req.body.id,
          username: req.body.username,
          emaill: req.body.email,
          password: req.body.password,
        };

        await fastify.db.run(
          "INSERT INTO users (username, password, email) values(?, ?, ?)",
          [userData.username, userData.password, userData.emaill]
        );
        const data = await fastify.db.all("SELECT * FROM users");

        console.log("Data : ", data);
        res.send({ message: "register Succesfuly" });
      } catch (err) {
        console.error("There is err : ", err.message);
        return res.send({ error: "User Already In Database" });
      }
    }
  );
}

module.exports = routes;
