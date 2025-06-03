const { getAllUsers } = require("./admin-controller");

async function adminRoutes(fastify, options) {
  // admin route
  fastify.get("/admin/users", {
    preHandler: fastify.authenticate,
    handler: (request, reply) => {
      const decodedToken = request.user;
      const isAdmin = decodedToken && decodedToken.username === "AimenRedx";
      if (!decodedToken || !isAdmin) {
        return reply
          .status(403)
          .send({ error: "Forbidden: Admin access required" });
      }
      getAllUsers(request, reply, fastify);
    },
  });
}

module.exports = adminRoutes;
