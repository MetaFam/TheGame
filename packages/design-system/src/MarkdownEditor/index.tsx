import dynamic from 'next/dynamic';
import React from 'react';

import { MarkdownViewer } from '../MarkdownViewer';

const Editor = dynamic(() => import('./MarkdownEditor.js'), {
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
      background: '#1B0D2A',
    }}
    defaultValue={value}
    placeholder={placeholder}
    renderHTML={(text) => <MarkdownViewer>{text}</MarkdownViewer>}
    onChange={({ text }) => onChange(text)}
    htmlClass="nonexistant-class"
    view={{
      menu: true,
      md: true,
      html: false,
    }}
  />
);
