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

router.post("/", validateActionBody, (req, res, next) => {
  Action.insert(req.body)
    .then(user => res.status(201).json(user))
    .catch(error => {
      next(error);
    });
});

router.put("/:id", validateActionId, validateActionBody, (req, res, next) => {
  Action.update(req.params.id, req.body)
    .then(updated => {
      res.status(200).json(updated);
    })
    .catch(error => {
      next(error);
    });
});

router.delete("/:id", validateActionId, (req, res, next) => {
  Action.remove(req.params.id)
    .then(tablesChanged => {
      res.status(200).json(tablesChanged);
    })
    .catch(error => {
      next(error);
    });
});

router.use((error, req, res, next) => {
  res.status(500).json({
    info: "Error occured inside UserRouter",
    message: error.message,
    stack: error.stack,
  });
});

module.exports = router;
