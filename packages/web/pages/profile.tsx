import { Flex } from '@metafam/ds';
import React from 'react';

import { SuccessPlayer } from '../components/SuccessPlayer';
import BackgroundImage from '../public/images/profile-background.png';

const Profile: React.FC = () => {
  return (
    <Flex
      backgroundSize="cover"
      backgroundImage={`url(${BackgroundImage})`}
      width="100vw"
      height="100vh"
      padding="3rem"
      flexDirection="column"
      alignItems="center"
    >
      <SuccessPlayer />
    </Flex>
  );
};

export default Profile;
