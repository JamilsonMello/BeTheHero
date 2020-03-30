import { Router } from 'express';

import OngController from './app/controllers/OngController';
import IncidentController from './app/controllers/IncidentController';
import ProfileController from './app/controllers/ProfileController';
import SessionController from './app/controllers/SessionController';

import { incidentIndexValidator, incidentStoreValidator, incidentDeleteValidator } from './app/validators/incidentValidator';
import { ongStoreValidator } from './app/validators/ongValidator';
import { profileIndexValidator } from './app/validators/profileValidator';
import { sessionPostValidator } from './app/validators/sessionValidator';

const routes = Router();

routes.post('/session', sessionPostValidator, SessionController.store);

routes.get('/ongs', OngController.index);
routes.post('/ongs', ongStoreValidator, OngController.store);

routes.get('/profile', profileIndexValidator, ProfileController.index);

routes.get('/incidents', incidentIndexValidator, IncidentController.index);
routes.post('/incidents', incidentStoreValidator, IncidentController.store);
routes.delete('/incidents/:id', incidentDeleteValidator, IncidentController.delete);

export default routes;

