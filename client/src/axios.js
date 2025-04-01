import axios from 'axios';

// Set base URL for all axios requests
axios.defaults.baseURL = 'http://localhost:8000';

// Example: Fetch all events
const fetchEvents = async () => {
  try {
    const response = await axios.get('/events');
    console.log(response.data);  // Do something with the data
  } catch (error) {
    console.error('Error fetching events:', error);
  }
};

// Example: Register a user
const registerUser = async (userData) => {
  try {
    const response = await axios.post('/register', userData);
    console.log(response.data);  // Handle the response data
  } catch (error) {
    console.error('Error registering user:', error);
  }
};

export default axios;
