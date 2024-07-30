import {
  Input, MarkdownEditor, MarkdownViewer, Text, VStack,
} from '@metafam/ds';

import { BoxMetadata } from '#utils/boxTypes';

type CustomTextSectionProps = {
  title?: string;
  content?: string;
};

export const CustomTextSection: React.FC<CustomTextSectionProps> = ({
  title = '',
  content = '',
}) => (
  <VStack w="100%" p={6} align="stretch" pb={10}>
    <Text fontSize="lg" fontWeight="bold" textTransform="uppercase">
      {title}
    </Text>
    <MarkdownViewer>{content}</MarkdownViewer>
  </VStack>
);

export const CustomTextSectionMetadata: React.FC<{
  metadata: BoxMetadata;
  setMetadata: React.Dispatch<React.SetStateAction<BoxMetadata>>;
}> = ({ metadata, setMetadata }) => (
  <>
    <Input
      bg="dark"
      w="100%"
      placeholder="Provide the title"
      _placeholder={{ color: 'whiteAlpha.500' }}
      value={metadata.title ?? ''}
      onChange={({ target: { value: title } }) =>
        setMetadata((old) => ({ ...old, title }))
      }
      size="lg"
      borderRadius={0}
      borderColor="borderPurple"
      fontSize="md"
      borderWidth="2px"
    />
    <MarkdownEditor
      placeholder="Provide the content"
      value={metadata.content ?? ''}
      onChange={(content) => setMetadata((old) => ({ ...old, content }))}
    />
  </>
);
