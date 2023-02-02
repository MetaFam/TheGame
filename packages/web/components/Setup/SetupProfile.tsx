import { useToast } from '@metafam/ds';
import { FlexContainer, PageContainer } from 'components/Container';
import { SetupHeader } from 'components/Setup/SetupHeader';
import { useSetupFlow } from 'contexts/SetupContext';
import React, { PropsWithChildren, useEffect } from 'react';
import { errorHandler } from 'utils/errorHandler';

export const SetupProfile: React.FC<PropsWithChildren> = ({ children }) => {
  const { options, stepIndex } = useSetupFlow();

  return (
    <PageContainer>
      {options.numSteps - 1 > stepIndex && <SetupHeader />}
      <FlexContainer flex={1} pt={[10, 12]}>
        {children}
      </FlexContainer>
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
