import axios from 'axios';

// Set base URL for all axios requests
axios.defaults.baseURL = import.meta.env.VITE_API_URL|| 'http://localhost:8080';

export default axios;
