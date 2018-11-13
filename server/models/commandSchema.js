class CommandSchema {
  static register(mongoose) {
    const { Schema } = mongoose;
    const schema = new Schema({
      script: { type: String, required: true },
      description: { type: String, required: true },
      keywords: [{ type: String }],
      category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    });
    return mongoose.model('Command', schema);
  }
}

export default CommandSchema;
