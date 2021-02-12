const Project = require("./projects-model");
const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  Project.get()
    .then(post => res.status(200).json(post))
    .catch(res =>
      res
        .status(500)
        .json({ message: "The posts information could not be retrieved" })
    );
});

module.exports = router;
