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

router.post("/", validateProjectBody, (req, res, next) => {
  Project.insert(req.body)
    .then(user => res.status(201).json(user))
    .catch(error => {
      next(error);
    });
});

router.put("/:id", validateProjectId, validateProjectBody, (req, res, next) => {
  Project.update(req.params.id, req.body)
    .then(updated => {
      res.status(200).json(updated);
    })
    .catch(error => {
      next(error);
    });
});

router.delete("/:id", validateProjectId, (req, res, next) => {
  Project.remove(req.params.id)
    .then(tablesChanged => {
      res.status(204).json(tablesChanged);
    })
    .catch(error => {
      next(error);
    });
});

router.get("/:id/actions", validateProjectId, (req, res, next) => {
  Project.getProjectActions(req.params.id)
    .then(project => res.status(200).json(project))
    .catch(error => {
      next(error);
    });
});

router.use((error, req, res, next) => {
  res.status(500).json({
    info: "Error occured inside projectsRouter",
    message: error.message,
    stack: error.stack,
  });
});

module.exports = router;
