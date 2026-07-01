const express = require("express");
const { getPositions } = require("../controllers/positionController");

const router = express.Router();

router.get("/", getPositions);

module.exports = router;
