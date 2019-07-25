const router = require("express").Router();

router.route("/sign").post((req, res) => {
  console.log("I'm hit");
});

module.exports = router;
