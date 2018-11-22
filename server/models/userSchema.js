class UserSchema {
  static register(mongoose) {
    const { Schema } = mongoose;
    const schema = Schema({
      email: { type: String, required: true },
      password: { type: String, required: true },
    });
    return mongoose.model('User', schema);
  }
}

export default UserSchema;
