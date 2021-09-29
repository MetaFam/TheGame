import {
  Box,
  Flex,
  Heading,
  Image,
  Input,
  MetaBox,
  MetaHeading,
} from '@metafam/ds';
import React from 'react';

import AvatarImage from '../assets/avatar.png';
import BackgroundImage from '../assets/login-background.jpg';
import { MeType } from '../graphql/types';

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
    <>
      <br />
      <Heading size="md" fontWeight="normal">
        {title}
      </Heading>
      {!children ? (
        <>
          <Input
            background="dark"
            placeholder={placeholder}
            value={innerValue}
            onChange={(e) => setInnerValue(e.target.value || '')}
            w="auto"
            my={4}
          />
          &nbsp;
        </>
      ) : (
        <>{children || innerValue}</>
      )}
    </>
  );
};

export const ProfileFormSection: React.FC<ProfileSectionFormProps> = ({
  title,
  children,
}) => (
  /* We'll re-design this Section when it's time to place it in the Profile page */
  <>
    <MetaBox title={title}>
      <div style={{ width: '60vw' }}>{children}</div>
    </MetaBox>
    <br />
    <br />
  </>
);

export const TemporaryProfileEditor: React.FC<ProfileEditorProps> = ({
  user,
}) => (
  <>
    <MetaHeading m={5}>Edit Profile Form (temporary)</MetaHeading>
    <ProfileFormSection title="ABOUT YOU">
      <ProfileField title="Avatar" value="">
        <Flex>
          <Box>
            <Image m={2} src={AvatarImage} alt="Avatar" w="1.5rem" />
          </Box>
          <Box m={4}>
            <Input type="file" name="avatar" />
          </Box>
        </Flex>
      </ProfileField>

      <ProfileField
        title="Username"
        value={user?.username || user?.ethereum_address || ''}
      />
      <ProfileField title="Display Name" value="Steve P" />
      <ProfileField title="Pronouns" placeholder="They/Them" />
    </ProfileFormSection>

    <ProfileFormSection title="LOCATION DETAILS">
      <ProfileField title="Country" value="UK" />
      <ProfileField
        title="Country (ISO Code)"
        placeholder="Replace with Dropdown"
      />
      <ProfileField title="Timezone" placeholder="Replace with Dropdown" />
    </ProfileFormSection>

    <ProfileFormSection title="PROFILE INFO">
      <ProfileField title="Website" placeholder="https://your.portfolio.here" />
      <ProfileField title="Favorite Emoji" placeholder=":-)" />
      <ProfileField
        title="Description"
        placeholder="Replace with Markdown Editor(?)"
      />
      <ProfileField title="Available Hours" placeholder="9am - 10pm" />
      <ProfileField title="Background Image" value="">
        <Flex>
          <Box>
            <Image m={2} src={BackgroundImage} alt="background" w="60rem" />
          </Box>
          <Box m={4}>
            <Input type="file" name="background" />
          </Box>
        </Flex>
      </ProfileField>
    </ProfileFormSection>

    <ProfileFormSection title="METAGAME ROLES">...</ProfileFormSection>

    <ProfileFormSection title="SKILLS">...</ProfileFormSection>

    <ProfileFormSection title="COLOR DISPOSITION">...</ProfileFormSection>
  </>
);
