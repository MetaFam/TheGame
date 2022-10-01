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
import { Maybe, Optional } from '@metafam/utils';
import { MetaLink } from 'components/Link';
import { ColorBar } from 'components/Player/ColorBar';
import {
  getPersonalityInfo,
  images as MaskImages,
  PersonalityInfo,
} from 'graphql/queries/enums/getPersonalityInfo';
import { PersonalityOption } from 'graphql/types';
import React, { useEffect, useState } from 'react';

import { ProfileWizardPane } from './ProfileWizardPane';
import { MaybeModalProps, WizardPaneCallbackProps } from './WizardPane';

export type ColorButtonsProps = {
  mask: number;
  setMask: (
    bit: number | ((prev: Optional<Maybe<number>>) => Maybe<number>),
  ) => void;
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

export const ColorButtons: React.FC<ColorButtonsProps> = ({
  mask,
  setMask,
  types,
  disabled = false,
}) => (
  <Wrap spacing={[3, 7]} maxW="60rem" w="100%" justify="center">
    {Object.entries(MaskImages)
      .reverse()
      .map(([bitString, image], idx) => {
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
                setMask((previous) =>
                  toggleBit({ base: previous ?? undefined, bit }),
                )
              }
              ref={(input) => {
                if (idx === 0 && !input?.getAttribute('focused-once')) {
                  input?.focus();
                  input?.setAttribute('focused-once', 'true');
                }
              }}
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

export const SetupPersonalityType: React.FC<MaybeModalProps> = ({
  buttonLabel,
  onClose,
  title = 'Personality Type',
}) => {
  const field = 'colorMask';

  const [types, setTypes] =
    useState<Maybe<Record<number, PersonalityOption>>>(null);

  useEffect(() => {
    const load = async () => {
      setTypes(await getPersonalityInfo());
    };
    load();
  }, []);

  return (
    <ProfileWizardPane
      {...{ field, buttonLabel, onClose }}
      title={title}
      prompt={
        <Text textAlign="center" maxW="30rem">
          <Text as="span">Please select what defines you. </Text>
          <MetaLink
            href="//humanparts.medium.com/the-mtg-color-wheel-c9700a7cf36d"
            isExternal
          >
            Wtf is this?
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
      {({
        register,
        loading,
        current = 0,
        setter,
      }: WizardPaneCallbackProps<number>) => {
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
              mask={current}
              setMask={setter}
              disabled={loading}
              {...{ types }}
            />
            {!loading && (
              <ColorBar
                {...{ types, loading }}
                mask={current ?? null}
                mt={5}
                w="min(90vw, 30rem)"
              />
            )}
          </Stack>
        );
      }}
    </ProfileWizardPane>
  );
};
