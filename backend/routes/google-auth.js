module.exports = async function (fastify) {
  fastify.get(
    "/auth/google",
    {
      preValidation: fastify.passport.authenticate("google", {
        scope: ["profile", "email"],
      }),
    },
    async () => {}
  );

  fastify.get(
    "/auth/google/callback",
    {
      preValidation: fastify.passport.authenticate("google", {
        failureRedirect: "/",
      }),
    },
    async (req, reply) => {
      const token = fastify.jwt.sign({
        id: req.user.id,
        email: req.user.email,
      });

      reply.send({ token, user: req.user });
    }
  );
};
