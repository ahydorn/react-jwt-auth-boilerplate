// Dependencies
const router = require("express").Router();
const authRoutes = require("./authRoutes");

// API route setup
// Prepends /api to all routes declared in this file

router.use("/auth", authRoutes);

module.exports = authRoutes;
