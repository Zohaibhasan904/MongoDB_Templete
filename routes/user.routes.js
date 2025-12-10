const express = require("express");
const {
    registerUser,
    getUsers
} = require("../controllers/user.controller");

const router = express.Router();

router.post("/register", registerUser);
router.get("/", getUsers);

module.exports = router;
