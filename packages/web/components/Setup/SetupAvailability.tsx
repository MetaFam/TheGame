import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
  MetaButton,
  MetaHeading,
  Spinner,
  Text,
} from '@metafam/ds';
import { Maybe } from '@metafam/utils';
import { FlexContainer } from 'components/Container';
import { useSetupFlow } from 'contexts/SetupContext';
import { useInsertCacheInvalidationMutation } from 'graphql/autogen/types';
import { useProfileField, useSaveCeramicProfile, useUser } from 'lib/hooks';
import React, { ReactElement, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export const StatusedSubmitButton = ({
  label = 'Submit',
  status = null,
  ...props
}: {
  label?: Maybe<string>;
  status?: Maybe<string | ReactElement>;
}) => (
  <MetaButton type="submit" disabled={!!status} mt={10} {...props}>
    {status == null ? (
      label
    ) : (
      <Flex align="center">
        <Spinner mr={3} />
        {typeof status === 'string' ? <Text>{status}</Text> : status}
      </Flex>
    )}
  </MetaButton>
);

export const SetupAvailability: React.FC = () => {
  const field = 'availableHours';
  const { onNextPress, nextButtonLabel } = useSetupFlow();
  const [status, setStatus] = useState<Maybe<string | ReactElement>>();
  const { user } = useUser();
  const { value: existing } = useProfileField<number>({
    field,
    player: user,
    owner: true,
  });
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();
  const saveToCeramic = useSaveCeramicProfile({ setStatus, fields: [field] });
  const [, invalidateCache] = useInsertCacheInvalidationMutation();

  useEffect(() => {
    setValue(field, existing);
  }, [existing, setValue]);

  const onSubmit = async (values: { [field]: Maybe<number> }) => {
    setStatus('Saving to Ceramic…');
    await saveToCeramic({ values });

    setStatus('Invalidating Cache…');
    await invalidateCache({ playerId: user?.id });

    onNextPress();
  };

  return (
    <FlexContainer as="form" onSubmit={handleSubmit(onSubmit)}>
      <MetaHeading mb={5} textAlign="center">
        Avail&#xAD;ability
      </MetaHeading>
      <Text mb={10} textAlign="center">
        What is your weekly availability for any kind of freelance work?
      </Text>
      <FormControl isInvalid={errors[field]}>
        <InputGroup
          borderColor="transparent"
          mb={10}
          maxW="15rem"
          margin="auto"
        >
          <InputLeftElement>
            <Text as="span" role="img" aria-label="clock">
              🕛
            </Text>
          </InputLeftElement>
          <Input
            type="number"
            placeholder="23"
            pl={9}
            background="dark"
            borderTopEndRadius={0}
            borderBottomEndRadius={0}
            borderRight={0}
            {...register('availableHours', {
              valueAsNumber: true,
              min: {
                value: 0,
                message: 'It’s not possible to be available for negative time.',
              },
              max: {
                value: 24 * 7,
                message: `There’s only ${24 * 7} hours in a week.`,
              },
            })}
          />
          <InputRightAddon background="purpleBoxDark" color="white">
            <Text as="sup">hr</Text> ⁄ <Text as="sub">week</Text>
          </InputRightAddon>
        </InputGroup>
        <Box minH="3em">
          <FormErrorMessage>{errors[field]?.message}</FormErrorMessage>
        </Box>
      </FormControl>

      <StatusedSubmitButton label={nextButtonLabel} {...{ status }} />
    </FlexContainer>
  );
};
