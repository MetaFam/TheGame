import {
  Box,
  Button,
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
  MetaButton,
  MetaFilterSelectSearch,
  MetaTheme,
  ModalFooter,
  selectStyles,
  SelectTimeZone,
  Text,
  useToast,
} from '@metafam/ds';
import { useUpdateProfileMutation } from 'graphql/autogen/types';
import React, { FC, useEffect, useState } from 'react';

import { MeType } from '../graphql/types';
import { TimeZoneOption } from '../utils/skillHelpers';

const DropdownStyles: typeof selectStyles = {
  ...selectStyles,
  multiValue: (s) => ({
    ...s,
    color: MetaTheme.colors.white,
  }),
  multiValueLabel: (s) => ({
    ...s,
    color: MetaTheme.colors.white,
  }),
  groupHeading: (s, { children }) => ({
    ...s,
    ...(selectStyles.groupHeading &&
      selectStyles.groupHeading(s, { children })),
    borderTop: `1px solid ${MetaTheme.colors.borderPurple}`,
    margin: 0,
  }),
  option: (s, { isSelected }) => ({
    ...s,
    backgroundColor: 'transparent',
    fontWeight: isSelected ? 'bold' : 'normal',
    ':hover': {
      backgroundColor: 'transparent',
      color: MetaTheme.colors.white,
    },
    ':focus': {
      boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.6)',
    },
  }),
  menu: () => ({
    minWidth: '100%',
  }),
  group: () => ({
    minWidth: '100%',
  }),
  control: (s) => ({
    ...s,
    background: MetaTheme.colors.dark,
    border: 'none',
    width: '100%',
    ':hover': {},
  }),
};

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
};

interface InputData {
  availability_hours?: number;
  timezone?: string;
}

export const ProfileField: React.FC<ProfileFieldProps> = ({
  title,
  placeholder,
  value,
  children,
}) => {
  const [innerValue, setInnerValue] = React.useState(value);

  React.useEffect(() => {
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
            placeholder={placeholder}
            color="white"
            value={innerValue}
            onChange={(e) => setInnerValue(e.target.value || '')}
            w="100%"
            my={4}
          />
          &nbsp;
        </>
      ) : (
        <>{children || innerValue}</>
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
        styles={DropdownStyles}
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
  const [timeZone, setTimeZone] = useState<string>('');
  const [availability, setAvailability] = useState<string>('');
  const [invalid, setInvalid] = useState(false);
  const [updateProfileRes, updateProfile] = useUpdateProfileMutation();
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  if (user?.player) {
    const { player } = user;
    if (player.timezone && !timeZone) {
      setTimeZone(player.timezone);
    }
    if (player.availability_hours && !availability) {
      setAvailability(player.availability_hours.toString());
    }
  }

  useEffect(() => {
    const value = Number(availability);
    setInvalid(value < 0 || value > 168);
  }, [availability]);

  // const GRID_SIZE = 2;
  // const HALF = GRID_SIZE / 2;

  const save = async () => {
    if (!user) return;

    setLoading(true);

    const input: InputData = {};
    if (user.player?.availability_hours?.toString() !== availability) {
      input.availability_hours = Number(availability);
    }
    if (user.player?.timezone !== timeZone) {
      input.timezone = timeZone;
    }

    const { error } = await updateProfile({
      playerId: user.id,
      input,
    });

    if (error) {
      toast({
        title: 'Error',
        description: 'Unable to update availability. The octo is sad 😢',
        status: 'error',
        isClosable: true,
      });
      setLoading(false);
      return;
    }

    onClose();
  };

  return (
    <Box>
      <Grid templateColumns="repeat(3, 1fr)">
        <GridItem>
          <ProfileField
            title="username"
            value={user?.username || user?.ethereum_address || ''}
          />
        </GridItem>

        {/* <GridItem>
          <ProfileField title="display name" value="User Supreme" />
        </GridItem>

        <GridItem colSpan={HALF}>
          <ProfileField title="pronouns" value="They/Them" />
        </GridItem> */}
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAvailability(e.target.value)
              }
              isInvalid={invalid}
            />
            <InputRightAddon background="purpleBoxDark" color="white">
              hr/week
            </InputRightAddon>
          </InputGroup>
        </GridItem>
        <GridItem>
          <Text fontSize="md" color="cyan" mb={4}>
            timezone
          </Text>
          <SelectTimeZone
            value={timeZone}
            onChange={(tz) => setTimeZone(tz.value)}
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
            onClick={save}
            isDisabled={invalid}
            isLoading={updateProfileRes.fetching || loading}
            loadingText="Saving"
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
    </Box>
  );
};
