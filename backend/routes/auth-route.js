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
      const userData = {
        email: req.body.email,
        password: req.body.password,
      };
      let emails = [];
      user = await fastify.db.get(
        `SELECT * FROM users WHERE email = ? and password = ?`,
        [userData.email, userData.password]
      );
      const token = fastify.jwt.sign({ id: user.id, email: user.email });
      if (user.length !== 0) {
        console.log(`${user.username} Loged in`);
        res.send(token);
      } else {
        res.status(404).send({ error: "User Not Found" });
      }
    }
  );
  // Register Route
  fastify.post(
    "/register",
    // {
    //   schema: { body: { $ref: "RegisterValidator" } },
    // },
    async (req, res) => {
      try {
        // const isGoogle = req.body.isGoogle;
        // if (isGoogle) {
        //   console.log("is google :  ", isGoogle);
        //   return res.status(200).send({
        //     status: isGoogle,
        //     message: "The User try to register from google",
        //   });
        // } else {
        //   console.log("is not google :  ", isGoogle);
        //   return res.status(400).send({
        //     status: isGoogle,
        //     error: "The User try Not with google",
        //   });
        // }
        const userData = {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
        };

        await fastify.db.run(
          "INSERT INTO users (username, password, email) values(?, ?, ?)",
          [userData.username, userData.password, userData.email]
        );

        const token = fastify.jwt.sign({
          id: userData.id,
          email: userData.email,
        });
        res.send(token);
      } catch (err) {
        console.error("There is err : ", err.message);
        return res.send({ error: err.message });
      }
    }
  );
  // Profile route
  fastify.get("/profile", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).send({ error: "Missin token Or invalid" });
      }
      const token = authHeader.split(" ")[1];

      const decodedToken = fastify.jwt.verify(token);
      console.log("decoded token : ", decodedToken);

      const user = await fastify.db.get(`SELECT * FROM users WHERE email = ?`, [
        decodedToken.email,
      ]);

      res.send(user);
      if (!user) {
        res.status(404).send({ error: "User Not found" });
      }
    } catch (err) {
      return res.status(401).send({ error: err.message });
    }
  });
}

module.exports = routes;

// http://localhost:5000
