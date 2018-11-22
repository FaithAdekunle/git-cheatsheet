import CategorySchema from './categorySchema';
import CommandSchema from './commandSchema';
import UserSchema from './userSchema';

class Models {
  static models(mongoose) {
    return {
      Category: CategorySchema.register(mongoose),
      Command: CommandSchema.register(mongoose),
      User: UserSchema.register(mongoose),
    };
  }
}

export default Models;
