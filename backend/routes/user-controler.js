async function RegisterController(req, res) {
  const { username, email, password } = req.body;
  const userData = {
    email: email,
    password: password,
    username: username,
  };
  console.log(userData);
  return res.status(201).send(userData);
}

module.exports = {
  RegisterController,
};
