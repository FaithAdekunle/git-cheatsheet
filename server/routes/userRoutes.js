import express from 'express';
import UserController from '../controllers/userController';

const router = express.Router();

class UserRoutes {
  static routes(models) {
    const userControllers = UserController.controllers(models);

    router.post('/login', userControllers.login);
    router.post('/register', userControllers.register);
    return router;
  }
}

export default UserRoutes;
