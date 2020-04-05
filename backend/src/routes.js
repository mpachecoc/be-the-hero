const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

// Login/Logout
routes.post('/sessions', SessionController.create);

// ONGs 
routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

// Incidents (casos)
routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

// Profile
routes.get('/profile', ProfileController.index);

module.exports = routes;