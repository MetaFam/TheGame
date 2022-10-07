import 'react-markdown-editor-lite/lib/index.css';

import dynamic from 'next/dynamic';

import { MarkdownViewer } from '../MarkdownViewer';

const Editor = dynamic(() => import('./MarkdownEditor'), {
  ssr: false,
});

export const MarkdownEditor: React.FC<{
  value: string;
  height?: string;
  placeholder?: string;
  onChange: (newValue: string) => void;
}> = ({ value, placeholder, height, onChange }) => (
  <Editor
    style={{
      height: height ?? '20rem',
      width: '100%',
    }}
    defaultValue={value}
    placeholder={placeholder}
    renderHTML={(text) => <MarkdownViewer markdown={text} />}
    onChange={({ text }) => onChange(text)}
    // htmlClass="nonexistant-class"
    view={{
      menu: true,
      md: true,
      html: false,
    }}
  />
);
