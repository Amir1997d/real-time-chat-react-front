import React from 'react'

const MessageItem = ({ message }) => {
  return (
    <div className='msg-item'>
        <span>{message.text}</span>
    </div>
  );
};

export default MessageItem;