// Write your "projects" router here!
const express = require('express');
const router = express.Router();
const Projects = require("./projects-model");

router.get("/", (req, res) => {
  Projects.get()
    .then( projects => {
      res.status(200).json(projects);
    })
    .catch( err => {
      res.status(500).json({ message: err.message });
    });
});

router.get("/:id",checkId, (req, res) => {
  res.status(200).json(req.project);
});

router.post("/",checkNew, (req, res) => {
  Projects.add(req.body)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
});

router.put("/:id",checkId, checkNew, (req, res) => {
  Projects.update(req.params.id, req.body)
    .then( project => {
      res.status(200).json(project);
    })
    .catch( err => {
      res.status(500).json({ message: err.message });
    })
});

router.delete("/:id",checkId, (req, res) => {
  Projects.remove(req.params.id)
    .then(count => {
      res.status(200).json({ message: 'The project has been deleted' });
    })
    .catch( err => {
      res.status(500).json({ message: err.message });
    });
});

function checkId(req, res, next) {
  const id = req.params.id;
  Projects.get(id)
  .then( project => {
    if( project ) {
      req.project = project;
      next();
    } else {
      res.status(404).json({ message: `action with id ${id} not found` });
    }
  })
  .catch( err => {
    res.status(500).json({ message: err.message })
  });
}

function checkNew(req, res, next) {
  const newProject = req.body;
  if (newProject.name && newProject.description) {
    next();
  } else {
    res.status(400).json({ message: "please provide name and description" });
  }
}



module.exports = router;