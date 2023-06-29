import axios from 'axios'

class AuthService {
  async login(loginData, isRememberMe) {
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/users/login`, loginData)

      if (data.success) {
        if (isRememberMe) {
          localStorage.setItem('user', JSON.stringify(data.user))
          localStorage.setItem('accessToken', data.accessToken)
        } else {
          sessionStorage.setItem('user', JSON.stringify(data.user))
          sessionStorage.setItem('accessToken', data.accessToken)
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

  isLoggedIn() {
    if (localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken')) {
      return true
    }
    return false
  }

  getAccessToken() {
    return localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken')
  }

  logout() {
    //logout api to clear jwt
    localStorage.clear()
    sessionStorage.clear()
  }

  getUser() {
    const user = localStorage.getItem('user') || sessionStorage.getItem('user')
    if (user) {
      return JSON.parse(user)
    }
    return {}
  }
}

export default new AuthService()