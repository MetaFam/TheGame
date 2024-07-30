import { Box } from '@metafam/ds';
import {
  FaDiscord,
  FaGithub,
  FaGlobe,
  FaTelegram,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa';

import { LinkType_Enum, Maybe } from '#graphql/autogen/hasura-sdk';

const LinkIcon = ({ type }: { type: Maybe<LinkType_Enum> | undefined }) => {
  if (!type) return <></>;
  const currentIcon = {
    TWITTER: <FaTwitter />,
    DISCORD: <FaDiscord />,
    GITHUB: <FaGithub />,
    TELEGRAM: <FaTelegram />,
    FARCASTER: <FaGlobe />,
    LENSTER: <FaGlobe />,
    YOUTUBE: <FaYoutube />,
    OTHER: <FaGlobe />,
  }[type];
  return (
    <Box my="auto" ml={2}>
      {currentIcon}
    </Box>
  );
};

export default LinkIcon;
