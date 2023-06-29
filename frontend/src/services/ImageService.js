import axios from 'axios';
import queryString from 'query-string';

import AuthService from '@/services/AuthService'

class ImageService {
  async addImage(imageData) {
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/images`, imageData, {
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

  async getImages(imageData) {

    try {
      const queryStr = queryString.stringify(imageData);
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/images?${queryStr}&select=name,url,description,createdAt`, {
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

export default new ImageService()
