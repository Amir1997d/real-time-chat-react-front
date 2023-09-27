import React, { useRef, useEffect } from 'react';
import MessageItem from './MessageItem';

const ChatArea = ({ messages }) => {
  const chatAreaRef = useRef(null);
  useEffect(() => {
    const chatAreaElement = chatAreaRef.current;
    if (chatAreaElement) {
      chatAreaElement.scrollTop = chatAreaElement.scrollHeight;
    }
  }, [messages]);

  return (
    <div className='chat-area' ref={chatAreaRef}>
      {messages.map((message, index) => (
         <MessageItem key={index} message={message} />
      ))}
    </div>
  );
};

export default ChatArea;
