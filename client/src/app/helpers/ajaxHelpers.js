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

  static async deleteCategory(id, token) {
    await axios.delete(`/api/categories/${id}?token=${token}`);
  }

  static async editCategory(category, token) {
    await axios.put(`/api/categories/${category._id}?token=${token}`, { category });
  }

  static async createCategory(category, token) {
    const { data } = await axios.post(`/api/categories?token=${token}`, { category });
    return data;
  }
}

export default AjaxHelpers;
