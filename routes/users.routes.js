const express = require("express");
const controllers = require("../controllers/users.controller");

const router = express.Router();

router.post("/signup", controllers.signUp);

router.post("/signin", controllers.signIn);

router.post("/signout", controllers.signOut);




module.exports = router;