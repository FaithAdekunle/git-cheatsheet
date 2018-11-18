import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class AdminController {
  static login(models) {
    const { Admin } = models;
    return async (req, res) => {
      const { email, password } = req.body;
      const admin = await Admin.findOne({ email });
      if (admin) {
        const authenticated = await bcrypt.compare(password, admin.password);
        if (authenticated) {
          const token = jwt.sign({ email: admin.email, id: admin._id }, process.env.JWT_KEY);
          return res.json({ success: true, token });
        }
        return res.status(400).json({ success: false, error: 'wrong email or password' });
      }
      return res.status(400).json({ success: false, error: 'wrong email or password' });
    };
  }

  static authorize(models) {
    const { Admin } = models;
    return async (req, res, next) => {
      try {
        const { token } = req.query;
        const { email } = await jwt.verify(token, process.env.JWT_KEY);
        const admin = await Admin.findOne({ email });
        if (admin) return next();
        return res.json({ success: false, unauthorized: true });
      } catch {
        return res.json({ success: false, unauthorized: true });
      }
    };
  }

  static controllers(models) {
    return {
      login: AdminController.login(models),
      authorize: AdminController.authorize(models),
    };
  }
}

export default AdminController;
