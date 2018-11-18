import express from 'express';
import AdminController from '../controllers/adminController';

const router = express.Router();

class AdminRoutes {
  static routes(models) {
    const adminControllers = AdminController.controllers(models);

    router.get('/login', adminControllers.login);
    return router;
  }
}

export default AdminRoutes;
