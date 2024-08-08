const User = require("../models/user-model");

// GET /users - Retrieve all users and return as JSON
exports.getUser = (req, res, next) => {
  User.findAll()
    .then((users) => {
      res.json(users); // Return the users as JSON
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "An error occurred while fetching users" });
    });
};

// POST /users - Add a new user to the database
exports.postAddUser = (req, res, next) => {
  const name = req.body.name;
  const phoneNo = req.body.phoneNo;
  const email = req.body.email;
  User.create({
    name: name,
    phoneNo: phoneNo,
    email: email,
  })
    .then((user) => {
      res
        .status(201)
        .json({ message: "User created successfully", user: user });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ error: "An error occurred while adding the user" });
    });
};

exports.deleteUser = (req, res, next) => {
  const userId = req.params.id;

  User.findByPk(userId)
    .then((product) => {
      return product.destroy();
    })
    .then(() => {
      res.status(200).json({ message: "User deleted successfully" });
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ error: "An error occurred while deleting the user" });
    });
};
