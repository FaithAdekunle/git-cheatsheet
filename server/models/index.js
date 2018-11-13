import CategorySchema from './categorySchema';
import CommandSchema from './commandSchema';
import AdminSchema from './adminSchema';

class Models {
  models(mongoose) {
    this.Category = CategorySchema.register(mongoose);
    this.Command = CommandSchema.register(mongoose);
    this.Admin = AdminSchema.register(mongoose);
  }
}

export default Models;
