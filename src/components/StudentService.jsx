import axios from 'axios';

const API_URL = 'http://localhost:8080';

class StudentService {
  pobierzStudenta(id) {
    return axios.get(`${API_URL}/studenty/${id}`);
  }
}

export default new StudentService();
