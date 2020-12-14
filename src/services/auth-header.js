export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));

  // if user is logged in and token exists, return authorization header with token
  if (user && user.token) {
    return { Authorization: 'Token ' + user.token };
  } else {
    return {};
  }
}
