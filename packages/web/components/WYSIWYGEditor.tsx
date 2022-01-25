import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { Box } from '@metafam/ds';
import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Maybe } from 'graphql/autogen/types';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { EditorProps } from 'react-draft-wysiwyg';
import { stateFromHTML } from 'utils/stateFromHTML';

const Editor = dynamic<EditorProps>(
  import('react-draft-wysiwyg').then((res) => res.Editor),
  { ssr: false },
);

export type Props = {
  value: string;
  onChange: (content: string) => void;
};

const getEditorState = async (str?: Maybe<string>): Promise<EditorState> => {
  if (str) {
    const contentState = await stateFromHTML(str);
    return EditorState.createWithContent(contentState);
  }
  return EditorState.createEmpty();
};

export const WYSIWYGEditor: React.FC<Props> = ({
  value = '',
  onChange,
  ...props
}) => {
  const [editorState, setEditorState] = useState<EditorState>();
  const onEditorStateChange = (state: EditorState) => {
    setEditorState(state);
    onChange(draftToHtml(convertToRaw(state.getCurrentContent())));
  };

  useEffect(() => {
    const def = async () => {
      setEditorState(await getEditorState(value));
    };
    if (value != null && value.trim() !== '') {
      def();
    }
  });

  return (
    <Box>
      <Editor
        {...props}
        {...{ editorState, onEditorStateChange }}
        toolbarStyle={{
          marginBottom: 0,
          backgroundColor: 'var(--chakra-colors-dark)',
          borderRadius: 'var(--chakra-radii-md) var(--chakra-radii-md) 0 0',
          borderLeft: '1px solid var(--chakra-colors-gray-300)',
          borderTop: '1px solid var(--chakra-colors-gray-300)',
          borderRight: '1px solid var(--chakra-colors-gray-300)',
          color: 'black',
        }}
        editorStyle={{
          padding: '5px',
          backgroundColor: 'var(--chakra-colors-dark)',
          borderRadius: '0 0 var(--chakra-radii-md) var(--chakra-radii-md)',
          borderLeft: '1px solid var(--chakra-colors-gray-300)',
          borderRight: '1px solid var(--chakra-colors-gray-300)',
          borderBottom: '1px solid var(--chakra-colors-gray-300)',
        }}
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
      <style jsx>{`
        .rdw-dropdown-wrapper {
          height: 20px;
        }
      `}</style>
    </Box>
  );
};
