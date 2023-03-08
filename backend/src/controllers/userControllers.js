const models = require("../models");

// Get all users
const browse = (req, res) => {
  models.user
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

// Get one user
const read = () => {};

// Add new user
const add = (req, res) => {
  const user = req.body;

  models.user
    .insert(user)
    .then(([result]) => {
      res.location(`/users/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

// Update user's informations
const update = () => {};

// Delete a user
const destroy = () => {};

module.exports = {
  browse,
  read,
  add,
  update,
  destroy,
};
