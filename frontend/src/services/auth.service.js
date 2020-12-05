import axios from "axios";

// URL for Django REST API backend
const API_URL = "http://127.0.0.1:8000/user/";

class AuthService {
  login(username, password) {
    return axios
        .post(API_URL + "token-auth/", {
          username: username,
          password: password
        })
        .then(response => {
          if (response.data.token) {
            // save user token and info in local storage
            let userData = response.data;
            userData['username'] = username;
            userData = JSON.stringify(userData);
            localStorage.setItem('user', userData);
          }

          return response.data;
        });
  }

  logout() {
    // delete user token and info from local storage
    localStorage.removeItem('user');
  }

  register(email, username, password) {
    return axios
        .post(API_URL + "register/", {
          email: email,
          username: username,
          password: password
        });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new AuthService();
