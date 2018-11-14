import bcrypt from 'bcrypt';
import models from '../models';

const Admin = models.Admin;

class AdminController {
  static async login(req, res) {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (admin) {
      const authenticated = await bcrypt.compare(password, admin.password);
      if (authenticated) return res.json({ authenticated });
    }
    return res.json({ authenticated: false });
  }
}

export default AdminController;
