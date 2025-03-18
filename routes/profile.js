const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profile.controller.js");

router.post("/create", profileController.createProfile);

module.exports = router;
