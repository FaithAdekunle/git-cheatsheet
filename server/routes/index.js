import express from 'express';
import CategoryRoutes from './categoryRoutes';
import CommandRoutes from './commandRoutes';
import UserRoutes from './userRoutes';

const router = express.Router();

class Routes {
  static routes(models) {
    router.use('/categories', CategoryRoutes.routes(models));
    router.use('/commands', CommandRoutes.routes(models));
    router.use('/users', UserRoutes.routes(models));
    return router;
  }
}

export default Routes;
