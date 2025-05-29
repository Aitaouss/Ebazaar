const fastify = require("fastify")({
  logger: false,
});
// fastify.register(require("@fastify/formbody"));
// fastify.register(require("@fastify/jwt"), {
//   secret: "testkey123",
// });

const PORT = 5000;

fastify.get("/", (req, res) => {
  console.log("Welcome in the First jwt auth");
  return res.status(200).send({ message: "Welcome in the First jwt auth" });
});

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

fastify.post(
  "/login",
  {
    schema: { body: { $ref: "LoginValidator#" } },
  },
  (req, res) => {
    res.send({ message: "Login Succesfuly" });
  }
);

fastify.addSchema({
  $id: "RegisterValidator",
  type: "object",
  required: ["id", "name", "email", "password"],
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    email: { type: "string", format: "email" },
    password: { type: "string" },
  },
});

fastify.post(
  "/register",
  {
    schema: { body: { $ref: "RegisterValidator" } },
  },
  (req, res) => {
    res.send({ message: "register Succesfuly" });
  }
);

fastify.listen({ port: PORT }, function (err, address) {
  if (err) {
    console.error(err.message);
    process.exit(1);
  }
  console.log(`Server is listening on ${address}`);
});
