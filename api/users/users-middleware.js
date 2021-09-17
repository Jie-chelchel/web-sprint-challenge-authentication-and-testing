const validateRegistration = (req, res, next) => {
  const { username, password } = req.body;
  if (username === undefined || password === undefined) {
    res.status(400).json({ message: "username and password required" });
  } else {
    next();
  }
};

module.exports = {
  validateRegistration,
};
