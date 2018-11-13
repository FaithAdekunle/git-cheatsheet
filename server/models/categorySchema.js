class CategorySchema {
  static register(mongoose) {
    const { Schema } = mongoose;
    const schema = new Schema({
      title: { type: String, required: true },
      description: String,
    });
    return mongoose.model('Category', schema);
  }
}

export default CategorySchema;
