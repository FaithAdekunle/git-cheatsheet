import models from '../models';

const Category = models.Category;
const Command = models.Command;

class CategoryController {
  static async getCategories(req, res) {
    const categories = await Category.find({}).populate('commands');
    res.json({ categories });
  }

  static async deleteCategory(req, res) {
    await Command.deleteMany({ category: req.params.id });
    await Category.findOneAndDelete({ _id: req.params.id });
    res.json({ success: true });
  }

  static async updateCategory(req, res) {
    const { category, id } = req.params;
    const updatedCategory = await Category.findOneAndUpdate({ _id: id }, category);
    res.json({ category: updatedCategory });
  }
}

export default CategoryController;
