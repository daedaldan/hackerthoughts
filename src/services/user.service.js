import axios from 'axios';
import authHeader from './auth-header';

// URL for Django REST API backend
const API_URL = 'http://127.0.0.1:8000/';

class UserService {
  // get list of interests as JSON objects for specified user
  getInterests(username) {
    return axios.get(API_URL + 'interests/get/' + username + '/', { headers: authHeader() });
  }

  // get list of comments as JSON objects for specified user
  getComments(username) {
    return axios.get(API_URL + 'comments/get/' + username + '/', { headers: authHeader() });
  }

  // create interest for specified user
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

  // delete interest based on id given
  deleteInterest(interest_id) {
    return axios.delete(API_URL + 'interests/delete/' + interest_id + '/', { headers: authHeader() });
  }
}

export default new UserService();
