import axios from 'axios';

class AjaxHelpers {
  static async fetchCategories(token) {
    const response = await axios.get(`/api/categories?token=${token}`);
    return response.data;
  }

  static async login(credentials) {
    try {
      const response = await axios.post('/api/users/login', credentials);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

  static async register(credentials) {
    try {
      const response = await axios.post('/api/users/register', credentials);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

  static async toggleCategoryPrivacy(id, token) {
    await axios.put(`/api/categories/${id}/toggle?token=${token}`);
  }
}

export default AjaxHelpers;
