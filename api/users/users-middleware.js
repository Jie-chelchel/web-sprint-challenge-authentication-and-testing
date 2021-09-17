const Users = require("./users-model.js");

const validateInput = (req, res, next) => {
  const { username, password } = req.body;
  if (username === undefined || password === undefined) {
    res.status(400).json({ message: "username and password required" });
  } else {
    next();
  }
};

const usernameExist = async (req, res, next) => {
  const allUsers = await Users.find();
  const userExist = allUsers.find((u) => u.username === req.body.username);
  if (userExist) {
    res.status(400).json({ message: "username taken" });
  } else {
    next();
  }
};

module.exports = {
  validateInput,
  usernameExist,
};
