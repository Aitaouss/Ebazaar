const { getAllUsers } = require("./admin-controller");

async function adminRoutes(fastify, options) {
  // admin route
  fastify.get("/admin/users", {
    preHandler: fastify.authenticate,
    handler: (request, reply) => {
      const decodedToken = request.user;
      if (!decodedToken || decodedToken.role !== "admin") {
        return reply.status(403).send({ message: "Access denied" });
      }
      getAllUsers(request, reply, fastify);
    },
  });
}

module.exports = adminRoutes;
