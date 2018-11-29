import axios from 'axios';
import host from './host';

class AjaxHelpers {
  static async fetchCategories(token) {
    const response = await axios.get(`${host}/api/categories?token=${token}`);
    return response.data;
  }

  static async login(credentials) {
    try {
      const response = await axios.post(`${host}/api/users/login`, credentials);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

  static async register(credentials) {
    try {
      const response = await axios.post(`${host}/api/users/register`, credentials);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

  static async toggleCategoryPrivacy(id, token) {
    await axios.put(`${host}/api/categories/${id}/toggle?token=${token}`);
  }

  static async deleteCategory(id, token) {
    await axios.delete(`${host}/api/categories/${id}?token=${token}`);
  }

  static async editCategory(category, token) {
    const { data } = await axios
      .put(`${host}/api/categories/${category._id}?token=${token}`, { category });
    return data;
  }

  static async createCategory(category, token) {
    const { data } = await axios.post(`${host}/api/categories?token=${token}`, { category });
    return data;
  }

  static async editCommand(command, token) {
    const { data } = await axios
      .put(`${host}/api/commands/${command._id}?token=${token}`, { command });
    return data;
  }

  static async createCommands(commands, categoryId, token) {
    const { data } = await axios
      .post(
        `${host}/api/commands/?token=${token}`,
        { commands, categoryId },
      );
    return data;
  }

  static async deleteCommand(commandId, token) {
    await axios.delete(`${host}/api/commands/${commandId}?token=${token}`);
  }
}

export default AjaxHelpers;
