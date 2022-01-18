import { Caip10Link } from '@ceramicnetwork/stream-caip10-link';
import {
  BasicProfile,
  ImageSources,
  model as basicProfileModel,
} from '@datamodels/identity-profile-basic';
import { ModelManager } from '@glazed/devtools';
import { DIDDataStore } from '@glazed/did-datastore';
import { TileLoader } from '@glazed/tile-loader';
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  FormLabelProps,
  Image,
  InfoIcon,
  Input as ChakraInput,
  InputGroup,
  InputLeftElement,
  InputProps,
  InputRightAddon,
  Link,
  MetaButton,
  ModalFooter,
  SelectTimeZone,
  Spinner,
  Stack,
  Text,
  Textarea,
  Tooltip,
  useToast,
  Wrap,
  WrapItem,
} from '@metafam/ds';
import {
  BasicProfileImages,
  BasicProfileStrings,
  ExtendedProfile,
  ExtendedProfileImages,
  extendedProfileModel,
  ExtendedProfileObjects,
  ExtendedProfileStrings,
  HasuraProfileProps,
  Images,
  ProfileProps,
  Values,
} from '@metafam/utils';
import {
  Maybe,
  useInsertCacheInvalidationMutation,
} from 'graphql/autogen/types';
import { getPlayer } from 'graphql/getPlayer';
import { MeType } from 'graphql/types';
import { useWeb3 } from 'lib/hooks';
import router, { useRouter } from 'next/router';
import React, {
  ReactElement,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Controller, useForm } from 'react-hook-form';
import { optimizedImage } from 'utils/imageHelpers';
import { dispositionFor } from 'utils/playerHelpers';

const MAX_DESC_LEN = 420; // characters

export type ProfileEditorProps = {
  user: MeType;
  onClose: () => void;
};

const Label: React.FC<FormLabelProps> = React.forwardRef(
  ({ children, ...props }, container) => {
    const ref = container as RefObject<HTMLLabelElement>;
    return (
      <FormLabel color="cyan" {...{ ref }} {...props}>
        {children}
      </FormLabel>
    );
  },
);

const Input: React.FC<InputProps> = React.forwardRef(
  ({ children, ...props }, reference) => {
    const [width, setWidth] = useState('9em');
    const ref = reference as RefObject<HTMLInputElement>;
    const textRef = useRef<HTMLInputElement>(null);
    const isText = !props.type || props.type === 'text';
    const calcWidth = (text: string) => {
      const input = textRef.current;
      if (text && input) {
        input.textContent = text;
        setWidth(`calc(${input.scrollWidth}px + 2.25em)`);
      }
    };

    return (
      <Box>
        <Text position="absolute" whiteSpace="pre" ref={textRef}></Text>
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
          // event is supposed to have a type definition in
          // @types/react if the DOM library is included,
          // but VS doesn't think it does.
          onInput={(event /* { target: { value } } */) => {
            const {
              target: { value },
            } = (event as unknown) as { target: { value: string } };
            if (isText) calcWidth(value);
          }}
          onFocus={(evt) => {
            if (isText) calcWidth(evt.target.value);
          }}
          {...props}
          {...{ ref, width }}
        >
          {children}
        </ChakraInput>
      </Box>
    );
  },
);

export const EditProfileForm: React.FC<ProfileEditorProps> = ({
  user,
  onClose,
}) => {
  const { player } = user ?? {};
  const [status, setStatus] = useState<Maybe<ReactElement | string>>(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const username = useMemo(() => player?.profile?.username, []);
  const [, invalidateCache] = useInsertCacheInvalidationMutation();
  const params = useRouter();
  const {
    handleSubmit,
    register,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useForm();
  const { ceramic, address } = useWeb3();
  const toast = useToast();
  const description = watch('description');
  const remaining = useMemo(() => MAX_DESC_LEN - (description?.length ?? 0), [
    description,
  ]);

  const endpoints = Object.fromEntries(
    Object.keys(Images).map((hasuraId) => {
      const key = hasuraId as keyof typeof Images;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [active, setActive] = useState(false);
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [loading, setLoading] = useState(true);
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [url, setURL] = useState<string | undefined>(
        optimizedImage(key, player?.profile?.[key]),
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

  useEffect(() => {
    if (!endpoints.profileImageURL.ref.current) {
      // eslint-disable-next-line no-console
      console.warn('Unable to initially focus the profile image.');
    } else {
      endpoints.profileImageURL.ref.current.focus();
      endpoints.profileImageURL.setActive(true);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    Object.entries(player?.profile ?? {}).forEach(([key, value]) => {
      if (!key.startsWith('_')) {
        setValue(key, value ?? undefined);
      }
    });
  }, [player, setValue]);

  const onFileChange = useCallback(
    ({ target: input }: { target: HTMLInputElement }) => {
      const file = input.files?.[0];
      if (!file) return;
      const key = input.name as keyof typeof endpoints;
      endpoints[key].setFile(file);
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        endpoints[key].setURL(reader.result as string);
      });
      reader.readAsDataURL(file);
    },
    [endpoints],
  );

  if (!ceramic) {
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
      if (!ceramic.did?.authenticated) {
        setStatus(<Text>Authenticating DID…</Text>);
        await ceramic.did?.authenticate();
      }

      if (params.query.debug) {
        // eslint-disable-next-line no-console
        console.debug(`For ETH Address: ${address}`);
        // eslint-disable-next-line no-console
        console.debug(`Connected DID: ${ceramic.did?.id}`);

        const caip10 = await Caip10Link.fromAccount(
          ceramic,
          `${address}@eip155:1`,
        );
        // eslint-disable-next-line no-console
        console.debug(`CAIP-10 DID: ${caip10.did}`);
      }

      const cache = new Map();
      const loader = new TileLoader({ ceramic, cache });
      const manager = new ModelManager(ceramic);
      manager.addJSONModel(basicProfileModel);
      manager.addJSONModel(extendedProfileModel);

      const store = new DIDDataStore({
        ceramic,
        loader,
        model: await manager.toPublished(),
      });

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
      const sources: Record<string, ImageSources> = {};
      const values: ProfileProps = { ...inputs };
      Object.keys(Images).forEach((hasuraId) => {
        const key = hasuraId as keyof typeof Images;
        if (endpoints[key].file) {
          files[key] = endpoints[key].file as File;
        }
        delete values[key];
      });

      if (params.query.debug) {
        // eslint-disable-next-line no-console
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
        if (result.status >= 300) {
          throw new Error(
            `web3.storage ${result.status} response: "${result.statusText}"`,
          );
        }
        const response = await result.json();
        const { error } = response;
        if (error) {
          toast({
            title: 'Error Saving Images',
            description: `web3.storage reported the following error: "${error}"`,
            status: 'error',
            isClosable: true,
            duration: 8000,
          });
        } else {
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
              sources[key as keyof typeof Images] = {
                original: {
                  src: `ipfs://${response[tKey]}`,
                  mimeType: mime,
                  ...props,
                },
              } as ImageSources;
            }
          });
        }
      }

      if (params.query.debug) {
        // eslint-disable-next-line no-console
        console.debug({ files, values, inputs });
      }

      // empty string fails validation
      ['residenceCountry', 'birthDate'].forEach((prop) => {
        const key = prop as keyof typeof BasicProfileStrings;
        if (values[key] === '') {
          delete values[key];
        }
      });

      const { countryCode: code }: { countryCode?: string } = values;
      if (code?.length === 2) {
        values.countryCode = code.toUpperCase();
      } else {
        if ((code ?? '').length > 0) {
          toast({
            title: 'Country Code Error',
            description: `Country Code "${code}" is not the required two letters.`,
            status: 'error',
            isClosable: true,
            duration: 8000,
          });
        }
        delete values.countryCode;
      }

      const basic: BasicProfile = {};
      const extended: ExtendedProfile = {};

      // [
      //   { map: BasicProfileStrings, obj: basic },
      //   { map: BasicProfileImages, obj: basic },
      //   { map: ExtendedProfileStrings, obj: extended },
      //   { map: ExtendedProfileImages, obj: extended },
      // ].forEach(({ map, obj }) => {
      //   Object.entries(map).forEach(([hasuraId, ceramicId]) => {
      //     const fromKey = ceramicId as Values<typeof map>;
      //     const toKey = hasuraId as keyof typeof map;
      //     if (values[toKey] !== undefined) {
      //       // eslint-disable-next-line no-param-reassign
      //       obj[fromKey] = values[fromKey] as any ?? undefined;
      //     }
      //   });
      // });

      Object.entries(BasicProfileStrings).forEach(([hasuraId, ceramicId]) => {
        const fromKey = ceramicId as Values<typeof BasicProfileStrings>;
        const toKey = hasuraId as keyof typeof BasicProfileStrings;
        if (values[toKey] !== undefined) {
          basic[fromKey] = (values[toKey] as string) ?? null;
        }
      });

      Object.entries(BasicProfileImages).forEach(([hasuraId, ceramicId]) => {
        const fromKey = ceramicId as Values<typeof BasicProfileImages>;
        const toKey = hasuraId as keyof typeof BasicProfileImages;
        if (sources[toKey] !== undefined) {
          basic[fromKey] = sources[toKey] ?? null;
        }
      });

      setStatus(<Text>Updating Basic Profile…</Text>);
      const basRes = await store.merge('basicProfile', basic);
      if (params.query.debug) {
        // eslint-disable-next-line no-console
        console.info('Basic Profile:', basRes.toUrl());
      }

      Object.entries(ExtendedProfileStrings).forEach(
        ([hasuraId, ceramicId]) => {
          const fromKey = ceramicId as Values<typeof ExtendedProfileStrings>;
          const toKey = hasuraId as keyof typeof ExtendedProfileStrings;
          if (values[toKey] !== undefined) {
            extended[fromKey] = values[toKey];
          }
        },
      );

      Object.entries(ExtendedProfileImages).forEach(([hasuraId, ceramicId]) => {
        const fromKey = ceramicId as Values<typeof ExtendedProfileImages>;
        const toKey = hasuraId as keyof typeof ExtendedProfileImages;
        if (sources[toKey] !== undefined) {
          extended[fromKey] = sources[toKey];
        }
      });

      Object.entries(ExtendedProfileObjects).forEach(
        ([hasuraId, ceramicId]) => {
          const fromKey = ceramicId as Values<typeof ExtendedProfileObjects>;
          const toKey = hasuraId as keyof typeof ExtendedProfileObjects;
          if (values[toKey] !== undefined) {
            switch (fromKey) {
              case 'availableHours': {
                extended[fromKey] = values[toKey] as number;
                break;
              }
              case 'colorDisposition': {
                extended[fromKey] =
                  dispositionFor(values.colorMask) ?? undefined;
                break;
              }
              default: {
                // eslint-disable-next-line no-console
                console.warn(`Unknown Profile Key: "${fromKey}"`);
              }
            }
          }
        },
      );

      if (params.query.debug) {
        // eslint-disable-next-line no-console
        console.debug({ values, basic, extended });
      }

      setStatus(<Text>Updating Extended Profile…</Text>);
      const extRes = await store.merge('extendedProfile', extended);
      if (params.query.debug) {
        // eslint-disable-next-line no-console
        console.info('Extended Profile:', extRes.toUrl());
      }

      if (player) {
        setStatus(<Text>Invalidating Cache…</Text>);
        await invalidateCache({ playerId: player.id });
      }

      // if they changed their username, the page will 404 on reload
      if (player && extended.username !== username) {
        router.push(`/player/${player.ethereumAddress}`);
      }

      onClose();
    } catch (err) {
      toast({
        title: 'Ceramic Error',
        description: `Error saving profile: ${(err as Error).message}`,
        status: 'error',
        isClosable: true,
        duration: 15000,
      });
    } finally {
      setStatus(null);
    }
  };

  return (
    <Stack as="form" onSubmit={handleSubmit(onSubmit)}>
      <Wrap>
        <WrapItem flex={1} px={5}>
          <FormControl isInvalid={errors.profileImageURL} align="center">
            <Tooltip label="An image representing the user generally cropped to a circle for display. 1MiB maximum size.">
              <Label htmlFor="profileImageURL" userSelect="none">
                Profile Image
                <InfoIcon ml={2} />
              </Label>
            </Tooltip>
            <Box position="relative">
              <Box w="10em" h="10em" borderRadius="full" display="inline-flex">
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
              </Box>
              <Controller
                control={control}
                name="profileImageURL"
                defaultValue={[]}
                render={({ field: { onChange, value, ...props } }) => (
                  <Input
                    type="file"
                    {...props}
                    value={value?.filename ?? ''}
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
                    onFocus={() => endpoints.profileImageURL.setActive(true)}
                    onBlur={() => endpoints.profileImageURL.setActive(false)}
                  />
                )}
              />
            </Box>
            <FormErrorMessage>
              {errors.profileImageURL?.message}
            </FormErrorMessage>
          </FormControl>
        </WrapItem>
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
          <WrapItem flex={1} px={5} {...{ key }}>
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
                borderColor={endpoints[key].active ? 'blue.400' : 'transparent'}
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
                {endpoints[key].loading && (
                  <Spinner size="xl" color="purple.500" thickness="4px" />
                )}
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
          </WrapItem>
        ))}
        <WrapItem flex={1} px={5}>
          <FormControl isInvalid={errors.description}>
            <Tooltip label={`${MAX_DESC_LEN} characters max.`}>
              <Label htmlFor="description" userSelect="none">
                Description
                <Text as="sup" ml={2}>
                  {remaining}
                </Text>
                ⁄<Text as="sub">{MAX_DESC_LEN}</Text>
                <InfoIcon ml={2} />
              </Label>
            </Tooltip>
            <Textarea
              placeholder="Describe yourself."
              minW="18em"
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
            <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
          </FormControl>
        </WrapItem>
        <WrapItem flex={1} alignItems="center" px={5}>
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
        </WrapItem>
        <WrapItem flex={1} alignItems="center" px={5}>
          <FormControl isInvalid={errors.username}>
            <Tooltip label="Lowercase alpha, digits, dashes, & underscores only.">
              <Label htmlFor="username" userSelect="none">
                Username
                <InfoIcon ml={2} />
              </Label>
            </Tooltip>
            <Input
              placeholder="i-am-a-user"
              {...register('username', {
                validate: async (value) => {
                  if (value !== username && (await getPlayer(value))) {
                    return `Username "${value}" is already in use.`;
                  }
                  if (/0x[0-9a-z]{40}/i.test(value)) {
                    return `Username "${value}" has the same format as an Ethereum address.`;
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
              <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
            </Box>
          </FormControl>
        </WrapItem>
        <WrapItem flex={1} alignItems="center" px={5}>
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
              <FormErrorMessage>{errors.pronouns?.message}</FormErrorMessage>
            </Box>
          </FormControl>
        </WrapItem>
        {/*
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          <GridItem colSpan={HALF}>
            <CountrySelectDropdown country={COUNTRIES_OPTIONS[0]} />
          </GridItem>
        */}
        <WrapItem flex={1} alignItems="center" px={5}>
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
                minW="5em"
                maxW="7em"
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
        </WrapItem>
        <WrapItem flex={1} alignItems="center" px={5}>
          <FormControl isInvalid={errors.timeZone}>
            <Label htmlFor="name">Time Zone</Label>
            <Controller
              {...{ control }}
              name="timeZone"
              defaultValue={Intl.DateTimeFormat().resolvedOptions().timeZone}
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
              <FormErrorMessage>{errors.timeZone?.message}</FormErrorMessage>
            </Box>
          </FormControl>
        </WrapItem>
        <WrapItem flex={1} alignItems="center" px={5}>
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
        </WrapItem>
        <WrapItem flex={1} alignItems="center" px={5}>
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
              <FormErrorMessage>{errors.location?.message}</FormErrorMessage>
            </Box>
          </FormControl>
        </WrapItem>
        <WrapItem flex={1} alignItems="center" px={5}>
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
        </WrapItem>
      </Wrap>
      {/*
      <ProfileField title="working hours" placeholder="9am - 10pm" />
      */}
      {onClose && (
        <ModalFooter mt={6} flex={1} justifyContent="center">
          <Wrap justify="center" align="center" flex={1}>
            <WrapItem>
              <MetaButton isDisabled={!!status} type="submit">
                {!status ? (
                  'Save Changes'
                ) : (
                  <Flex align="center">
                    <Spinner mr={3} />
                    {typeof status === 'string' ? (
                      <Text>{status}</Text>
                    ) : (
                      status
                    )}
                  </Flex>
                )}
              </MetaButton>
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
      )}
    </Stack>
  );
};
