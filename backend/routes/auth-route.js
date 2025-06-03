const { RegisterController, LoginController } = require("./user-controler");

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

  // Profile route
  fastify.get("/api/me", (request, reply) => {
    return reply.send({ message: "From Profile endpoint" });
  });

  fastify.get("/healthcheck", (request, reply) => {
    return reply.status(200).send({ message: "The App is working" });
  });
}

module.exports = routes;
