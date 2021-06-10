import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { EditorState } from 'draft-js';
import dynamic from 'next/dynamic';
import React from 'react';
import { EditorProps } from 'react-draft-wysiwyg';

const Editor = dynamic<EditorProps>(
  import('react-draft-wysiwyg').then((res) => res.Editor),
  { ssr: false },
);

type Props = {
  editorState: EditorState;
  onEditorStateChange: any;
};

export const WYSIWYGEditor: React.FC<Props> = ({
  editorState,
  onEditorStateChange,
}) => (
  // const [editorState, setEditorState] = useState(EditorState.createEmpty());

  // const onEditorStateChange = (editorState: EditorState) => setEditorState(editorState)

  <div>
    <Editor
      toolbarStyle={{
        marginBottom: 0,
        backgroundColor: 'var(--chakra-colors-dark)',
        borderRadius: 'var(--chakra-radii-md) var(--chakra-radii-md) 0 0',
        borderLeft: '1px solid var(--chakra-colors-gray-300)',
        borderTop: '1px solid var(--chakra-colors-gray-300)',
        borderRight: '1px solid var(--chakra-colors-gray-300)',
      }}
      editorStyle={{
        padding: '5px',
        backgroundColor: 'var(--chakra-colors-dark)',
        borderRadius: '0 0 var(--chakra-radii-md) var(--chakra-radii-md)',
        borderLeft: '1px solid var(--chakra-colors-gray-300)',
        borderRight: '1px solid var(--chakra-colors-gray-300)',
        borderBottom: '1px solid var(--chakra-colors-gray-300)',
      }}
      editorState={editorState}
      onEditorStateChange={onEditorStateChange}
      toolbar={{
        options: [
          'inline',
          'blockType',
          'list',
          'link',
          'embedded',
          'emoji',
          'remove',
          'history',
        ],
      }}
    />
    <style jsx>
      {`
        .rdw-dropdown-wrapper {
          height: 20px;
        }
      `}
    </style>
  </div>
);
