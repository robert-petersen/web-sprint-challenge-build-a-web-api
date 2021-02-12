// Write your "actions" router here!
const express = require('express');
const router = express.Router();
const Actions = require("./actions-model");
const Projects = require("./../projects/projects-model");

router.get("/", (req, res) => {
  Actions.get()
    .then( actions => {
      res.status(200).json(actions);
    })
    .catch( err => {
      res.status(500).json({ message: err.message });
    });
});

router.get("/:id",checkId, (req, res) => {
  res.status(200).json(req.action);
});

router.post("/",checkNew, checkProjectId, (req, res) => {
  Actions.add(req.body)
    .then(action => {
      res.status(201).json(action);
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
});

router.put("/:id",checkId, checkNew, (req, res) => {
  Actions.update(req.params.id, req.body)
    .then( action => {
      res.status(200).json(action);
    })
    .catch( err => {
      res.status(500).json({ message: err.message });
    })
});

router.delete("/:id",checkId, (req, res) => {
  Actions.remove(req.params.id)
    .then(count => {
      res.status(200).json({ message: 'The action has been deleted' });
    })
    .catch( err => {
      res.status(500).json({ message: err.message });
    });
});

function checkId(req, res, next) {
  const id = req.params.id;
  Actions.get(id)
  .then( action => {
    if( action ) {
      req.action = action;
      next();
    } else {
      res.status(404).json({ message: `action with id ${id} not found` });
    }
  })
  .catch( err => {
    res.status(500).json({ message: err.message })
  });
}

function checkProjectId(req, res, next) {
  const id = req.body.project_id;
  Projects.get(id)
    .then( project => {
      if (project) {
        next();
      } else {
        res.status(404).json({ message: `can't find a project with id ${id}` })
      }
    })
    .catch( err => {
      res.status(500).json({ message: err.message });
    });
}

function checkNew(req, res, next) {
  const newAction = req.body;
  if (  newAction.project_id && 
        newAction.description &&
        newAction.notes
    ) {
    next();
  } else {
    res.status(400).json({ message: "please provide all fields" });
  }
}

module.exports = router;