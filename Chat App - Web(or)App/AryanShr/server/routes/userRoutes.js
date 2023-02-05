const express =  require("express");
const {getUser, signup,login, getUserByEmail} = require("../controller/userController");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

router.get("/:id",getUser);
router.post("/signup",signup);
router.post("/login",login);
router.get("/email/:email",getUserByEmail)
module.exports = router;