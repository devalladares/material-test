// Central place for all Gemini prompts
export const PROMPTS = {
  DEFAULT_DOODLE: "Transform this simple doodle into a detailed, vibrant illustration. Maintain the core shapes and structure of the original drawing, but enhance it with additional details, colors, and artistic elements. The interpretation should feel whimsical and imaginative, as if bringing a child's drawing to life while respecting the original sketch's essence.",
  
  MEME_STYLE: "Have fun and transform this simple doodle into a dank meme. Be creative and humorous while keeping the core elements and minimal line style of the original drawing. When you use words, make sure they are coherent.",
  
  CARTOON_STYLE: "Transform this doodle into a cute cartoon character. Add personality and charm while maintaining the original sketch's style.",
  
  ABSTRACT_STYLE: "Convert this doodle into a colorful abstract artwork. Play with colors and shapes while keeping the essence of the original lines."
};

// Current active prompt - can be changed dynamically
export const getCurrentPrompt = () => PROMPTS.MEME_STYLE; 