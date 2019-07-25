// Dependencies
const router = require("express").Router();
const apiRoutes = require("./apiRoutes");

// API route setup
// Prepends /api to all routes declared in this file

router.use("/api", apiRoutes);

module.exports = router;
