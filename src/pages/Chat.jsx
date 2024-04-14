import { useRef, useState, useEffect, useContext } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { HiOutlineRefresh } from 'react-icons/hi';
import './css/chat.css';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
const Chat = () => {
  const [projects, setProjects] = useState([]);
  const [message, setMessage] = useState('');
  const [messagesList, setMessagesList] = useState([]);
  const [currentChat, setCurrentChat] = useState({});
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const { currentUser } = useContext(AuthContext);

  console.log(currentChat.id);

  const getProjects = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/student/${currentUser.id}/projects`
      );
      await setProjects(res.data);
      console.log(res.data);
      getChatMessages(res.data[0].id);
    } catch (error) {
      console.log(error);
    }
  };

  const getChatMessages = async (id) => {
    let res = {};
    try {
      setLoading(true);
      if (id !== undefined)
        res = await axios.get(`http://localhost:8080/im/conv/${id}`);
      else
        res = await axios.get(
          `http://localhost:8080/im/conv/${currentChat.id}`
        );
      setMessagesList(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendMessage = async () => {
    const data = {
      author_s: '',
      author_u: currentUser.id,
      author_d: currentUser.imie + ' ' + currentUser.nazwisko,
      message: message,
    };
    try {
      const res = await axios.post(
        `http://localhost:8080/im/write/${currentChat.id}`,
        data
      );
      setMessage('');
      getChatMessages();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeChat = (project) => {
    if (currentChat.id !== project.id) {
      setCurrentChat(project);
      getChatMessages(project.id);
    }
  };

  const scrollToLastMessage = () => {
    const lastChildElement = ref.current?.lastElementChild;
    lastChildElement?.scrollIntoView({ behavior: 'auto' });
  };

  console.log(loading, '|', currentChat.nazwa);

  useEffect(() => {
    getProjects();
  }, []);

  useEffect(() => {
    scrollToLastMessage();
  }, [messagesList]);

  return (
    <>
      <section className="chat-section">
        <section className="chats-list">
          {projects.map((project) => {
            return (
              <div
                className="chat-name"
                key={project.id}
                onClick={() => handleChangeChat(project)}
              >
                Project {project.nazwa}
              </div>
            );
          })}
        </section>
        <section className="chat-window">
          <div className="chat-window-name">
            <h2>{currentChat.nazwa}</h2>
            <button onClick={() => getChatMessages()}>
              <HiOutlineRefresh />
            </button>
          </div>
          <div className="messages-container" ref={ref}>
            {messagesList.map((message, index) => {
              if (!loading) {
                if (message.author_u === currentUser.id) {
                  return (
                    <span className="user-prompt" key={index}>
                      <h4>{message.author_d}</h4>
                      <span className="message-text user-message">
                        {message.message}
                      </span>
                    </span>
                  );
                } else {
                  return (
                    <span className="others-prompt" key={index}>
                      <h4>{message.author_d}</h4>
                      <span className="message-text others-message">
                        {message.message}
                      </span>
                    </span>
                  );
                }
              } else <h4>Loading...</h4>;
            })}
          </div>
          <div className="input-container">
            <input
              type="text"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="type message here"
            />
            <button type="submit" onClick={handleSendMessage}>
              <AiOutlineSend />
            </button>
          </div>
        </section>
      </section>
    </>
  );
};

export default Chat;
