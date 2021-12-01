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
  Text,
  Textarea,
  Tooltip,
  // useToast,
  Wrap,
  WrapItem,
} from '@metafam/ds';
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
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useForm } from 'react-hook-form';
import { httpLink } from 'utils/linkHelpers';

const Label: React.FC<FormLabelProps> = React.forwardRef(
  ({ children, ...props }, ref) => (
    <FormLabel color="cyan" {...{ ref }} {...props}>
      {children}
    </FormLabel>
  ),
);

const Input: React.FC<InputProps> = ({ children, ...props }) => (
  <ChakraInput color="white" w="fill" bg="dark" {...props}>
    {children}
  </ChakraInput>
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
  } = useForm();
  const { ceramic } = useWeb3();
  // const toast = useToast();
  const { player } = user ?? {};

  const refs: ImageRefs = Object.fromEntries(
    Object.keys(CacheImages).map((type) =>
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
      [files[key]] = (inputs[key] ?? []) as File[];
    });
    console.log({ inputs, files }); // eslint-disable-line no-console

    if (Object.values(files).reduce((acc, val) => acc || !!val, false)) {
      Object.entries(files).forEach(([name, file]) => {
        formData.append(name, file);
      });
      console.log({ formData, files }); // eslint-disable-line no-console
      const result = await fetch(`/api/storage`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });
      const cids = await result.json();
      console.log({ cids }); // eslint-disable-line no-console
      Object.keys(files).forEach((type: string) => {
        if (!cids[type]) {
          // eslint-disable-next-line no-console
          console.warn(`Uploaded "${type}" & didn't get a response back.`);
        } else {
          const key = type as keyof typeof refs;
          const ref = refs[key] as MutableRefObject<HTMLImageElement>;
          const elem = ref.current as HTMLImageElement | null;
          const { width, height } = elem ?? {};
          images[type] = {
            original: {
              src: `ipfs://${cids[type]}`,
              mimeType: 'image/*',
              width,
              height,
            },
          };
        }
      });
    }

    // empty string fails validation
    ['countryCode', 'birthDate'].forEach((prop) => {
      const key = prop as keyof BasicProfileProps;
      if (inputs[key] === '') {
        delete inputs[key]; // eslint-disable-line no-param-reassign
      }
    });

    const { countryCode: code }: { countryCode?: Maybe<string> } = inputs;
    if (code?.length === 2) {
      // eslint-disable-next-line no-param-reassign
      inputs.countryCode = code.toUpperCase();
    } else {
      delete inputs.countryCode; // eslint-disable-line no-param-reassign
    }

    setStatus(<Text>Authenticating DID…</Text>);
    await ceramic?.did?.authenticate();
  };

  return (
    <Wrap
      as="form"
      onSubmit={async (evt) => {
        setStatus('Submitting…');
        await handleSubmit(onSubmit)(evt);
        setStatus(null);
        onClose();
      }}
    >
      <WrapItem>
        <FormControl isInvalid={errors.image} align="center">
          <Tooltip label="An image generally cropped to a circle for display. 1MiB maximum size.">
            <Label htmlFor="image">Profile Image 🛈</Label>
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
            <Input
              name="image"
              type="file"
              onChange={onFileChange}
              maxW="100%"
              minH="100%"
              position="absolute"
              top={0}
              bottom={0}
              left={0}
              right={0}
              opacity={0}
              ref={register}
              {...register('image')}
            />
          </Box>
          <FormErrorMessage>{errors.image?.message}</FormErrorMessage>
        </FormControl>
      </WrapItem>
      <WrapItem>
        <FormControl isInvalid={errors.background} align="center">
          <Label htmlFor="background">Header Background</Label>
          <Image
            ref={
              (refs as { background: MutableRefObject<HTMLImageElement> })
                .background
            }
            src={httpLink(
              (endpoints as { background: { url: string } }).background.url,
            )}
            maxH="6em"
          />
          <Input
            name="background"
            type="file"
            onChange={onFileChange}
            ref={register}
            {...register('background')}
          />
          <FormErrorMessage>{errors.background?.message}</FormErrorMessage>
        </FormControl>
      </WrapItem>
      <WrapItem>
        <FormControl isInvalid={errors.description}>
          <Label htmlFor="description">Description</Label>
          <Textarea
            name="description"
            placeholder="Describe yourself."
            ref={register}
            maxLength={420}
            {...register('description', {
              maxLength: {
                value: 420,
                message: 'Maximum length is 420 characters.',
              },
            })}
          />
          <FormErrorMessage>
            {errors.description && errors.description.message}
          </FormErrorMessage>
        </FormControl>
      </WrapItem>
      <WrapItem>
        <FormControl isInvalid={errors.username}>
          <Tooltip label="Test">
            <Label htmlFor="name">Username 🛈</Label>
          </Tooltip>
          <Input
            name="username"
            placeholder="Lowercase alpha, digits, dashes, & underscores only."
            ref={register}
            maxLength={150}
            {...register('username', {
              maxLength: {
                value: 150,
                message: 'Maximum length is 150 characters.',
              },
            })}
          />
          <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
        </FormControl>
      </WrapItem>
      <WrapItem>
        <FormControl isInvalid={errors.name}>
          <Label htmlFor="name">Display Name</Label>
          <Input
            name="name"
            placeholder="Arbitrary letters, spaces, & punctuation. Max 150 characters."
            ref={register}
            maxLength={150}
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
      <WrapItem>
        <FormControl isInvalid={errors.pronouns}>
          <Label htmlFor="name">Pronouns</Label>
          <Input
            name="pronouns"
            placeholder="He, she, it, they, them, etc."
            ref={register}
            maxLength={150}
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
      <WrapItem>
        <FormControl isInvalid={errors.availability}>
          <Label htmlFor="name">Availability</Label>
          <InputGroup borderColor="transparent" mb={10}>
            <InputLeftElement>
              <span role="img" aria-label="clock">
                🕛
              </span>
            </InputLeftElement>
            <Input
              name="availability"
              type="number"
              placeholder="23"
              ref={register}
              max={24 * 7}
              min={0}
              {...register('availability', {
                max: {
                  value: 24 * 7,
                  message: `There's only ${24 * 7} hours in a week.`,
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
      <WrapItem>
        <FormControl isInvalid={errors.timeZone}>
          <Label htmlFor="name">Time Zone</Label>
          <SelectTimeZone
            labelStyle="abbrev"
            name="timeZone"
            placeholder="EST"
            ref={register}
            // maxLength={150}
            // {...register('timeZone', {
            //   maxLength: {
            //     value: 150,
            //     message: 'Maximum length is 150 characters.',
            //   },
            // })}
          />
          <FormErrorMessage>{errors.timeZone?.message}</FormErrorMessage>
        </FormControl>
      </WrapItem>
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
    </Wrap>
  );
};
