import React from 'react';
import TagItem from './TagItem';
import { applyTagFilter } from '../../helpers/tagInputHandlers';

const TagsPanel = ({ tags, setTags, setMessages, originalMessages }) => {
  function deleteHandler(id) {
    setTags(prevTags => {
      const updatedTags = prevTags.filter(tag => tag.id !== id);
      applyTagFilter(originalMessages, setMessages, updatedTags);
      return updatedTags;
    });
  }
  return (
    <div className='tag-panel'>
      {tags.map((tag, index) => (
        <TagItem tag={tag} key={index} deleteHandler={() => deleteHandler(tag.id)} />
      ))}
    </div>
  )
}

export default TagsPanel;
