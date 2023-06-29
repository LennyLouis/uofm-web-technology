import axios from 'axios';
import queryString from 'query-string';

import AuthService from '@/services/AuthService'

class CourseService {
  async getCourses() {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/courses`, {
        headers: {
          Authorization: AuthService.getAccessToken()
        }
      })
      return data;
    } catch (err) {
      return {
        success: false,
        error: err.message
      }
    }
  }
}

export default new CourseService()
