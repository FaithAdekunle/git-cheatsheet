import axios from 'axios';

class AjaxHelpers {
  static async fetchCategories() {
    const response = await axios.get('/api/categories');
    return response.data;
  }
}

export default AjaxHelpers;
