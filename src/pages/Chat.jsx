import { useState, useEffect } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import './css/chat.css';
const Chat = () => {
  return (
    <section className="chat-section">
      <section className="chats-list">
        <div className="chat-name">Project CCC</div>
        <div className="chat-name">Project CCC</div>
        <div className="chat-name">Project CCC</div>
      </section>
      <section className="chat-window">
        <div className="chat-window-name">
          <h2>Project CCC</h2>
        </div>
        <div className="messages-container">
          <span className="message-text user-message">
            Ale ostra jazda bez trzymanki Ale ostra jazda bez trzymanki Ale
            ostra jazda bez trzymanki Ale ostra jazda bez trzymanki Ale ostra
            jazda bez trzymanki Ale ostra jazda bez trzymanki
          </span>
          <span className="message-text user-message">
            Ale ostra jazda bez trzymanki Ale ostra jazda bez trzymanki Ale
            ostra jazda bez trzymanki Ale ostra jazda bez trzymanki Ale ostra
            jazda bez trzymanki Ale ostra jazda bez trzymanki
          </span>
          <span className="message-text user-message">
            Ale ostra jazda bez trzymanki Ale ostra jazda bez trzymanki Ale
            ostra jazda bez trzymanki Ale ostra jazda bez trzymanki Ale ostra
            jazda bez trzymanki Ale ostra jazda bez trzymanki
          </span>
          <span className="message-text user-message">
            Ale ostra jazda bez trzymanki Ale ostra jazda bez trzymanki Ale
            ostra jazda bez trzymanki Ale ostra jazda bez trzymanki Ale ostra
            jazda bez trzymanki Ale ostra jazda bez trzymanki
          </span>
          <span className="message-text user-message">
            Ale ostra jazda bez trzymanki Ale ostra jazda bez trzymanki Ale
            ostra jazda bez trzymanki Ale ostra jazda bez trzymanki Ale ostra
            jazda bez trzymanki Ale ostra jazda bez trzymanki
          </span>
          <span className="message-text user-message">
            Ale ostra jazda bez trzymanki Ale ostra jazda bez trzymanki Ale
            ostra jazda bez trzymanki Ale ostra jazda bez trzymanki Ale ostra
            jazda bez trzymanki Ale ostra jazda bez trzymanki
          </span>
          <span className="message-text others-message">
            Witam witam szefie
          </span>
        </div>
        <div className="input-container">
          <input type="text" name="" id="" placeholder="type message here" />
          <button type="submit">
            <AiOutlineSend />
          </button>
        </div>
      </section>
    </section>
  );
};

export default Chat;
