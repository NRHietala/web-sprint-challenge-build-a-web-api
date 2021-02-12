const Action = require("./actions-model");
const express = require("express");

const router = express.Router();

const {
  validateActionId,
  validateActionBody,
} = require("../middleware/middleware");

router.get("/", (req, res, next) => {
  Action.get()
    .then(post => res.status(200).json(post))
    .catch(error => next(error));
});

router.get("/:id", validateActionId, (req, res) => {
  res.status(200).json(req.user);
});

module.exports = router;
