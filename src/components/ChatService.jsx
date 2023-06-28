/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

const API_URL = 'http://localhost:8080/im';

class ChatService {
  pobierzWiadomosciZKonwersacji(idProjektu) {
    return axios.get(`${API_URL}/conv/${idProjektu}`);
  }

  dodajWiadomoscDoKonwersacji(idProjektu, wiadomosc) {
    return axios.post(`${API_URL}/write/${idProjektu}`, wiadomosc);
  }
}

export default new ChatService();
