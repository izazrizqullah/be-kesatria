const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profile.controller.js");

router.post("/create", profileController.createProfile);
router.get("/", profileController.getAllProfile);
router.get("/:id", profileController.getProfileById);
router.put("/:id", profileController.updateProfileById);
router.delete("/:id", profileController.deleteProfileById);

module.exports = router;
