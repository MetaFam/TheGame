import 'react-markdown-editor-lite/lib/index.css';

import MarkdownIt from 'markdown-it';
import dynamic from 'next/dynamic';

const mdParser = new MarkdownIt(/* Markdown-it options */);

const Editor = dynamic(() => import('react-markdown-editor-lite'), {
  ssr: false,
});

export const MarkdownEditor: React.FC<{
  value: string;
  height?: string;
  placeholder?: string;
  onChange: (newValue: string) => void;
}> = ({ value, placeholder, height, onChange }) => (
  <Editor
    value={value}
    placeholder={placeholder}
    style={{
      height: height ?? '20rem',
      width: '100%',
    }}
    renderHTML={(text) => mdParser.render(text)}
    onChange={({ text }) => onChange(text)}
  />
);
