const express = require('express');
const router = express.Router();

const UserSignUpController = require('../contollers/SignUpController');
const UserSignInController = require('../contollers/SignInController');
const UserDetailsController = require('../contollers/UserDetailsController');
const authToken = require('../middleware/authToken');

router.post("/signup", UserSignUpController);
router.post("/signin", UserSignInController);
router.get("/user-details", authToken, UserDetailsController);
module.exports = router;