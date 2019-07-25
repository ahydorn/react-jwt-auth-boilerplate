// Deendencies
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

// Start express server
const app = express();

// Database setup
mongoose.connect("mongodb://localhost:auth/auth", {
  useNewUrlParser: true,
  useCreateIndex: true
});

// Middleware setup
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// If we ar ein production serve our clients build folder
// This folder is created during production only\
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Routes setup
const routes = require("./routes");
app.use(routes);

// Port assignemtn
const PORT = process.env.PORT || 3001;

// Start listener
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
