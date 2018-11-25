import jwt from 'jsonwebtoken';

class CategoryController {
  static saveCategory(models) {
    const { Category } = models;
    return async (req, res) => {
      const { category } = req.body;
      const createdCategory = await Category.create({ ...category, userId: req.userId });
      res.json({ success: true, category: createdCategory });
    };
  }

  static getCategories(models) {
    const { Category, User } = models;
    return async (req, res) => {
      const { token } = req.query;
      if (token) {
        try {
          const { email } = await jwt.verify(token, process.env.JWT_KEY);
          const user = await User.findOne({ email });
          if (user) {
            const categories = await Category
              .find({ $or: [{ privacyStatus: false }, { userId: user._id }] }).populate({
                path: 'commands',
                match: { $or: [{ privacyStatus: false }, { userId: user._id }] },
              });
            return res.json({ success: true, categories });
          }
          return res.json({ success: false, error: 'unauthenticated token' });
        } catch {
          return res.json({ success: false, error: 'bad token' });
        }
      }
      const categories = await Category.find({ privacyStatus: false }).populate({
        path: 'commands',
        match: { privacyStatus: false },
      });
      return res.json({ success: true, categories });
    };
  }

  static deleteCategory(models) {
    const { Category, Command } = models;
    return async (req, res) => {
      const category = await Category.findOne({ _id: req.params.id });
      if (category) {
        if (category.userId == req.userId) {
          await Command.deleteMany({ categoryId: req.params.id });
          await Category.findOneAndDelete({ _id: req.params.id });
          return res.json({ success: true });
        }
        return res.status(401).json({ success: false, error: 'unauthorized' });
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
        if (update.userId == req.userId) {
          const updatedCategory = await Category.findOne({ _id: id });
          return res.json({ success: true, category: updatedCategory });
        }
        return res.status(401).json({ success: false, error: 'unauthorized' });
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

  static togglePrivacyStatus(models) {
    const { Category } = models;
    return async (req, res) => {
      const category = await Category.findOne({ _id: req.params.id });
      if (category) {
        if (req.userId == category.userId) {
          await Category
            .findOneAndUpdate({ _id: req.params.id }, { privacyStatus: !category.privacyStatus });
          return res.json({ success: true });
        }
        return res.status(401).json({ success: false, error: 'unauthorized' });
      }
      return res.status(404).json({ success: false, error: 'category not found' });
    };
  }

  static controllers(models) {
    return {
      getCategories: CategoryController.getCategories(models),
      deleteCategory: CategoryController.deleteCategory(models),
      updateCategory: CategoryController.updateCategory(models),
      confirmCategory: CategoryController.confirmCategory(models),
      saveCategory: CategoryController.saveCategory(models),
      togglePrivacyStatus: CategoryController.togglePrivacyStatus(models),
    };
  }
}

export default CategoryController;
