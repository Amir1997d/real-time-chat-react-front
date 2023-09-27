export const extractTags = (text) => {
    const words = text.split(/\s+/);
    const tags = [];
    for (const word of words) {
      if (word.startsWith("#")) {
        const tag = word.slice(1);
        tags.push(tag);
      }
    }
    return tags;
};

export  const processTagInput = (input) => {
    if (!input.startsWith('#') && input !== '') {
      return '#' + input;
    }
    return input;
};
