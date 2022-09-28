/* eslint-disable no-param-reassign */
import DOMPurify from 'dompurify';
import parse, {
  DOMNode,
  Element,
  HTMLReactParserOptions,
} from 'html-react-parser';

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
  const options: HTMLReactParserOptions = {
    replace: (domNode: DOMNode) => {
      const element = domNode as Element;
      if (element.attribs?.href) {
        element.attribs.target = '_blank';
        element.attribs.title = `Opens new tab to ${element.attribs.href}`;
        element.attribs.class = 'external-link';
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
export const safelyParseTextForTyping = (
  content: string,
): JSX.Element | JSX.Element[] | string => {
  const clean = DOMPurify.sanitize(content);
  const options = {
    replace: (domNode: DOMNode) => {
      const element = domNode as Element;
      if (element.type === 'tag' && element.children.length > 0) {
        if (element.parent === null) {
          element.attribs.class = 'typing-text';
        }
        if (element.attribs?.href) {
          element.attribs.target = '_blank';
          element.attribs.title = `Opens new tab to ${element.attribs.href}`;
          element.attribs.class = 'external-link';
        }
      }
    },
  };

  const parsed = parse(clean, options);
  return parsed;
};
