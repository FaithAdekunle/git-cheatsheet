import express from 'express';
import CommandController from '../controllers/commandController';
import CategoryController from '../controllers/categoryController';
import UserController from '../controllers/userController';

const router = express.Router();

class CommandRoutes {
  static routes(models) {
    const commandControllers = CommandController.controllers(models);
    const categoryControllers = CategoryController.controllers(models);
    const userControllers = UserController.controllers(models);

    router.post('/', userControllers.authorize, categoryControllers.confirmCategory, commandControllers.saveCommands);

    router.delete('/:id', userControllers.authorize, commandControllers.confirmCommand, commandControllers.deleteCommand);

    router.put('/:id/move', userControllers.authorize, commandControllers.confirmCommand, commandControllers.moveCommand);

    router.put('/:id/toggle', userControllers.authorize, commandControllers.confirmCommand, commandControllers.togglePrivacyStatus);

    router.put('/:id', userControllers.authorize, commandControllers.confirmCommand, commandControllers.updateCommand);

    return router;
  }
}

export default CommandRoutes;
