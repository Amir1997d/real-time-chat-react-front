import './App.css';
import TagsPanel from './components/tagPanel/TagsPanel';
import TagInput from './components/tagPanel/TagInput';
import ChatArea from './components/chatArea/ChatArea';
import { useState, useEffect } from 'react';
import MessageInput from './components/chatArea/MessageInput';
import io from 'socket.io-client';

function App() {
  const [tags, setTags] = useState([]);
  const [messages, setMessages] = useState([]);
  const [msgInput, setMsgInput] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tagsArray, setTagsArray] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [originalMessages, setOriginalMessages] = useState([]); // Maintain the original messages here
  const socket = io('http://localhost:5000', {
    transports: ["websocket", "polling"]
  });
  
  function removeDuplicate(arrObj) {
    const uniqueArray = [];
    const seenNames = new Set();

    for (const item of arrObj) {
      if (!seenNames.has(item.name)) {
        seenNames.add(item.name);
        uniqueArray.push(item);
      }
    }
    return uniqueArray;
  }

  useEffect(() => {    
    socket.on('all-messages', (allMessages) => {
      setMessages(allMessages);
      setOriginalMessages(allMessages);
    });
    socket.on('newMessage', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });
    socket.on('all-tags', (allTags) => {
      const uniObj = removeDuplicate(allTags);
      setTagsArray(uniObj);
    });
    socket.on('newTag', (data) => {
      const uniObj = removeDuplicate(data);
      setTagsArray(uniObj);
    });
    return () => {
      socket.off('all-messages');
      socket.off('newMessage');
      socket.off('all-tags');
      socket.off('newTag');
    };
  }, []);
  

  return (
    <div className="app">
      <div className='tag-div'>
        <h2>My Tags</h2>
        <TagsPanel 
          tags={tags} 
          setTags={setTags} 
          messages={messages} 
          setMessages={setMessages}
          originalMessages={originalMessages}
        />
        <TagInput 
          tagInput={tagInput} 
          setTagInput={setTagInput} 
          tags={tags} 
          setTags={setTags} 
          tagsArray={tagsArray} 
          suggestions={suggestions} 
          setSuggestions={setSuggestions}
          messages={messages}
          setMessages={setMessages}
          originalMessages={originalMessages}
        />
      </div>
      <div className='chat-div'>
        <h2>Chat</h2>
        <ChatArea messages={messages} />
        <MessageInput
          msgInput={msgInput}
          setMsgInput={setMsgInput}
          socket={socket}
          setTags={setTags}
        />
      </div>
    </div>
  );
}

export default App;