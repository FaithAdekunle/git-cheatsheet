import axios from 'axios';

class AjaxHelpers {
  static async fetchCategories() {
    const response = await axios.get('/api/categories');
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
}

export default AjaxHelpers;
