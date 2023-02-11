import {
  Box,
  Button,
  Image,
  Input,
  Stack,
  Text,
  Wrap,
  WrapItem,
} from '@metafam/ds';
import {
  composeDBProfileFieldFiveColorDisposition,
  maskFor,
  Maybe,
  Optional,
} from '@metafam/utils';
import { MetaLink } from 'components/Link';
import { ColorBar } from 'components/Player/ColorBar';
import {
  getPersonalityInfo,
  images as MaskImages,
  PersonalityInfo,
} from 'graphql/queries/enums/getPersonalityInfo';
import { PersonalityOption } from 'graphql/types';
import { useQuerySelfFromComposeDB } from 'lib/hooks/ceramic/useGetOwnProfileFromComposeDB';
import { usePlayerSetupSaveToComposeDB } from 'lib/hooks/ceramic/usePlayerSetupSaveToComposeDB';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { dispositionFor } from 'utils/playerHelpers';

import { useShowToastOnQueryError } from './SetupProfile';
import { MaybeModalProps, WizardPane } from './WizardPane';

const field = composeDBProfileFieldFiveColorDisposition;

export const SetupPersonalityType: React.FC<MaybeModalProps> = ({
  buttonLabel,
  onClose,
  title = 'Personality Type',
}) => {
  const {
    error,
    fetching,
    result: existing,
  } = useQuerySelfFromComposeDB<string>({
    field,
  });

  useShowToastOnQueryError(error);

  const formMethods = useForm<{ [field]: string | undefined }>();
  const {
    watch,
    setValue,
    formState: { dirtyFields },
  } = formMethods;

  useEffect(() => {
    setValue(field, existing);
  }, [existing, setValue]);

  const current = watch(field, existing);
  const dirty = current !== existing || !!dirtyFields[field];

  const { onSubmit, status } = usePlayerSetupSaveToComposeDB<string>({
    isChanged: dirty,
  });

  return (
    <FormProvider {...formMethods}>
      <WizardPane
        {...{ buttonLabel, field, onClose, onSubmit, status, title }}
        prompt={
          <Text textAlign="center" maxW="30rem">
            <Text as="span">Please select what defines you. </Text>
            <MetaLink
              href="//humanparts.medium.com/the-mtg-color-wheel-c9700a7cf36d"
              isExternal
            >
              WTF is this?
            </MetaLink>
            <Text as="span"> Not sure what type you are? Take </Text>
            <MetaLink
              href="//dysbulic.github.io/5-color-radar/#/explore/"
              isExternal
            >
              a quick exam
            </MetaLink>
            <Text as="span"> or </Text>
            <MetaLink
              href="//dysbulic.github.io/5-color-radar/#/test/"
              isExternal
            >
              a longer quiz
            </MetaLink>
            .
          </Text>
        }
      >
        <PersonalityTypeField current={current} fetching={fetching} />
      </WizardPane>
    </FormProvider>
  );
};

const PersonalityTypeField: React.FC<{
  current: string | undefined;
  fetching: boolean;
}> = ({ current, fetching }) => {
  const { register, setValue } = useFormContext();

  const [types, setTypes] =
    useState<Maybe<Record<number, PersonalityOption>>>(null);

  const currentAsMask = useMemo(
    () => (current ? maskFor(current) ?? 0 : 0),
    [current],
  );

  const setter = useCallback(
    (val: (prev: Optional<Maybe<string>>) => Maybe<string>) => {
      setValue(field, val(current));
    },
    [current, setValue],
  );

  useEffect(() => {
    const load = async () => {
      setTypes(await getPersonalityInfo());
    };
    load();
  }, []);

  if (types == null) {
    return (
      <Text fontStyle="italic" textAlign="center">
        Loading Personality Information…
      </Text>
    );
  }

  return (
    <Stack align="center" mt={10}>
      <Input type="hidden" {...register(field, {})} />
      <ColorButtons
        mask={currentAsMask}
        setMask={setter}
        disabled={fetching}
        {...{ types }}
      />
      {!fetching && (
        <ColorBar
          {...{ types, loading: fetching }}
          mask={currentAsMask ?? null}
          mt={5}
          w="min(90vw, 30rem)"
        />
      )}
    </Stack>
  );
};

type ColorButtonsProps = {
  mask: number;
  setMask: (bit: (prev: Optional<Maybe<string>>) => Maybe<string>) => void;
  types: NonNullable<PersonalityInfo>;
  disabled: boolean;
};

// newMask should always only have at most a single bit
// set — the one being toggled
const toggleBit = ({
  base = 0,
  bit = 0,
}: {
  base?: number;
  bit?: number;
}): number => {
  if ((base & bit) > 0) {
    // if the bit in mask is set
    return base & ~bit; // unset it
  }
  return base | bit; // otherwise set it
};

const ColorButtons: React.FC<ColorButtonsProps> = ({
  mask,
  setMask,
  types,
  disabled = false,
}) => (
  <Wrap spacing={[3, 7]} maxW="60rem" w="100%" justify="center">
    {Object.entries(MaskImages)
      .reverse()
      .map(([bitString, image]) => {
        const type = types[bitString];

        if (!type) {
          return (
            <Text textAlign="center">
              Could not find a type for 0b
              {Number(bitString).toString(2).padStart(5, '0')}.
            </Text>
          );
        }

        const { name, mask: bit = 0, description } = type;
        const selected = (mask & bit) > 0;

        return (
          <WrapItem key={bit}>
            <Button
              justifyContent="space-between"
              w={{ base: '100%', md: 'sm' }}
              py={4}
              px={10}
              borderRadius="lg"
              cursor="pointer"
              height="auto"
              onClick={() =>
                setMask((previous) => {
                  const previousMask = maskFor(previous);
                  return dispositionFor(
                    toggleBit({ base: previousMask ?? undefined, bit }),
                  );
                })
              }
              transition="background 0.25s, filter 0.75s"
              bg={selected ? 'purpleBoxDark' : 'purpleBoxLight'}
              _hover={{ filter: 'hue-rotate(25deg)' }}
              _focus={{
                borderColor: '#FFFFFF88',
                outline: 'none',
                filter: 'brightness(1.25)',
              }}
              _active={{
                bg: selected ? 'purpleBoxDark' : 'purpleBoxLight',
              }}
              borderWidth={2}
              borderColor={selected ? 'purple.400' : 'transparent'}
              isDisabled={disabled}
            >
              {/* <Flex > */}
              <Box w="30%">
                <Image w={16} h={16} mr={2} src={image} alt={name} />
              </Box>
              <Stack w="70%">
                <Text color="white" casing="uppercase">
                  {name}
                </Text>
                <Text
                  color="blueLight"
                  fontWeight="normal"
                  whiteSpace="initial"
                >
                  {description}
                </Text>
              </Stack>
              {/* </Flex> */}
            </Button>
          </WrapItem>
        );
      })}
  </Wrap>
);
