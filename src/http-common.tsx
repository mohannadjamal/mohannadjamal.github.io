import axios from 'axios';
export default axios.create({
  baseURL:
    'https://ecommerce-app-57402-default-rtdb.europe-west1.firebasedatabase.app/',
  headers: {
    'Content-type': 'application/json',
  },
});
