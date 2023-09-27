import React from 'react'

const TagItem = ({ tag, deleteHandler }) => {

  return (
    <div className='tag-box'>
        <span className='tag-item'>{"#" + tag.name}</span>
        <i className="fa-solid fa-trash" onClick={() => deleteHandler(tag.id)}></i>
    </div>
  )
}

export default TagItem;