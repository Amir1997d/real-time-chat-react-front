import React from 'react';
import { handleInputChange, addTagHandler, handleSuggestionClick } from '../../helpers/tagInputHandlers'; 

const TagInput = ({
  tags,
  setTags,
  tagInput,
  setTagInput,
  messages,
  setMessages,
  tagsArray,
  suggestions,
  setSuggestions,
  originalMessages }) => {

  return (
    <div>
      <form className='tag-form'>
        <input type='text' onChange={(e) => handleInputChange(e, setTagInput, tagsArray, setSuggestions)} value={tagInput} />
        <button type='submit' title='Add Tag' onClick={(e) => addTagHandler(e, tags, setTags, tagInput, setTagInput, messages, setMessages, originalMessages)}><i className="fa-solid fa-plus"></i></button>
      </form>
      <div className='suggest-box'>
        {suggestions.map((suggestion, index) => (
          <div key={index} className='suggestion' onClick={() => handleSuggestionClick(suggestion, setTagInput, setSuggestions)}>
            {suggestion}
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagInput;
