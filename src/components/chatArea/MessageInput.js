import React from 'react';
import { extractTags } from '../../helpers/helpers';


const MessageInput = ({ msgInput, setMsgInput, socket }) => {
  const addMsgHandler = async (event) => {
    event.preventDefault();
    const tagsInMsg = extractTags(msgInput);
    socket.emit("newMessage", { text: msgInput });
    socket.emit("newTag", { tags: tagsInMsg });
    setMsgInput('');
  }
  return (
    <form className='msg-form'>
        <input type='text' onChange={(e) => setMsgInput(e.target.value)} value={msgInput} />
        <button type='submit' title='Send Message' onClick={(e) => addMsgHandler(e)}><i className="fa-solid fa-paper-plane"></i></button>
    </form>
  )
}

export default MessageInput;