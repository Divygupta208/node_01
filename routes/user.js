const express = require("express");

const userController = require("../controllers/user");

const router = express.Router();

router.get("/add-user", userController.getUser);

router.post("/add-user", userController.postAddUser);

module.exports = router;
