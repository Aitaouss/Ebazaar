const { loginController, RegisterController } = require("./user-controler");

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
  fastify.get("/", async (req, res) => {
    console.log("Welcome in the First jwt auth");
    return res.status(200).send({ message: "Welcome in the First jwt auth" });
  });

  // Register Route
  fastify.post(
    "/register",
    {
      schema: { body: { $ref: "RegisterValidator" } },
    },
    RegisterController
  );

  // Login Route
  fastify.post(
    "/login",
    {
      schema: { body: { $ref: "LoginValidator#" } },
    },
    (req, res) => {
      return res.send({ message: "From /Login" });
    }
  );

  // Profile route
  fastify.get("/api/me", (req, res) => {
    return res.send({ message: "From Profile endpoint" });
  });

  fastify.get("/healthcheck", (req, res) => {
    return res.status(200).send({ message: "The App is working" });
  });
}

module.exports = routes;
