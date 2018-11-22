import express from 'express';
import CategoryController from '../controllers/categoryController';
import UserController from '../controllers/userController';

const router = express.Router();

class CategoryRoutes {
  static routes(models) {
    const categoryControllers = CategoryController.controllers(models);
    const adminControllers = UserController.controllers(models);

    router.get('/', categoryControllers.getCategories);

    router.post('/', adminControllers.authorize, categoryControllers.saveCategory);

    router.put('/:id/toggle', adminControllers.authorize, categoryControllers.togglePrivacyStatus);

    router.put('/:id', adminControllers.authorize, categoryControllers.updateCategory);

    router.delete('/:id', adminControllers.authorize, categoryControllers.deleteCategory);

    return router;
  }
}

export default CategoryRoutes;
