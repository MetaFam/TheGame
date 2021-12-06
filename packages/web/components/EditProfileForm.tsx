import {
  BasicProfile,
  model as basicProfileModel,
} from '@datamodels/identity-profile-basic';
import { ModelManager } from '@glazed/devtools';
import { DIDDataStore } from '@glazed/did-datastore';
import { TileLoader } from '@glazed/tile-loader';
import {
  Box,
  Button,
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
import { CONFIG } from 'config';
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
        minW="7em"
        _autofill={{
          '&, &:hover, &:focus, &:active': {
            WebkitBoxShadow: '0 0 0 2em #000000EE inset !important',
            WebkitTextFillColor: 'white !important',
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
      country
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

export type TimezoneSelectDropdownProps = {
  timezone: SelectOption | undefined;
  onChange: (timezone: SelectOption | null) => void;
};

export const TIMEZONES_LIST: { [key: string]: string } = {
  '-800': 'GMT-800',
  '-700': 'GMT-700',
  '-600': 'GMT-600',
};
export const TIMEZONES_OPTIONS = Object.entries(TIMEZONES_LIST).map(
  ([offset, gmt]) => ({ value: offset, label: gmt } as SelectOption),
);

export interface BasicProfileProps {
  description?: Maybe<string>;
  emoji?: Maybe<string>;
  backgroundImageURL?: Maybe<string>;
  imageURL?: Maybe<string>;
  location?: Maybe<string>;
  name?: Maybe<string>;
  countryCode?: Maybe<string>;
}
export enum CacheImages {
  imageURL = 'image',
  backgroundImageURL = 'background',
}
export enum CacheFields {
  name = 'name',
  description = 'description',
  emoji = 'emoji',
  location = 'location',
  countryCode = 'residenceCountry',
}
export enum CacheSkips {
  id = Profile_Cache_Select_Column.Id,
  gender = Profile_Cache_Select_Column.Gender,
  playerId = Profile_Cache_Select_Column.PlayerId,
  lastCheckedAt = Profile_Cache_Select_Column.LastCheckedAt,
}
export type ImageRefs = {
  -readonly [key in keyof typeof CacheImages]?: MutableRefObject<HTMLImageElement>;
};
export interface InputtedFields {
  timeZone?: Maybe<string>;
  availableHours?: Maybe<number>;
  username: Maybe<string>;
  pronouns: Maybe<string>;
}

export const EditProfileForm: React.FC<ProfileEditorProps> = ({
  user,
  onClose,
}) => {
  const [status, setStatus] = useState<Maybe<ReactElement | string>>(null);
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    control,
  } = useForm();
  const { ceramic } = useWeb3();
  const toast = useToast();
  const { player } = user ?? {};

  console.info({ errors });

  const refs: ImageRefs = Object.fromEntries(
    Object.values(CacheImages).map((type) =>
      // eslint-disable-next-line react-hooks/rules-of-hooks
      [type, useRef<HTMLImageElement>(null)],
    ),
  );
  const endpoints = Object.fromEntries(
    Object.entries(CacheImages).map(([id, type]) => {
      const key = id as keyof typeof CacheImages;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [url, set] = useState<Maybe<string>>(
        player?.profile_cache?.[key] ?? null,
      );
      return [type, { url, set }];
    }),
  );

  useEffect(() => {
    Object.keys(CacheFields).forEach((attr) => {
      const key = attr as keyof typeof CacheFields;
      setValue(key, player?.profile_cache?.[key] ?? null);
    });
  }, [player, setValue]);

  const onFileChange = useCallback(
    ({ target: input }: { target: HTMLInputElement }) => {
      const file = input.files?.[0];
      if (!file) return;
      const key = input.name as keyof typeof refs;
      console.info({ e: 'EVT', key, input });
      const ref = refs[key] as MutableRefObject<HTMLImageElement>;
      const elem = ref.current as HTMLImageElement | null;
      if (!elem) return;
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        elem.src = reader.result as string;
      });
      reader.readAsDataURL(file);
    },
    [refs],
  );

  const onSubmit = async (inputs: BasicProfileProps) => {
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
    const images: Record<string, object> = {};
    const files: Record<string, File> = {};
    Object.keys(refs).forEach((name) => {
      const key = name as keyof BasicProfileProps;
      if ((inputs[key] ?? []).length > 0) {
        [files[key]] = (inputs[key] ?? []) as File[];
      }
      delete inputs[key]; // eslint-disable-line no-param-reassign
    });
    const values = { ...inputs };
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
        console.log({ response }); // eslint-disable-line no-console
        Object.keys(files).forEach((type: string) => {
          if (!response[type]) {
            // eslint-disable-next-line no-console
            console.warn(`Uploaded "${type}" & didn't get a response back.`);
          } else {
            // const key = type as keyof typeof refs;
            const key = type as 'image' | 'background';
            const ref = refs[key] as MutableRefObject<HTMLImageElement>;
            const elem = ref.current as HTMLImageElement | null;
            const { width, height } = elem ?? {};
            values[type] = {
              original: {
                src: `ipfs://${response[type]}`,
                mimeType: 'image/*',
                width,
                height,
              },
            };
            console.info({ values });
          }
        });
      }
    }

    // empty string fails validation
    ['countryCode', 'birthDate'].forEach((prop) => {
      const key = prop as keyof BasicProfileProps;
      if (values[key] === '') {
        delete values[key];
      }
    });

    const { countryCode: code }: { countryCode?: Maybe<string> } = values;
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

    if (ceramic) {
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
      store.merge('basicProfile', values);
    }
  };

  return (
    <Stack as="form" onSubmit={handleSubmit(onSubmit)}>
      <Wrap>
        <WrapItem flex={1}>
          <FormControl isInvalid={errors.image} align="center">
            <Tooltip label="An image generally cropped to a circle for display. 1MiB maximum size.">
              <Label htmlFor="image">Profile Image&nbsp;🛈</Label>
            </Tooltip>
            <Box position="relative">
              <Image
                ref={
                  (refs as { image: MutableRefObject<HTMLImageElement> }).image
                }
                src={httpLink(endpoints.image.url)}
                h="10em"
                maxW="10em"
              />
              <Controller
                control={control}
                name="image"
                defaultValue={null}
                render={({ name, value, ref, onChange, onBlur }) => (
                  <Input
                    id="image"
                    type="file"
                    {...{ name, value, ref, onBlur }}
                    onChange={async (evt) => {
                      onFileChange(evt);
                      onChange(evt);
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
        <WrapItem flex={1}>
          <FormControl isInvalid={errors.background} align="center">
            <Tooltip label="An image with an ~3:1 aspect ratio to be displayed as a page or profile banner. 1MiB maximum size.">
              <Label htmlFor="background">Background Banner&nbsp;🛈</Label>
            </Tooltip>
            <Box position="relative">
              <Image
                ref={
                  (refs as { background: MutableRefObject<HTMLImageElement> })
                    .background
                }
                src={httpLink(endpoints.background.url)}
                maxW="12em"
                h="10em"
              />
              <Controller
                control={control}
                name="background"
                defaultValue={null}
                render={({ name, value, ref, onChange, onBlur }) => (
                  <Input
                    id="background"
                    type="file"
                    {...{ name, value, ref, onBlur }}
                    onChange={async (evt) => {
                      onFileChange(evt);
                      onChange(evt);
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
        <WrapItem flex={1}>
          <FormControl isInvalid={errors.description}>
            <Tooltip label="420 characters max.">
              <Label htmlFor="description">Description&nbsp;🛈</Label>
            </Tooltip>
            <Textarea
              id="description"
              placeholder="Describe yourself."
              minW="12em"
              h="10em"
              color="white"
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
        <WrapItem flex={1} alignItems="center">
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
            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
          </FormControl>
        </WrapItem>
        <WrapItem flex={1} alignItems="center">
          <FormControl isInvalid={errors.username}>
            <Tooltip label="Lowercase alpha, digits, dashes, & underscores only.">
              <Label htmlFor="username">Username&nbsp;🛈</Label>
            </Tooltip>
            <ChakraInput
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
            <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
          </FormControl>
        </WrapItem>
        <WrapItem flex={1} alignItems="center">
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
            <FormErrorMessage>{errors.pronouns?.message}</FormErrorMessage>
          </FormControl>
        </WrapItem>
        {/*
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          <GridItem colSpan={HALF}>
            <CountrySelectDropdown country={COUNTRIES_OPTIONS[0]} />
          </GridItem>
        */}
        <WrapItem flex={1} alignItems="center">
          <FormControl isInvalid={errors.availability}>
            <Label htmlFor="availability">Availability</Label>
            <InputGroup borderColor="transparent">
              <InputLeftElement>
                <Text as="span" role="img" aria-label="clock">
                  🕛
                </Text>
              </InputLeftElement>
              <Input
                id="availability"
                type="number"
                placeholder="23"
                pl={8}
                maxW="5em"
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
            <FormErrorMessage>{errors.availability?.message}</FormErrorMessage>
          </FormControl>
        </WrapItem>
        <WrapItem flex={1} alignItems="center">
          <FormControl isInvalid={errors.timeZone}>
            <Label htmlFor="name">Time Zone</Label>
            <SelectTimeZone
              labelStyle="abbrev"
              id="timeZone"
              placeholder="EST"
              style={{
                minWidth: '15em',
              }}
              {...register('timeZone', {
                maxLength: {
                  value: 150,
                  message: 'Maximum length is 150 characters.',
                },
              })}
            />
            <FormErrorMessage>{errors.timeZone?.message}</FormErrorMessage>
          </FormControl>
        </WrapItem>
      </Wrap>
      {/*
      <ProfileField
        title="description"
        placeholder="Replace with Markdown Editor(?)"
      />
      <ProfileField title="website" placeholder="https://your.portfolio.here" />
      <ProfileField title="working hours" placeholder="9am - 10pm" />
      */}
      {onClose && (
        <ModalFooter mt={6} flex={1}>
          <Wrap justify="center" flex={1}>
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
                _hover={{ bg: 'none' }}
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
