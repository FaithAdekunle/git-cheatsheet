import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class UserController {
  static register(models) {
    const { User } = models;
    return async (req, res) => {
      const { email, password } = req.body;
      const hash = await bcrypt.hash(password, 10);
      const user = await User.create({ email, password: hash });
      const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_KEY);
      return res.json({ success: true, token, id: user._id });
    };
  }

  static login(models) {
    const { User } = models;
    return async (req, res) => {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (user) {
        const authenticated = await bcrypt.compare(password, user.password);
        if (authenticated) {
          const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_KEY);
          return res.json({ success: true, token, id: user._id });
        }
        return res.status(400).json({ success: false, error: 'wrong email or password' });
      }
      return res.status(400).json({ success: false, error: 'wrong email or password' });
    };
  }

  static authorize(models) {
    const { User } = models;
    return async (req, res, next) => {
      try {
        const { token } = req.query;
        const { email } = await jwt.verify(token, process.env.JWT_KEY);
        const user = await User.findOne({ email });
        if (user) {
          req.userId = user._id;
          return next();
        }
        return res.json({ success: false, unauthorized: true });
      } catch {
        return res.json({ success: false, unauthorized: true });
      }
    };
  }

  static controllers(models) {
    return {
      register: UserController.register(models),
      login: UserController.login(models),
      authorize: UserController.authorize(models),
    };
  }
}

export default UserController;
