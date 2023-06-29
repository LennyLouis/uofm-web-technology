import axios from 'axios';

import AuthService from '@/services/AuthService'

class UserService {
  async register(userData) {
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/users/register`, userData)

      return data;
    } catch (err) {
      return {
        success: false,
        error: err.message
      }
    }
  }

  async update(userInfo) {
    try {
      const { data } = await axios.put(`${import.meta.env.VITE_API_URL}/users/update`, userInfo, {
        headers: {
          Authorization: AuthService.getAccessToken()
        }
      })
      
      if (data.success) {
        if (localStorage.getItem('user')) {
          localStorage.setItem('user', JSON.stringify(data.user))
        } else {
          sessionStorage.setItem('user', JSON.stringify(data.user))
        }
      }
      return data
    } catch (err) {
      return {
        success: false,
        error: err.message
      }
    }
  }

}

export default new UserService()
