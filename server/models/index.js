import CategorySchema from './categorySchema';
import CommandSchema from './commandSchema';
import AdminSchema from './adminSchema';

class Models {
  static models(mongoose) {
    return {
      Category: CategorySchema.register(mongoose),
      Command: CommandSchema.register(mongoose),
      Admin: AdminSchema.register(mongoose),
    };
  }
}

export default Models;
