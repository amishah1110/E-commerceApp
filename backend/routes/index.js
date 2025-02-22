const express = require('express');
const router = express.Router();

const UserSignUpController = require('../contollers/SignUpController');
router.post("/signup", UserSignUpController);

const UserSignInController = require('../contollers/SignInController')
router.post("/signin", UserSignInController);
module.exports = router;