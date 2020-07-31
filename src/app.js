const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (req, res) => {
  return res.json(repositories);
});

app.post("/repositories", (req, res) => {
  const { title, url, techs } = req.body;
  const repo = { id: uuid(), title, url, techs, likes: 0 };

  repositories.push(repo);

  return res.json(repo);
});

app.put("/repositories/:id", (req, res) => {
  const { id } = req.params;
  const { title, url, techs } = req.body;
  const repoIndex = repositories.findIndex(repo => repo.id === id);

  if (repoIndex < 0) {
    return res.status(400).json({ error: 'Repository not found' });
  }

  const updatedRepo = { id, title, url, techs, likes: 0 };

  repositories[repoIndex] = updatedRepo;

  return res.json(updatedRepo);
});

app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params;
  const repoIndex = repositories.findIndex(repo => repo.id === id);

  if (repoIndex < 0) {
    return res.status(400).json({ error: 'Repository not found' });
  }

  repositories.splice(repoIndex, 1);

  return res.status(204).send();
});

app.post("/repositories/:id/like", (req, res) => {
  const { id } = req.params;
  const repoIndex = repositories.findIndex(repo => repo.id === id);

  if (repoIndex < 0) {
    return res.status(400).json({ error: 'Repository not found' });
  }

  repositories[repoIndex].likes++;

  return res.json(repositories[repoIndex]);
});

module.exports = app;