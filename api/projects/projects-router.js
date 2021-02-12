const Project = require("./projects-model");
const express = require("express");

const router = express.Router();

const {
  validateProjectId,
  validateProjectBody,
} = require("../middleware/middleware");

// put in middleware

router.get("/", (req, res, next) => {
  Project.get()
    .then(post => res.status(200).json(post))
    .catch(error => next(error));
});

router.get("/:id", validateProjectId, (req, res) => {
  res.status(200).json(req.user);
});

router.use((error, req, res, next) => {
  res.status(500).json({
    info: "Error occured inside UserRouter",
    message: error.message,
    stack: error.stack,
  });
});

module.exports = router;
