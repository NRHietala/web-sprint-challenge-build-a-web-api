const Action = require("../actions/actions-model");
const Project = require("../projects/projects-model");

async function validateActionId(req, res, next) {
  try {
    const user = await Action.get(req.params.id);
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(404).json(`Action with id: ${req.params.id} not found`);
    }
  } catch (error) {
    res.status(500).json("Could not validate action id");
  }
}

async function validateProjectId(req, res, next) {
  try {
    const user = await Project.get(req.params.id);
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(404).json(`Project with id: ${req.params.id} not found`);
    }
  } catch (error) {
    res.status(500).json("Could not validate project id");
  }
}

function validateActionBody(req, res, next) {
  const { project_id, description, notes, completed } = req.body;

  if (!project_id || !description || !notes || !completed) {
    next();
  } else {
    res.status(400).json({ message: "Missing required field" });
  }
}

function validateProjectBody(req, res, next) {
  const { name, description, completed, actions } = req.body;

  if (!name || !description || !completed) {
    next();
  } else {
    res.status(400).json({ message: "Missing required text field" });
  }
}

module.exports = {
  validateActionId,
  validateProjectId,
  validateActionBody,
  validateProjectBody,
};
