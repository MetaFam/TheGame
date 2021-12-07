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
  DropdownStyles,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  FormLabelProps,
  Image,
  Input as ChakraInput,
  InputGroup,
  InputLeftElement,
  InputProps,
  InputRightAddon,
  Link,
  MetaButton,
  MetaFilterSelectSearch,
  metaFilterSelectStyles,
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
import { PlayerAvatar } from 'components/Player/PlayerAvatar';
import {
  Maybe,
  Profile_Cache_Select_Column,
  // Player_Select_Column,
} from 'graphql/autogen/types';
import { MeType } from 'graphql/types';
import { useWeb3 } from 'lib/hooks';
import React, {
  ChangeEvent,
  FC,
  MutableRefObject,
  ReactElement,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Controller, useForm } from 'react-hook-form';
import { httpLink } from 'utils/linkHelpers';

export type ProfileEditorProps = {
  user: MeType;
  onClose: () => void;
};

export type ProfileSectionFormProps = {
  title: string;
};

export type ProfileFieldProps = {
  title: string;
  placeholder?: string;
  value?: string;
  onChange?: (evt: ChangeEvent<HTMLInputElement>) => void;
};

export type SelectOption = {
  label: string;
  value: string;
};

export type CountrySelectDropdownProps = {
  country: SelectOption;
  onChange: (country: Maybe<SelectOption>) => void;
};

export const COUNTRIES_LIST: { [key: string]: string } = {
  UK: 'United Kingdom',
  US: 'USA',
  MX: 'Mexico',
};
export const COUNTRIES_OPTIONS = Object.entries(COUNTRIES_LIST).map(
  ([abbr, name]) => ({ value: abbr, label: name } as SelectOption),
);
export const CountrySelectDropdown: FC<CountrySelectDropdownProps> = ({
  country,
  onChange,
}) => (
  <Box>
    <Text fontSize="md" color="cyan" mb={1}>
      Country
    </Text>
    <Box my={6}>
      <MetaFilterSelectSearch
        title={country.label}
        tagLabel=""
        hasValue={Boolean(country)}
        styles={metaFilterSelectStyles}
        value={[country]}
        options={COUNTRIES_OPTIONS}
        onChange={(value) => {
          if (value) onChange(value as SelectOption);
        }}
      />
    </Box>
  </Box>
);

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
    const ref = reference as RefObject<HTMLInputElement>;
    return (
      <ChakraInput
        color="white"
        bg="dark"
        w="100%"
        minW="9em"
        _autofill={{
          '&, &:hover, &:focus, &:active': {
            WebkitBoxShadow:
              '0 0 0 2em var(--chakra-colors-dark) inset !important',
            WebkitTextFillColor: 'white !important',
            caretColor: 'white',
          },
        }}
        {...{ ref }}
        {...props}
      >
        {children}
      </ChakraInput>
    );
  },
);

export type Values<T> = T[keyof T];

export const BasicProfileImages = {
  imageURL: 'image',
  backgroundImageURL: 'background',
} as const;
export const BasicProfileStrings = {
  name: 'name',
  description: 'description',
  emoji: 'emoji',
  location: 'homeLocation',
  countryCode: 'residenceCountry',
  birthDate: 'birthDate',
  website: 'url',
} as const;
export const BasicProfileFields = {
  ...BasicProfileImages,
  ...BasicProfileStrings,
} as const;

export type BPImages = {
  -readonly [key in keyof typeof BasicProfileImages as string]?: ImageSources;
};
export type BPStrings = {
  -readonly [key in keyof typeof BasicProfileStrings as string]?: string;
};
export type ProfileProps = BPStrings | BPImages;

export enum CacheSkips {
  id = Profile_Cache_Select_Column.Id,
  gender = Profile_Cache_Select_Column.Gender,
  playerId = Profile_Cache_Select_Column.PlayerId,
  lastCheckedAt = Profile_Cache_Select_Column.LastCheckedAt,
}
export type Endpoints = {
  -readonly [key in keyof typeof BasicProfileImages]?: {
    url: string;
    set: () => void;
    ref: MutableRefObject<HTMLImageElement>;
  };
};
export interface TimeZone {
  name?: string;
  abbreviation: string;
  city?: string;
  country?: string;
  offset: number;
}
export interface ExtendedProfileFields {
  timeZone?: TimeZone;
  availableHours?: number;
  username?: string;
  pronouns?: string;
}

export const EditProfileForm: React.FC<ProfileEditorProps> = ({
  user,
  onClose,
}) => {
  const [status, setStatus] = useState<Maybe<ReactElement | string>>(null);
  const {
    handleSubmit,
    register,
    setValue,
    control,
    formState: { errors },
  } = useForm();
  const { ceramic } = useWeb3();
  const toast = useToast();
  const { player } = user ?? {};

  const endpoints = Object.fromEntries(
    Object.entries(BasicProfileImages).map(([hasuraId, ceramicId]) => {
      // eslint-disable-next-line no-param-reassign
      hasuraId = hasuraId as keyof typeof BasicProfileImages;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [url, set] = useState<Maybe<string>>(
        player?.profile_cache?.[hasuraId] ?? null,
      );
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const ref = useRef<HTMLImageElement>(null);
      return [ceramicId, { url, set, ref }];
    }),
  );

  useEffect(() => {
    Object.entries(player?.profile_cache ?? {}).forEach(([key, value]) => {
      if (!key.startsWith('_')) {
        setValue(key, value ?? null);
      }
    });
  }, [player, setValue]);

  const onFileChange = useCallback(
    ({ target: input }: { target: HTMLInputElement }) => {
      const file = input.files?.[0];
      if (!file) return;
      const key = input.name as keyof typeof endpoints;
      const ref = endpoints[key].ref as MutableRefObject<HTMLImageElement>;
      const elem = ref.current as HTMLImageElement | null;
      if (!elem) return;
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        elem.src = reader.result as string;
      });
      reader.readAsDataURL(file);
    },
    [endpoints],
  );

  const onSubmit = async (inputs: ProfileProps) => {
    setStatus(
      <Text>
        Uploading images to
        <Link href="//web3.storage" ml={1}>
          web3.storage
        </Link>
        …
      </Text>,
    );

    console.log({ inputs });

    const formData = new FormData();
    const files: Record<string, File> = {};
    Object.keys(endpoints).forEach((name) => {
      const key = name as keyof typeof BasicProfileImages;
      const fileList = (inputs[key] ?? []) as File[];
      if (fileList.length > 0) {
        [files[key]] = fileList;
      }
      delete inputs[key]; // eslint-disable-line no-param-reassign
    });
    const values: ProfileProps = { ...inputs };
    console.log({ values, files }); // eslint-disable-line no-console

    if (Object.values(files).reduce((acc, val) => acc || !!val, false)) {
      Object.entries(files).forEach(([name, file]) => {
        formData.append(name, file);
      });
      const result = await fetch(`/api/storage`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });
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
        Object.keys(files).forEach((type: string) => {
          if (!response[type]) {
            toast({
              title: 'Error Saving Image',
              description: `Uploaded "${type}" & didn't get a response back.`,
              status: 'warning',
              isClosable: true,
              duration: 8000,
            });
          } else {
            const key = type as Values<BasicProfileImages>;
            const ref = endpoints[key]
              .ref as MutableRefObject<HTMLImageElement>;
            const elem = ref.current as HTMLImageElement | null;
            const { width = 0, height = 0 } = elem ?? {};
            values[key] = {
              original: {
                src: `ipfs://${response[type]}`,
                mimeType: 'image/*',
                width,
                height,
              },
            } as ImageSources;
          }
        });
      }
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

    if (!ceramic) {
      toast({
        title: 'Ceramic Connection Error',
        description: 'Unable to connect to the Ceramic API to save changes.',
        status: 'error',
        isClosable: true,
        duration: 8000,
      });
    } else {
      try {
        setStatus(<Text>Authenticating DID…</Text>);
        await ceramic.did?.authenticate();

        const cache = new Map();
        const loader = new TileLoader({ ceramic, cache });
        const manager = new ModelManager(ceramic);
        manager.addJSONModel(basicProfileModel);
        const store = new DIDDataStore({
          ceramic,
          loader,
          model: await manager.toPublished(),
        });
        console.info({ values });

        const basic: BasicProfile = {};
        Object.entries(BasicProfileStrings).forEach(([hasuraId, ceramicId]) => {
          if (values[hasuraId] !== undefined) {
            // set a value to null to remove it from the profile
            basic[ceramicId] = (values[hasuraId] as string) ?? undefined;
          }
        });
        Object.values(BasicProfileImages).forEach((ceramicId) => {
          if (values[ceramicId] !== undefined) {
            basic[ceramicId] = (values[ceramicId] as ImageSources) ?? undefined;
          }
        });

        console.info({ basic });

        setStatus(<Text>Updating Basic Profile…</Text>);
        await store.merge('basicProfile', basic);
      } catch (err) {
        toast({
          title: 'Ceramic Error',
          description: `Error saving profile: ${(err as Error).message}`,
          status: 'error',
          isClosable: true,
          duration: 8000,
        });
      }
    }
    setStatus(null);
  };

  return (
    <Stack as="form" onSubmit={handleSubmit(onSubmit)}>
      <Wrap>
        <WrapItem flex={1} px={5}>
          <FormControl isInvalid={errors.image} align="center">
            <Tooltip label="An image generally cropped to a circle for display. 1MiB maximum size.">
              <Label htmlFor="image">Profile Image&nbsp;🛈</Label>
            </Tooltip>
            <Box position="relative">
              <PlayerAvatar
                // ref={endpoints.image.ref}
                {...{ player }}
                src={httpLink(endpoints.image.url)}
                h="10em"
                w="10em"
                omitBackground={false}
              />
              <Controller
                control={control}
                name="image"
                defaultValue={[]}
                render={({ field: { onChange, value, ...props } }) => (
                  <Input
                    id="image"
                    type="file"
                    {...props}
                    value={value.filename}
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
                  />
                )}
              />
            </Box>
            <FormErrorMessage>{errors.image?.message}</FormErrorMessage>
          </FormControl>
        </WrapItem>
        <WrapItem flex={1} px={5}>
          <FormControl isInvalid={errors.background} align="center">
            <Tooltip label="An image with an ~3:1 aspect ratio to be displayed as a page or profile banner. 1MiB maximum size.">
              <Label htmlFor="background">Background Banner&nbsp;🛈</Label>
            </Tooltip>
            <Box position="relative">
              <Image
                ref={endpoints.background.ref}
                src={httpLink(endpoints.background.url)}
                maxW="12em"
                h="10em"
              />
              <Controller
                control={control}
                name="background"
                defaultValue={[]}
                render={({ field: { onChange, value, ...props } }) => (
                  <Input
                    id="background"
                    type="file"
                    {...props}
                    value={value.filename}
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
                  />
                )}
              />
            </Box>
            <FormErrorMessage>{errors.background?.message}</FormErrorMessage>
          </FormControl>
        </WrapItem>
        <WrapItem flex={1} px={5}>
          <FormControl isInvalid={errors.description}>
            <Tooltip label="420 characters max.">
              <Label htmlFor="description">Description&nbsp;🛈</Label>
            </Tooltip>
            <Textarea
              id="description"
              placeholder="Describe yourself."
              minW="15em"
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
              <Label htmlFor="name">Display Name&nbsp;🛈</Label>
            </Tooltip>
            <Input
              id="name"
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
              <Label htmlFor="username">Username&nbsp;🛈</Label>
            </Tooltip>
            <Input
              id="username"
              placeholder="i-am-a-user"
              {...register('username', {
                required: {
                  value: true,
                  message: 'You must specify a username.',
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
          <FormControl isInvalid={errors.availability}>
            <Label htmlFor="availability">Availability</Label>
            <InputGroup borderColor="white">
              <InputLeftElement>
                <Text as="span" role="img" aria-label="clock">
                  🕛
                </Text>
              </InputLeftElement>
              <Input
                id="availability"
                type="number"
                placeholder="23"
                pl={9}
                minW="5em"
                maxW="7em"
                borderTopEndRadius={0}
                borderBottomEndRadius={0}
                borderRight={0}
                {...register('availability', {
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
                {errors.availability?.message}
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
              render={({ field: { ref, ...props } }) => (
                <SelectTimeZone
                  labelStyle="abbrev"
                  id="timeZone"
                  style={{
                    minWidth: '17em',
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
        <ModalFooter mt={6} flex={1}>
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
