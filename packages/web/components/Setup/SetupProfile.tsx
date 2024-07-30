import { useDisclosure, useToast } from '@metafam/ds';
import { useRouter } from 'next/router';
import React, { lazy, PropsWithChildren, useCallback, useEffect } from 'react';

import { FlexContainer } from '#components/Container';
import { ComposeDBPromptModal } from '#components/Player/Profile/ComposeDBPromptModal';
import { SetupHeader } from '#components/Setup/SetupHeader';
import { useSetupFlow } from '#contexts/SetupContext';
import { useUser } from '#lib/hooks';
import { errorHandler } from '#utils/errorHandler';

const PageContainer = lazy(() => import('components/Container'));

export const SetupProfile: React.FC<PropsWithChildren> = ({ children }) => {
  const { options, stepIndex } = useSetupFlow();

  const router = useRouter();
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  const { user } = useUser();

  const onCompleted = useCallback(() => {
    router.push('/me');
  }, [router]);

  return (
    <PageContainer>
      {options.numSteps - 1 > stepIndex && <SetupHeader />}
      <FlexContainer flex={1} pt={[10, 12]}>
        {children}
      </FlexContainer>
      {user?.profile && !user.ceramicProfileId ? (
        <ComposeDBPromptModal
          player={user}
          {...{ isOpen, onCompleted, onClose }}
        />
      ) : null}
    </PageContainer>
  );
};

export const useShowToastOnQueryError = (error?: Error) => {
  const toast = useToast();

  useEffect(() => {
    if (error) {
      toast({
        title: 'Could not load your data',
        description: error.message,
        status: 'error',
        isClosable: true,
        duration: 12000,
      });
      errorHandler(error);
    }
  }, [error, toast]);
};
