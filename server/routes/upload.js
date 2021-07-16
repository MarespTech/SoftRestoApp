const express = require("express");
const uploadController = require("../controllers/uploadController");
const router = express.Router();

// api/upload

router.post("/:type", uploadController.uploadFile);

module.exports = router;