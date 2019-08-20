const express = require('express');

const server = express();

server.use(express.json());

// Criação de array 

let numberOfRequests = 0;
const projects = [];

/**
 * Middleware que checa se o projeto existe
 */
function checkProjectExists(req, res, next) {
  const { id } = req.params;
  const project = projects.find(p => p.id == id);

  if (!project) {
    return res.status(400).json({ error: 'Project not found' });
  }

  return next();
}

/**
 * Middleware que dá log no número de requisições
 */
function logRequests(req, res, next) {
  numberOfRequests++;

  console.log(`Número de requisições: ${numberOfRequests}`);

  return next();
}

server.use(logRequests);

// Rota de listagem de todos projects
server.get('/projects', (req, res) => {
  return res.json(projects);
});

/*
* Rota de criação de project, recebendo id e title dentro do corpo, através
* de um array no seguinte formato: {id: "1", title: 'Novo Projeto', tasks: [] }
* Enviando tanto o ID quanto o título do projeto no formato string com àspas
* duplas
*/
server.post('/projects', (req, res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);

  return res.json(project);
});

/**
 * Rota de atualização apenas do título do projeto com o id presente nos
 * parâmetros da rota
 */
server.put('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  
  const project = projects.find(p => p.id == id);

  project.title = title;
  
  return res.json(project);
  

})

// http://localhost:3000/
server.listen(3000);

