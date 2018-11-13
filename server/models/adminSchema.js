class AdminSchema {
  static register(mongoose) {
    const { Schema } = mongoose;
    const schema = Schema({
      email: { type: String, required: true },
      password: { type: String, required: true },
    });
    return mongoose.model('Admin', schema);
  }
}

export default AdminSchema;
