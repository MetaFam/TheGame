import DOMPurify from 'dompurify';
import parse from 'html-react-parser';

export const hashCode = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash &= hash; // Convert to 32bit integer
  }
  return hash.toString();
};

/**
 * sanitize string of HTML & parse it into jsx elements
 * */
export const safelyParseContent = (content: string) => {
  const clean = DOMPurify.sanitize(content);
  return parse(clean);
};
