const express = require('express');
const router = express.Router();

const UserSignUpController = require('../contollers/SignUpController');
router.post("/signup", UserSignUpController);
module.exports = router;