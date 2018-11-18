import express from 'express';
import CommandController from '../controllers/commandController';
import CategoryController from '../controllers/categoryController';
import AdminController from '../controllers/adminController';

const router = express.Router();

class CommandRoutes {
  static routes(models) {
    const commandControllers = CommandController.controllers(models);
    const categoryControllers = CategoryController.controllers(models);
    const adminControllers = AdminController.controllers(models);

    router.post('/', adminControllers.authorize, categoryControllers.confirmCategory, commandControllers.saveCommands);

    router.delete('/:id', adminControllers.authorize, commandControllers.confirmCommand, commandControllers.deleteCommand);

    router.put('/:id/move', adminControllers.authorize, commandControllers.confirmCommand, commandControllers.moveCommand);

    router.put('/:id', adminControllers.authorize, commandControllers.confirmCommand, commandControllers.updateCommand);

    return router;
  }
}

export default CommandRoutes;
