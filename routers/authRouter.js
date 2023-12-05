const express = require("express")

const router = express.Router();
const authContoller = require("../contollers/authController")

router.get("/login",authContoller.login_get)
router.post("/login",authContoller.login_post)
router.get("/register",authContoller.register_get)
router.post("/register",authContoller.register_post)
router.get("/logout",authContoller.logout_get)

module.exports = router