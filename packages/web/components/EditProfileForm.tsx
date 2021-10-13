import {
  Box,
  Flex,
  Grid,
  GridItem,
  Image,
  Input,
  MetaFilterSelectSearch,
  MetaTheme,
  selectStyles,
  Text,
} from '@metafam/ds';
import React, { FC } from 'react';

import BackgroundImage from '../assets/login-background.jpg';
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
  address: string;
};

export type ProfileSectionFormProps = {
  title: string;
};

export type ProfileFieldProps = {
  title: string;
  placeholder?: string;
  value?: string;
};

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
  timezone: TimeZoneOption;
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
export const TimezoneSelectDropdown: FC<TimezoneSelectDropdownProps> = ({
  timezone,
  onChange,
}) => (
  <Box>
    <Text fontSize="md" color="cyan" mb={1}>
      timezone
    </Text>
    <Box my={6}>
      <MetaFilterSelectSearch
        title={timezone.label}
        tagLabel=""
        hasValue={Boolean(timezone)}
        styles={DropdownStyles}
        value={[timezone]}
        options={TIMEZONES_OPTIONS}
        onChange={(value) => {
          if (value) onChange(value as TimezoneOption);
        }}
      />
    </Box>
  </Box>
);

export const EditProfileForm: React.FC<ProfileEditorProps> = ({ user }) => {
  const GRID_SIZE = 2;
  const HALF = GRID_SIZE / 2;
  return (
    <Box
      bgSize="cover"
      bgAttachment="fixed"
      p={[4, 8, 12]}
      backgroundImage={`url(${BackgroundImage})`}
    >
      <Grid templateColumns="repeat(3, 1fr)">
        <GridItem>
          <ProfileField
            title="username"
            value={
              'superUser123' || user?.username || user?.ethereum_address || ''
            }
          />
        </GridItem>

        <GridItem>
          <ProfileField title="display name" value="User Supreme" />
        </GridItem>

        <GridItem colspan={HALF}>
          <ProfileField title="pronouns" value="They/Them" />
        </GridItem>
      </Grid>
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <GridItem colspan={HALF}>
          <CountrySelectDropdown
            country={COUNTRIES_OPTIONS[0]}
            onChange={console.log}
          />
        </GridItem>
        <GridItem colspan={HALF}>
          <TimezoneSelectDropdown
            timezone={TIMEZONES_OPTIONS[0]}
            onChange={console.log}
          />
        </GridItem>
      </Grid>
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
      </ProfileField>
    </Box>
  );
};
