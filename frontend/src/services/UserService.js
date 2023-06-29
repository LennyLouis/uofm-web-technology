import axios from 'axios';

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
  
}

export default new UserService()