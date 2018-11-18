class CategoryController {
  static saveCategory(models) {
    const { Category } = models;
    return async (req, res) => {
      const { category } = req.body;
      const createdCategory = await Category.create(category);
      res.json({ success: true, category: createdCategory });
    };
  }

  static getCategories(models) {
    const { Category } = models;
    return async (req, res) => {
      const categories = await Category.find({}).populate('commands');
      res.json({ success: true, categories });
    };
  }

  static deleteCategory(models) {
    const { Category, Command } = models;
    return async (req, res) => {
      const category = await Category.findOne({ _id: req.params.id });
      if (category) {
        await Command.deleteMany({ categoryId: req.params.id });
        await Category.findOneAndDelete({ _id: req.params.id });
        return res.json({ success: true });
      }
      return res.status(404).json({ success: false, error: 'category not found' });
    };
  }

  static updateCategory(models) {
    const { Category } = models;
    return async (req, res) => {
      const { id } = req.params;
      const { category } = req.body;
      const update = await Category.findOneAndUpdate({ _id: id }, category);
      if (update) {
        const updatedCategory = await Category.findOne({ _id: id });
        return res.json({ success: true, category: updatedCategory });
      }
      return res.status(404).json({ success: false, error: 'category not found' });
    };
  }

  static confirmCategory(models) {
    const { Category } = models;
    return async (req, res, next) => {
      try {
        const { categoryId } = req.body;
        const category = await Category.findOne({ _id: categoryId });
        if (category) return next();
        return res.status(404).json({ success: false, error: 'category not found' });
      } catch (e) {
        return res.status(404).json({ success: false, error: 'category not found' });
      }
    };
  }

  static controllers(models) {
    return {
      getCategories: CategoryController.getCategories(models),
      deleteCategory: CategoryController.deleteCategory(models),
      updateCategory: CategoryController.updateCategory(models),
      confirmCategory: CategoryController.confirmCategory(models),
      saveCategory: CategoryController.saveCategory(models),
    };
  }
}

export default CategoryController;
