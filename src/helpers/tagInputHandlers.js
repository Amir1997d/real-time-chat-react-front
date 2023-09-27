import { extractTags } from './helpers'

export const handleInputChange = (e, setTagInput, tagsArray, setSuggestions) => {
    const inputText = e.target.value;
    const filteredTags = tagsArray.filter(tagObj => tagObj.name.startsWith(inputText)).map(tagObj => tagObj.name);
    setSuggestions(filteredTags);
    setTagInput(inputText);
}

export const applyTagFilter = async (messages, setMessages, tags) => {
    const myMessages = messages.map(message => {
        const messageTags = extractTags(message.text);
        if (tags.length === 0 || messageTags.length === 0) {
            return message;
        }
        else {
            const messageTagSet = new Set(messageTags);
            const hasMatchingTags = tags.some(tag => messageTagSet.has(tag.name));
            if (hasMatchingTags) {
                return message;
            } 
            else {
                return null;
            }
        }
    })
    .filter(message => message !== null);
    setMessages(myMessages); 
};

export const addTagHandler = (e, tags, setTags, tagInput, setTagInput, messages, setMessages, originalMessages) => {
    e.preventDefault();
    const repeatedTag = tags.some(tag => tag.name === tagInput);
    if (tagInput !== '' && !repeatedTag) {
      const updatedTags = [...tags, { id: Math.random(), name: tagInput }];
      setTags(updatedTags);
      setTagInput('');
      setMessages(originalMessages);
      applyTagFilter(originalMessages, setMessages, updatedTags);
    } else {
      setTagInput('');
    }
};

export const handleSuggestionClick = (suggestion, setTagInput, setSuggestions) => {
    setTagInput(suggestion);
    setSuggestions([]);
};
