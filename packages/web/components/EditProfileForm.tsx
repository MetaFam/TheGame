import {
  Box,
  Button,
  Grid,
  GridItem,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
  MetaButton,
  MetaFilterSelectSearch,
  metaFilterSelectStyles,
  ModalFooter,
  SelectTimeZone,
  Text,
  Tooltip,
  useToast,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@metafam/ds';

import { CONFIG } from 'config';

import { httpLink } from 'utils/linkHelpers';

import {
  useUpdatePlayerUsernameMutation,
  useUpdateProfileMutation,
} from 'graphql/autogen/types';
import React, { FC, useEffect, useState, useCallback, useRef } from 'react';

import { useForm } from 'react-hook-form'; 

import { useWeb3 } from 'lib/hooks'; 


import { MeType } from '../graphql/types';
import { TimeZoneOption } from '../utils/skillHelpers';

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
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

interface InputData {
  availableHours?: number;
  timezone?: string;
  pronouns?: string;
}

export const ProfileField: React.FC<ProfileFieldProps> = ({
  title,
  placeholder,
  value,
  onChange,
  children,
}) => {
  const [innerValue, setInnerValue] = useState(value);

  useEffect(() => {
    setInnerValue(value);
  }, [value]);

  return (
    <Box m={2}>
      <Text fontSize="md" color="cyan" mb={1}>
        {title}
      </Text>
      {!children ? (
        <>
          <Input
            background="dark"
            color="white"
            value={innerValue}
            onChange={onChange}
            w="100%"
            my={4}
            {...{ placeholder }}
          />
          &nbsp;
        </>
      ) : (
        children
      )}
    </Box>
  );
};

export type CountrySelectDropdownProps = {
  country: CountryOption;
  onChange: (country: CountryOption | null) => void;
};

export type CountryOption = {
  label: string;
  value: string;
};

export const COUNTRIES_LIST: { [key: string]: string } = {
  UK: 'United Kingdom',
  US: 'USA',
  MX: 'Mexico',
};
export const COUNTRIES_OPTIONS = Object.keys(COUNTRIES_LIST).map(
  (key) => ({ value: key, label: COUNTRIES_LIST[key] } as CountryOption),
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
          if (value) onChange(value as CountryOption);
        }}
      />
    </Box>
  </Box>
);

export type TimezoneOption = {
  label: string;
  value: string;
};
export type TimezoneSelectDropdownProps = {
  timezone: TimeZoneOption | undefined;
  onChange: (timezone: TimezoneOption | null) => void;
};

export const TIMEZONES_LIST: { [key: string]: string } = {
  '-800': 'GMT-800',
  '-700': 'GMT-700',
  '-600': 'GMT-600',
};
export const TIMEZONES_OPTIONS = Object.keys(TIMEZONES_LIST).map(
  (key) => ({ value: key, label: TIMEZONES_LIST[key] } as TimezoneOption),
);

export const EditProfileForm: React.FC<ProfileEditorProps> = ({
  user,
  onClose,
}) => {
  const [timeZone, setTimeZone] = useState<string>(
    user?.player?.timezone || '',
  );
  const [availability, setAvailability] = useState<string>(
    user?.player?.availableHours?.toString() || '',
  );
  const [username, setUsername] = useState<string>(
    user?.player?.username || '',
  );
  const [pronouns, setPronouns] = useState<string>(
    user?.player?.pronouns || '',
  );

  const image = useRef<HTMLImageElement>(null);
  const background = useRef<HTMLImageElement>(null);

  const [imageURL, setImageURL] = useState<string | null>(
    user?.player?.profile_cache?.imageURL ?? null 
  );
  const [backgroundURL, setBackgroundURL] = useState<string | null>(
    user?.player?.profile_cache?.backgroundImageURL ?? null 
  );


  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  const { ceramic, address } = useWeb3();

  const [invalid, setInvalid] = useState(false);
  const [updateProfileRes, updateProfile] = useUpdateProfileMutation();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [, updateUsername] = useUpdatePlayerUsernameMutation();

  useEffect(() => {
    const value = Number(availability);
    setInvalid(value < 0 || value > 24 * 7);
  }, [availability]);

  // const GRID_SIZE = 2;
  // const HALF = GRID_SIZE / 2;


  const onFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const input = event.target as HTMLInputElement;
      const file = input.files?.[0];
      if (!file) return;
      const img = image.current as HTMLImageElement;
      const bg = background.current as HTMLImageElement;
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        if (input.name === 'image') {
          img.src = reader.result as string;
        }
        if (input.name === 'background') {
          bg.src = reader.result as string;
        }
      });
      reader.readAsDataURL(file);
    },
    [],
  );

  const onSubmit = async (inputs: Record<string, unknown>) => {
    const values = { ...inputs };
    const formData = new FormData();
    const [imageFile] = values.image as File[];
    const [backgroundFile] = values.background as File[];
    if (!imageFile && !backgroundFile) {
      delete values.image;
      delete values.background;
    } else {
      // setStatus('Uploading files to web3.storage…');

      if (imageFile) {
        formData.append('image', imageFile);
      }
      if (backgroundFile) {
        formData.append('background', backgroundFile);
      }
      console.log ({formData, imageFile, backgroundFile})
      const result = await fetch(`/api/storage`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });
      console.log ({b: await result.text()})

      const cids = await result.json();
      console.log({cids})
      const refs = { image: image.current, background: background.current } as {
        image: HTMLImageElement | null;
        background: HTMLImageElement | null;
      };
      ['image', 'background'].forEach((key) => {
        if (cids[key]) {
          values[key] = {
            original: {
              src: `ipfs://${cids[key]}`,
              mimeType: 'image/*',
              width: refs[key as 'image' | 'background']?.width,
              height: refs[key as 'image' | 'background']?.height,
            },
          };
        } else {
          delete values[key];
        }
      });
    }

    // empty string fails validation
    ['residenceCountry', 'birthDate'].forEach((key) => {
      if (values[key] === '') {
        delete values[key];
      }
    });

    if (values.residenceCountry) {
      values.residenceCountry = (values.residenceCountry as string).toUpperCase();
    }

    // setStatus('Authenticating DID…');
    await ceramic?.did?.authenticate();

    // setStatus(null);
  };
  
  const save = async () => {
    if (!user) return;

    setLoading(true);

    const input: InputData = {};
    if (user.player?.availableHours?.toString() !== availability) {
      input.availableHours = Number(availability);
    }
    if (user.player?.timezone !== timeZone) {
      input.timezone = timeZone;
    }
    if (user.player?.pronouns !== pronouns) {
      input.pronouns = pronouns;
    }

    const profile = await updateProfile({
      playerId: user.id,
      input,
    });

    if (profile.error) {
      toast({
        title: 'Error',
        description: 'Unable to update profile. The octo is sad 😢',
        status: 'error',
        isClosable: true,
      });
      setLoading(false);
    }

    if (user.player?.username !== username) {
      const { error } = await updateUsername({
        playerId: user.id,
        username,
      });

      if (error) {
        let errorDetail = 'The octo is sad. 😢';
        if (error.message.includes('Uniqueness violation')) {
          errorDetail = 'It is already taken. 😢';
        } else if (error.message.includes('username_is_valid')) {
          errorDetail =
            'A username can only contain lowercase letters, numbers, and dashes.';
        }
        toast({
          title: 'Error',
          description: `Unable to update username. ${errorDetail}`,
          status: 'error',
          isClosable: true,
        });
        setLoading(false);
      }
    }

    onClose();
  };

  return (
    <Grid 
      as="form"
      onSubmit={async (evt) => {
        // setStatus('Submitting…');
        await handleSubmit(onSubmit)(evt);
        // setStatus(null);
      }}
    >

      <Grid templateColumns="repeat(3, 1fr)">
        <GridItem>

        <FormControl isInvalid={errors.image}>
          <FormLabel htmlFor="image">Profile Image</FormLabel>
          <Image ref={image} src={httpLink(imageURL) ?? undefined} maxH="6em" />
          <Input
            name="image"
            type="file"
            onChange={onFileChange}
            ref={register}
            {...register('image')}
          />
          <FormErrorMessage>
            {errors.image && errors.image.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.background}>
          <FormLabel htmlFor="background">Header Background</FormLabel>
          <Image ref={background} src={httpLink(backgroundURL) ?? undefined} maxH="6em" />
          <Input
            name="background"
            type="file"
            onChange={onFileChange}
            ref={register}
            {...register('background')}
          />
          <FormErrorMessage>
            {errors.background && errors.background.message}
          </FormErrorMessage>
        </FormControl>


            <ProfileField
              title="username"
              value={username}
              onChange={({ target: { value } }) => {
                setUsername(value || '');
              }}
            />
        </GridItem>

        {/* <GridItem>
          <ProfileField title="display name" value="User Supreme" />
        </GridItem> */}
      </Grid>
      <Grid templateColumns="repeat(3, 1fr)">
        <GridItem>
          <ProfileField
            title="pronouns"
            value={pronouns}
            onChange={({ target: { value } }) => {
              setPronouns(value || '');
            }}
          />
        </GridItem>
      </Grid>
      {/* <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <GridItem colSpan={HALF}>
          <CountrySelectDropdown country={COUNTRIES_OPTIONS[0]} />
        </GridItem>  */}
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        <GridItem>
          <Text fontSize="md" color="cyan" mb={4}>
            availability
          </Text>
          <InputGroup borderColor="transparent" mb={10}>
            <InputLeftElement>
              <span role="img" aria-label="clock">
                🕛
              </span>
            </InputLeftElement>
            <Input
              background="dark"
              placeholder="40"
              type="number"
              color="white"
              value={availability}
              onChange={({ target: { value } }) => setAvailability(value)}
              isInvalid={invalid}
            />
            <InputRightAddon background="purpleBoxDark" color="white">
              hr ⁄ week
            </InputRightAddon>
          </InputGroup>
        </GridItem>
        <GridItem>
          <Text fontSize="md" color="cyan" mb={4}>
            timezone
          </Text>
          <SelectTimeZone
            value={timeZone}
            onChange={({ value }) => setTimeZone(value)}
            labelStyle="abbrev"
          />
        </GridItem>
      </Grid>
      {/* </Grid>  
      <ProfileField
        title="description"
        placeholder="Replace with Markdown Editor(?)"
      />
      <ProfileField title="website" placeholder="https://your.portfolio.here" />
      <ProfileField title="working hours" placeholder="9am - 10pm" />
      <ProfileField title="background image" value="">
        <Flex>
          <Box>
            <Image m={2} src={BackgroundImage} alt="background" w="60rem" />
          </Box>
          <Box m={4}>
            <Input type="file" name="background" />
          </Box>
        </Flex>
      </ProfileField> */}
      {onClose && (
        <ModalFooter mt={6} justifyContent="center">
          <MetaButton
            // onClick={save}
            isDisabled={invalid}
            isLoading={updateProfileRes.fetching || loading}
            loadingText="Saving…"
            type="submit"          
          >
            Save Changes
          </MetaButton>
          <Button
            variant="ghost"
            onClick={onClose}
            color="white"
            _hover={{ bg: 'none' }}
          >
            Close
          </Button>
        </ModalFooter>
      )}
    </Grid>
  );
};
