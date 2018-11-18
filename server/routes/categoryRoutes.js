import express from 'express';
import CategoryController from '../controllers/categoryController';
import AdminController from '../controllers/adminController';

const router = express.Router();

class CategoryRoutes {
  static routes(models) {
    const categoryControllers = CategoryController.controllers(models);
    const adminControllers = AdminController.controllers(models);

    router.get('/', categoryControllers.getCategories);

    router.post('/', adminControllers.authorize, categoryControllers.saveCategory);

    router.put('/:id', adminControllers.authorize, categoryControllers.updateCategory);

    router.delete('/:id', adminControllers.authorize, categoryControllers.deleteCategory);

    return router;
  }
}

export default CategoryRoutes;
