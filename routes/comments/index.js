const express = require('express');

const api = require('./api.js');

const app = express.Router();

app.post('/comments/addComment', (req, res) => {
  const { name, message } = req.body;

  if (!name || !message) {
    res.status(500).send({
      error: true,
    });
  } else {
    api.addComments(name, message, (result) => {
      res.status(200).send({
        result,
      });
    });
  }
});

app.post('/comments/getComments', (req, res) => {
  const { page } = req.body;
  api.getComments(page, (result) => {
    res.status(200).send({
      result,
    });
  });
});

module.exports = app;
