import React, { useState, useEffect } from 'react';
import ChatService from './ChatService';
import StudentService from './StudentService';

const useCurrentUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const studentId = 'your-student-id'; // Zamień na faktyczne ID zalogowanego studenta

    StudentService.pobierzStudenta(studentId)
      .then((student) => setUser(student.data)) // Uwzględnij strukturę odpowiedzi API
      .catch((error) => console.error(error));
  }, []);

  return user;
};

const ChatComponent = ({ idProjektu }) => {
  const [newMessage, setNewMessage] = useState('');
  const [wiadomosci, setWiadomosci] = useState([]);
  const user = useCurrentUser();

  useEffect(() => {
    ChatService.pobierzWiadomosciZKonwersacji(idProjektu)
      .then((response) => setWiadomosci(response.data))
      .catch((error) => console.error(error));
  }, [idProjektu]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const wiadomosc = {
      message: newMessage,
      author_d: user ? `${user.imie} ${user.nazwisko}` : 'Anonymous', // Tutaj wprowadzamy imię i nazwisko do author_d
    };

    ChatService.dodajWiadomoscDoKonwersacji(idProjektu, wiadomosc)
      .then(() => {
        setNewMessage('');
        return ChatService.pobierzWiadomosciZKonwersacji(idProjektu);
      })
      .then((response) => setWiadomosci(response.data))
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h2>Chat</h2>
      {wiadomosci.map((wiadomosc, index) => (
        <p key={index}>
          {wiadomosc.message} - {wiadomosc.author_d}
        </p>
      ))}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatComponent;
