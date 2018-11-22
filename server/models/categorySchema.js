class CategorySchema {
  static register(mongoose) {
    const { Schema } = mongoose;
    const schema = new Schema({
      title: { type: String, required: true },
      commands: [{ type: Schema.Types.ObjectId, ref: 'Command', default: [] }],
      userId: { type: String, required: true },
      privacyStatus: { type: Boolean, default: false },
    });
    return mongoose.model('Category', schema);
  }
}

export default CategorySchema;
