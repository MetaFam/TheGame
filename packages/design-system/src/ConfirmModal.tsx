import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import React, { useRef } from 'react';

import { MetaButton } from './MetaButton';

type Props = {
  isOpen: boolean;
  onNope: () => void;
  onYep: () => void;
  header?: React.ReactNode;
  body?: React.ReactNode;
  loading?: boolean;
  loadingText?: string;
};

export const ConfirmModal: React.FC<Props> = ({
  isOpen,
  onNope,
  onYep,
  header,
  body,
  loading,
  loadingText,
}) => {
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onNope}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {header || ' Are you sure ?'}
          </AlertDialogHeader>

          {body && <AlertDialogBody>{body}</AlertDialogBody>}

          <AlertDialogFooter>
            <MetaButton ref={cancelRef} onClick={onNope} isDisabled={loading}>
              Nope
            </MetaButton>
            <MetaButton
              colorScheme="red"
              onClick={onYep}
              isLoading={loading}
              loadingText={loadingText}
              ml={3}
            >
              Yep
            </MetaButton>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
