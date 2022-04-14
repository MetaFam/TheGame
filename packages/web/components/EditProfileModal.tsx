/* eslint-disable no-console */

import { ImageSources } from '@datamodels/identity-profile-basic';
import {
  Box,
  BoxProps,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  FormLabelProps,
  Grid,
  GridItem,
  Image,
  InfoIcon,
  Input as ChakraInput,
  InputGroup,
  InputLeftElement,
  InputProps,
  InputRightAddon,
  Link,
  MetaHeading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  motion,
  SelectTimeZone,
  Spinner,
  StatusedSubmitButton,
  Text,
  Textarea,
  Tooltip,
  useToast,
  Wrap,
  WrapItem,
} from '@metafam/ds';
import {
  AllProfileFields,
  HasuraProfileProps,
  Images,
  Optional,
} from '@metafam/utils';
import FileOpenIcon from 'assets/file-open-icon.svg';
import BackgroundImage from 'assets/main-background.jpg';
import PlayerProfileIcon from 'assets/player-profile-icon.svg';
import {
  Maybe,
  Player,
  useInsertCacheInvalidationMutation,
} from 'graphql/autogen/types';
import { getPlayer } from 'graphql/getPlayer';
import { useProfileField, useSaveCeramicProfile, useWeb3 } from 'lib/hooks';
import { useRouter } from 'next/router';
import React, {
  ReactElement,
  RefObject,
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Controller, useForm } from 'react-hook-form';
import { optimizedImage } from 'utils/imageHelpers';
import { isEmpty } from 'utils/objectHelpers';

import { ConnectToProgress } from './ConnectToProgress';
import MeetWithWalletProfileEdition from './Player/MeetWithWalletProfileEdition';

const MAX_DESC_LEN = 420; // characters

export type ProfileEditorProps = {
  player?: Maybe<Player>;
  isOpen: boolean;
  onClose: () => void;
};

const Label: React.FC<FormLabelProps> = React.forwardRef(
  ({ children, ...props }, container) => {
    const ref = container as RefObject<HTMLLabelElement>;
    return (
      <FormLabel color="cyan" {...{ ref, ...props }}>
        {children}
      </FormLabel>
    );
  },
);

const Input = React.forwardRef<typeof ChakraInput, InputProps>(
  ({ children, ...props }, fwdRef) => {
    const [width, setWidth] = useState('9em');
    const ref = fwdRef as RefObject<HTMLInputElement>;
    const textRef = useRef<HTMLParagraphElement>(null);
    const isText = !props.type || props.type === 'text';

    const calcWidth = useCallback((text?: string) => {
      const layout = textRef.current;
      const modal = layout?.closest('form');
      if (layout && modal && text) {
        layout.textContent = text;
        const widths = [
          `calc(${modal.clientWidth}px - 2rem)`,
          `calc(${layout.scrollWidth}px + 2.25em)`,
        ];
        setWidth(`min(${widths.join(',')})`);
      }
    }, []);

    const recalcText = (event: SyntheticEvent<HTMLInputElement>) => {
      if (isText) {
        const {
          currentTarget: { value },
        } = event;
        calcWidth(value);
      }
    };

    return (
      <Box>
        <Text
          position="absolute"
          visibility="hidden"
          whiteSpace="pre"
          ref={textRef}
        ></Text>
        <ChakraInput
          color="white"
          bg="dark"
          minW="9rem"
          _autofill={{
            '&, &:hover, &:focus, &:active': {
              WebkitBoxShadow:
                '0 0 0 2em var(--chakra-colors-dark) inset !important',
              WebkitTextFillColor: 'white !important',
              caretColor: 'white',
            },
          }}
          onInput={recalcText}
          onFocus={recalcText}
          {...{ width, ref }}
          {...props}
        >
          {children}
        </ChakraInput>
      </Box>
    );
  },
);

export type Merge<P, T> = Omit<P, keyof T> & T;
export const MotionBox = motion<BoxProps>(Box);
export const PulseHoverBox: React.FC<{ duration?: number }> = ({
  // duration = 2,
  children,
}) => (
  <MotionBox
    whileHover={{
      scale: 1.2,
      // transition: { duration },
    }}
    whileTap={{ scale: 0.9 }}
  >
    {children}
  </MotionBox>
);

export const EditProfileModal: React.FC<ProfileEditorProps> = ({
  player,
  isOpen,
  onClose,
}) => {
  const [status, setStatus] = useState<Maybe<ReactElement | string>>();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const username = useMemo(() => player?.profile?.username, []);
  const params = useRouter();
  const debug = !!params.query.debug;
  const saveToCeramic = useSaveCeramicProfile({ debug, setStatus });
  const [, invalidateCache] = useInsertCacheInvalidationMutation();
  const {
    handleSubmit,
    register,
    setValue,
    control,
    watch,
    formState: { errors, dirtyFields },
  } = useForm();
  const { ceramic, address, chainId } = useWeb3();
  const toast = useToast();
  const description = watch('description');
  const remaining = useMemo(() => MAX_DESC_LEN - (description?.length ?? 0), [
    description,
  ]);

  const fields = Object.fromEntries(
    Object.keys(AllProfileFields).map((key) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { value } = useProfileField({
        field: key,
        player,
      });
      return [key, value];
    }),
  );

  const endpoints = Object.fromEntries(
    Object.keys(Images).map((hasuraId) => {
      const key = hasuraId as keyof typeof Images;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [active, setActive] = useState(false);
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [loading, setLoading] = useState(true);
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [url, setURL] = useState<Optional<string>>(
        optimizedImage(key, fields[key]),
      );
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [file, setFile] = useState<Maybe<File>>(null);
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const ref = useRef<HTMLImageElement>(null);
      // key ends in “URL”
      return [
        key,
        {
          loading,
          active,
          val: url,
          file,
          ref,
          setLoading,
          setActive,
          setURL,
          setFile,
        },
      ];
    }),
  );

  if (debug) {
    console.debug({ fields, endpoints });
  }

  useEffect(() => {
    if (!endpoints.profileImageURL.ref.current) {
      console.warn('Unable to initially focus the profile image.');
    } else {
      endpoints.profileImageURL.ref.current.focus();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    Object.entries(fields).forEach(([key, value]) => {
      if (!key.startsWith('_')) {
        setValue(key, value ?? undefined);
      }
    });
  }, [setValue]); // eslint-disable-line react-hooks/exhaustive-deps

  const onFileChange = useCallback(
    ({ target: input }: { target: HTMLInputElement }) => {
      const file = input.files?.[0];
      if (!file) return;
      const key = input.name as keyof typeof endpoints;
      endpoints[key].setLoading(true);
      endpoints[key].setFile(file);
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        endpoints[key].setURL(reader.result as string);
      });
      reader.addEventListener('error', ({ target }) => {
        const { error } = target ?? {};
        toast({
          title: 'Image Loading Error',
          description: `Loading Images Error: “${error?.message}”`,
          status: 'error',
          isClosable: true,
          duration: 10000,
        });
        endpoints[key].setLoading(false);
      });
      reader.readAsDataURL(file);
    },
    [endpoints, toast],
  );

  if (!ceramic || !saveToCeramic) {
    toast({
      title: 'Ceramic Connection Error',
      description: 'Unable to connect to the Ceramic API to save changes.',
      status: 'error',
      isClosable: true,
      duration: 8000,
    });
    onClose();
    return null;
  }

  const onSubmit = async (inputs: HasuraProfileProps) => {
    try {
      if (isEmpty(dirtyFields)) {
        return onClose();
      }

      if (!ceramic.did?.authenticated) {
        setStatus(<Text>Authenticating DID…</Text>);
        await ceramic.did?.authenticate();
      }

      if (debug) {
        console.debug(`For ETH Address: ${address}`);
        console.debug(`Connected DID: ${ceramic.did?.id}`);
      }

      setStatus(
        <Text>
          Uploading images to
          <Link href="//web3.storage" ml={1}>
            web3.storage
          </Link>
          …
        </Text>,
      );

      const formData = new FormData();
      const files: Record<string, File> = {};
      const images: Record<string, ImageSources> = {};
      const values = { ...inputs };
      Object.keys(Images).forEach((hasuraId) => {
        const key = hasuraId as keyof typeof Images;
        if (endpoints[key].file) {
          files[key] = endpoints[key].file as File;
        }
        delete values[key];
      });

      if (debug) {
        console.debug({ inputs, values, files, endpoints });
      }

      const toType = (key: string) => {
        const match = key.match(/^(.+?)(Image)?(URL)$/i);
        const [name] = match?.slice(1) ?? ['unknown'];
        return name;
      };

      if (Object.keys(files).length > 0) {
        Object.entries(files).forEach(([key, file]) => {
          formData.append(toType(key), file);
        });
        const result = await fetch(`/api/storage`, {
          method: 'POST',
          body: formData,
          credentials: 'include',
        });
        const response = await result.json();
        const { error } = response;
        if (result.status >= 400 || error) {
          throw new Error(
            `web3.storage ${result.status} response: "${
              error ?? result.statusText
            }"`,
          );
        }

        Object.keys(files).forEach((key: string) => {
          const tKey = toType(key);
          if (!response[tKey]) {
            toast({
              title: 'Error Saving Image',
              description: `Uploaded "${tKey}" & didn't get a response back.`,
              status: 'warning',
              isClosable: true,
              duration: 8000,
            });
          } else {
            const { val, ref } = endpoints[key];
            let [, mime] = val?.match(/^data:([^;]+);/) ?? [];
            mime ??= 'image/*';

            const elem = ref.current as HTMLImageElement | null;
            const props: { width?: number; height?: number } = {};
            ['width', 'height'].forEach((prop) => {
              props[prop as 'width' | 'height'] = Math.max(
                elem?.[
                  `natural${prop[0].toUpperCase()}${prop.slice(1)}` as
                    | 'naturalWidth'
                    | 'naturalHeight'
                ] ?? 0,
                elem?.[prop as 'width' | 'height'] ?? 0,
                1,
              );
            });
            images[key as keyof typeof Images] = {
              original: {
                src: `ipfs://${response[tKey]}`,
                mimeType: mime,
                ...props,
              },
            } as ImageSources;
          }
        });
      }

      if (debug) {
        console.debug({ files, values, inputs, dirtyFields });
      }

      Object.keys(values).forEach((hasuraId) => {
        const key = hasuraId as keyof HasuraProfileProps;
        if (!dirtyFields[key]) {
          if (debug) {
            let display = values[key];
            if (typeof display === 'string' && display.length > 20) {
              display = `${display.slice(0, 20)}…`;
            }
            console.info(`Removing Unchanged Value [${key}]: “${display}”`);
          }
          delete values[key];
        }
      });

      await saveToCeramic({ values, images });

      if (player) {
        setStatus(<Text>Invalidating Cache…</Text>);
        await invalidateCache({ playerId: player.id });
      }

      // if they changed their username, the page will 404 on reload
      if (player && inputs.username !== username) {
        window.history.replaceState(
          null,
          `${inputs.name ?? inputs.username}’s MetaGame Profile`,
          `/player/${player.ethereumAddress}`,
        );
      }

      return onClose();
    } catch (err) {
      toast({
        title: 'Ceramic Error',
        description: `Error saving profile: ${(err as Error).message}`,
        status: 'error',
        isClosable: true,
        duration: 15000,
      });
      return null;
    } finally {
      setStatus(null);
    }
  };

  if (chainId !== '0x1') {
    return <ConnectToProgress />;
  }

  return (
    <Modal {...{ isOpen, onClose }}>
      <ModalOverlay />
      <ModalContent
        maxW={['100%', 'min(80%, 60rem)']}
        backgroundImage={`url(${BackgroundImage})`}
        bgSize="cover"
        bgAttachment="fixed"
        p={[0, 8, 12]}
        as="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <ModalHeader>
          <MetaHeading color="white">Profile</MetaHeading>
        </ModalHeader>
        <ModalCloseButton
          color="pinkShadeOne"
          size="xl"
          p={{ base: 1, sm: 4 }}
          _focus={{ boxShadow: 'none' }}
        />
        <ModalBody p={[0, 2]}>
          `{' '}
          <Grid
            templateColumns={['auto', 'auto', '1fr 1fr', '1fr 1fr 1fr']}
            gap={6}
          >
            <GridItem flex={1}>
              <FormControl isInvalid={errors.profileImageURL} align="center">
                <Tooltip label="An image representing the user generally cropped to a circle for display. 1MiB maximum size.">
                  <Label htmlFor="profileImageURL" userSelect="none">
                    Profile Image
                    <InfoIcon ml={2} />
                  </Label>
                </Tooltip>
                <Center position="relative" justifyContent="left">
                  <Box
                    w="10em"
                    h="10em"
                    borderRadius="full"
                    display="inline-flex"
                  >
                    <PulseHoverBox>
                      <Image
                        ref={endpoints.profileImageURL.ref ?? null}
                        onLoad={() => {
                          endpoints.profileImageURL.setLoading(false);
                        }}
                        display={
                          endpoints.profileImageURL.loading ? 'none' : 'inherit'
                        }
                        src={endpoints.profileImageURL.val}
                        borderRadius="full"
                        objectFit="cover"
                        h="full"
                        w="full"
                        border="2px solid"
                        borderColor={
                          endpoints.profileImageURL.active
                            ? 'blue.400'
                            : 'transparent'
                        }
                      />
                    </PulseHoverBox>
                    <Center>
                      {endpoints.profileImageURL.loading &&
                        (endpoints.profileImageURL.val == null ? (
                          <Image
                            maxW="50%"
                            src={PlayerProfileIcon}
                            opacity={0.5}
                          />
                        ) : (
                          <Spinner
                            size="xl"
                            color="purple.500"
                            thickness="4px"
                          />
                        ))}
                    </Center>
                  </Box>
                  <Controller
                    {...{ control }}
                    name="profileImageURL"
                    defaultValue={[]}
                    render={({ field: { onChange, value, ...props } }) => (
                      <Input
                        {...props}
                        type="file"
                        value={value?.filename ?? ''}
                        onChange={async (evt) => {
                          onChange(evt.target.files);
                          onFileChange(evt);
                        }}
                        minW="100% !important"
                        minH="100%"
                        position="absolute"
                        top={0}
                        bottom={0}
                        left={0}
                        right={0}
                        opacity={0}
                        onFocus={() =>
                          endpoints.profileImageURL.setActive(true)
                        }
                        onBlur={() =>
                          endpoints.profileImageURL.setActive(false)
                        }
                      />
                    )}
                  />
                </Center>
                <FormErrorMessage>
                  {errors.profileImageURL?.message}
                </FormErrorMessage>
              </FormControl>
            </GridItem>
            {[
              {
                key: 'bannerImageURL',
                title: 'Header Banner',
                description:
                  'An image with an ~3:1 aspect ratio to be displayed as a page or profile banner. 1MiB maximum size.',
              },
              {
                key: 'backgroundImageURL',
                title: 'Page Background',
                description:
                  'An image with an ~1:1 aspect ratio to be the page background. 1MiB maximum size.',
              },
            ].map(({ key, title, description: spec }) => (
              <GridItem flex={1} {...{ key }}>
                <FormControl isInvalid={errors[key]} align="center">
                  <Tooltip label={spec}>
                    <Label htmlFor={key} userSelect="none" whiteSpace="nowrap">
                      {title}
                      <InfoIcon ml={2} />
                    </Label>
                  </Tooltip>
                  <Center
                    position="relative"
                    maxW="12em"
                    h="10em"
                    border="2px solid"
                    borderColor={
                      endpoints[key].active ? 'blue.400' : 'transparent'
                    }
                    justifyContent="left"
                  >
                    <Image
                      ref={endpoints[key].ref ?? null}
                      onLoad={() => {
                        endpoints[key].setLoading(false);
                      }}
                      display={endpoints[key].loading ? 'none' : 'inherit'}
                      src={endpoints[key].val}
                      h="full"
                      w="full"
                    />
                    {endpoints[key].loading &&
                      (endpoints[key].val == null ? (
                        <Image maxW="50%" src={FileOpenIcon} opacity={0.5} />
                      ) : (
                        <Spinner size="xl" color="purple.500" thickness="4px" />
                      ))}
                    <Controller
                      control={control}
                      name={key}
                      defaultValue={[]}
                      render={({ field: { onChange, value, ...props } }) => (
                        <Input
                          type="file"
                          {...props}
                          value={value?.filename}
                          onChange={async (evt) => {
                            onChange(evt.target.files);
                            onFileChange(evt);
                          }}
                          maxW="100%"
                          minH="100%"
                          position="absolute"
                          top={0}
                          bottom={0}
                          left={0}
                          right={0}
                          opacity={0}
                          onFocus={() => endpoints[key].setActive(true)}
                          onBlur={() => endpoints[key].setActive(false)}
                        />
                      )}
                    />
                  </Center>
                  <FormErrorMessage>{errors[key]?.message}</FormErrorMessage>
                </FormControl>
              </GridItem>
            ))}
            <GridItem flex={1}>
              <FormControl isInvalid={errors.description}>
                <Tooltip label={`${MAX_DESC_LEN} characters max.`}>
                  <Label htmlFor="description" userSelect="none">
                    Bio
                    <Text as="sup" ml={2}>
                      {remaining}
                    </Text>
                    ⁄<Text as="sub">{MAX_DESC_LEN}</Text>
                    <InfoIcon ml={2} />
                  </Label>
                </Tooltip>
                <Textarea
                  placeholder="Describe yourself."
                  minW="min(18em, calc(100vw - 2rem))"
                  h="10em"
                  color="white"
                  bg="dark"
                  {...register('description', {
                    maxLength: {
                      value: 420,
                      message: 'Maximum length is 420 characters.',
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.description?.message}
                </FormErrorMessage>
              </FormControl>
            </GridItem>
            <GridItem flex={1} alignItems="center">
              <FormControl isInvalid={errors.name}>
                <Tooltip label="Arbitrary letters, spaces, & punctuation. Max 150 characters.">
                  <Label htmlFor="name" userSelect="none">
                    Display Name
                    <InfoIcon ml={2} />
                  </Label>
                </Tooltip>
                <Input
                  placeholder="Imma User"
                  {...register('name', {
                    maxLength: {
                      value: 150,
                      message: 'Maximum length is 150 characters.',
                    },
                  })}
                />
                <Box minH="3em">
                  <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
                </Box>
              </FormControl>
            </GridItem>
            <GridItem flex={1} alignItems="center">
              <FormControl isInvalid={errors.username}>
                <Tooltip label="Lowercase alpha, digits, dashes, & underscores only.">
                  <Label htmlFor="username" userSelect="none">
                    Name
                    <InfoIcon ml={2} />
                  </Label>
                </Tooltip>
                <Input
                  placeholder="i-am-a-user"
                  {...register('username', {
                    validate: async (value) => {
                      if (/0x[0-9a-z]{40}/i.test(value)) {
                        return `Name "${value}" has the same format as an Ethereum address.`;
                      }
                      if (value !== username && (await getPlayer(value))) {
                        return `Name "${value}" is already in use.`;
                      }
                      return true;
                    },
                    pattern: {
                      value: /^[a-z0-9-_]+$/,
                      message:
                        'Only lowercase letters, digits, dashes, & underscores allowed.',
                    },
                    minLength: {
                      value: 3,
                      message: 'Must have at least three characters.',
                    },
                    maxLength: {
                      value: 150,
                      message: 'Maximum length is 150 characters.',
                    },
                  })}
                />
                <Box minH="3em">
                  <FormErrorMessage>
                    {errors.username?.message}
                  </FormErrorMessage>
                </Box>
              </FormControl>
            </GridItem>
            <GridItem flex={1} alignItems="center">
              <FormControl isInvalid={errors.timeZone}>
                <Label htmlFor="name">Time Zone</Label>
                <Controller
                  {...{ control }}
                  name="timeZone"
                  defaultValue={
                    Intl.DateTimeFormat().resolvedOptions().timeZone
                  }
                  render={({ field: { onChange, ref, ...props } }) => (
                    <SelectTimeZone
                      labelStyle="abbrev"
                      onChange={(tz) => {
                        onChange(tz.value);
                      }}
                      {...props}
                    />
                  )}
                />
                <Box minH="3em">
                  <FormErrorMessage>
                    {errors.timeZone?.message}
                  </FormErrorMessage>
                </Box>
              </FormControl>
            </GridItem>
            <GridItem flex={1} alignItems="center">
              <FormControl isInvalid={errors.availableHours}>
                <Label htmlFor="availableHours">Availability</Label>
                <InputGroup borderColor="white">
                  <InputLeftElement>
                    <Text as="span" role="img" aria-label="clock">
                      🕛
                    </Text>
                  </InputLeftElement>
                  <Input
                    type="number"
                    placeholder="23"
                    pl={9}
                    minW={20}
                    maxW={22}
                    borderTopEndRadius={0}
                    borderBottomEndRadius={0}
                    borderRight={0}
                    {...register('availableHours', {
                      valueAsNumber: true,
                      min: {
                        value: 0,
                        message:
                          'It’s not possible to be available for negative time.',
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
                  <FormErrorMessage>
                    {errors.availableHours?.message}
                  </FormErrorMessage>
                </Box>
              </FormControl>
            </GridItem>
            <GridItem flex={1} alignItems="center">
              <FormControl isInvalid={errors.pronouns}>
                <Label htmlFor="pronouns">Pronouns</Label>
                <Input
                  id="pronouns"
                  placeholder="He, she, it, they, them, etc."
                  {...register('pronouns', {
                    maxLength: {
                      value: 150,
                      message: 'Maximum length is 150 characters.',
                    },
                  })}
                />
                <Box minH="3em">
                  <FormErrorMessage>
                    {errors.pronouns?.message}
                  </FormErrorMessage>
                </Box>
              </FormControl>
            </GridItem>
            {/*
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          <GridItem  colSpan={HALF}>
            <CountrySelectDropdown country={COUNTRIES_OPTIONS[0]} />
          </GridItem>
        */}
            <GridItem flex={1} alignItems="center">
              <FormControl isInvalid={errors.website}>
                <Label htmlFor="name">Website</Label>
                <Input
                  id="website"
                  placeholder="https://github.com/jane-user"
                  {...register('website', {
                    pattern: {
                      value: /^(ipfs|https?):(\/\/)?.+$/i,
                      message: 'URL must be IPFS, HTTP or HTTPS.',
                    },
                    maxLength: {
                      value: 240,
                      message: 'Maximum length is 240 characters.',
                    },
                  })}
                />
                <Box minH="3em">
                  <FormErrorMessage>{errors.website?.message}</FormErrorMessage>
                </Box>
              </FormControl>
            </GridItem>
            <GridItem flex={1} alignItems="center">
              <FormControl isInvalid={errors.location}>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="Laniakea Supercluster"
                  {...register('location', {
                    maxLength: {
                      value: 140,
                      message: 'Maximum length is 140 characters.',
                    },
                  })}
                />
                <Box minH="3em">
                  <FormErrorMessage>
                    {errors.location?.message}
                  </FormErrorMessage>
                </Box>
              </FormControl>
            </GridItem>
            <GridItem flex={1} alignItems="center">
              <FormControl isInvalid={errors.emoji}>
                <Label htmlFor="emoji">Spirit Emoji</Label>
                <Input
                  id="emoji"
                  placeholder="🗽"
                  minW="inherit"
                  maxW="4em"
                  {...register('emoji', {
                    maxLength: {
                      value: 2,
                      message: 'Maximum length is 2 characters.',
                    },
                  })}
                />
                <Box minH="3em">
                  <FormErrorMessage>{errors.emoji?.message}</FormErrorMessage>
                </Box>
              </FormControl>
            </GridItem>
            <GridItem gridColumn={'1/-1'} alignItems="center">
              <FormControl>
                <Label>Meeting calendar</Label>
                <MeetWithWalletProfileEdition
                  setValue={setValue}
                  player={player!}
                />
              </FormControl>
            </GridItem>
          </Grid>
        </ModalBody>
        {/*
        <ProfileField title="working hours" placeholder="9am - 10pm" />
        */}
        <ModalFooter mt={6} flex={1} justifyContent="center">
          <Wrap justify="center" align="center" flex={1}>
            <WrapItem>
              <StatusedSubmitButton label="Save Changes" {...{ status }} />
            </WrapItem>
            <WrapItem>
              <Button
                variant="ghost"
                onClick={onClose}
                color="white"
                _hover={{ bg: '#FFFFFF11' }}
                _active={{ bg: '#FF000011' }}
                disabled={!!status}
              >
                Close
              </Button>
            </WrapItem>
          </Wrap>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
