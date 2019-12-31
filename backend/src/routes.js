import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentSessionController from './app/controllers/StudentSessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import EnrollmentController from './app/controllers/EnrollmentController';
import CheckinController from './app/controllers/CheckinController';
import QuestionController from './app/controllers/QuestionController';
import QuestionFilterController from './app/controllers/QuestionFilterController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);
routes.post('/student_sessions', StudentSessionController.store);

routes.post('/checkins', CheckinController.store);

routes.get('/students/:student_id/questions', QuestionFilterController.index);

routes.use(authMiddleware);

routes.post('/users', UserController.store);
routes.put('/users', UserController.update);
routes.delete('/users/:user_id', UserController.delete);

routes.post('/students', StudentController.store);
routes.get('/students', StudentController.index);
routes.get('/students/:id', StudentController.show);
routes.put('/students/:id/edit', StudentController.update);
routes.delete('/students/:id/delete', StudentController.delete);
routes.post('/students/:student_id/questions', QuestionController.store);

routes.get('/plans', PlanController.index);
routes.get('/plans/:id', PlanController.show);
routes.post('/plans', PlanController.store);
routes.put('/plans/:id/edit', PlanController.update);
routes.delete('/plans/:id/delete', PlanController.delete);

routes.post('/enrollments', EnrollmentController.store);
routes.get('/enrollments', EnrollmentController.index);
routes.get('/enrollments/:id', EnrollmentController.show);
routes.delete('/enrollments/:id/delete', EnrollmentController.delete);
routes.put('/enrollments/:id/edit', EnrollmentController.update);

routes.get('/checkins/:student_id', CheckinController.index);
routes.post('/checkins/:student_id', CheckinController.store);

routes.get('/questions', QuestionController.index);

routes.put('/questions/:question_id/answer', QuestionController.update);

routes.get('/questions/:question_id', QuestionController.show);

export default routes;
