import { ContentState, convertFromHTML } from 'draft-js';

async function serverDOMBuilder(): Promise<(html: string) => HTMLBodyElement> {
  const jsdom = await import('jsdom');
  const { JSDOM } = jsdom;

  const {
    document: jsdomDocument,
    HTMLElement,
    HTMLAnchorElement,
    Node,
  } = new JSDOM(`<!DOCTYPE html>`).window;
  global.HTMLElement = HTMLElement;
  global.HTMLAnchorElement = HTMLAnchorElement;
  global.Node = Node;

  const doc = jsdomDocument.implementation.createHTMLDocument('foo');

  return (html: string) => {
    doc.documentElement.innerHTML = html;

    return doc.getElementsByTagName('body')[0];
  };
}

export async function stateFromHTML(html: string): Promise<ContentState> {
  // if DOMBuilder is undefined convertFromHTML will use the browser dom,
  //  hence we set DOMBuilder to undefined when document exist
  const DOMBuilder =
    typeof document === 'undefined' ? await serverDOMBuilder() : undefined;
  const blocksFromHTML = convertFromHTML(html, DOMBuilder);

  return ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap,
  );
}
