import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://127.0.0.1:8000/';

class UserService {
  getInterests(username) {
    return axios.get(API_URL + 'interests/get/' + username + '/', { headers: authHeader() });
  }

  getComments(username) {
    return axios.get(API_URL + 'comments/get/' + username + '/', { headers: authHeader() });
  }

  createInterest(interest, username) {
    return axios.post(API_URL + 'interests/create/',
        {
          interest: interest,
          owner: username
        },
        {
          headers: authHeader()
        });
  }

  deleteInterest(interest_id) {
    return axios.delete(API_URL + 'interests/delete/' + interest_id + '/', { headers: authHeader() });
  }
}

export default new UserService();
