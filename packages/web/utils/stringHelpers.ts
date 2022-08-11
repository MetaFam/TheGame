/* eslint-disable no-param-reassign */
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
  const options = {
    replace: (domNode: any) => {
      if (domNode.attribs?.href) {
        domNode.attribs.target = '_blank';
        domNode.attribs.title = `Opens new tab to ${domNode.attribs.href}`;
        domNode.attribs.class = 'external-link';
      }
    },
  };

  const parsed = parse(clean, options);
  return parsed;
};

/**
 * Takes a string of HTML elements, sanitizes it,
 * applies classNames to the elements & returns parsed HTML as
 * `JSX.Element | JSX.Element[] | string` */
export const safelyParseTextForTyping = (content: string) => {
  const clean = DOMPurify.sanitize(content);
  const options = {
    replace: (domNode: any) => {
      if (domNode.type === 'tag' && domNode.children.length > 0) {
        if (domNode.parent === null) {
          domNode.attribs.class = 'typing-text';
        }
        if (domNode.attribs?.href) {
          domNode.parent.attribs.class = 'dont-type';
          domNode.attribs.target = '_blank';
          domNode.attribs.title = `Opens new tab to ${domNode.attribs.href}`;
          domNode.attribs.class = 'external-link';
        }
      }
    },
  };

  const parsed = parse(clean, options);
  return parsed;
};
