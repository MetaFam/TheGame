import { Box } from '@metafam/ds';
import { LinkType_Enum, Maybe } from 'graphql/autogen/types';
import {
  FaDiscord,
  FaGithub,
  FaGlobe,
  FaTelegram,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa';

const LinkIcon = ({ type }: { type: Maybe<LinkType_Enum> | undefined }) => {
  if (!type) return <></>;
  const currentIcon = {
    Twitter: <FaTwitter />,
    Discord: <FaDiscord />,
    Github: <FaGithub />,
    Telegram: <FaTelegram />,
    Farcaster: <FaGlobe />,
    Lenster: <FaGlobe />,
    Youtube: <FaYoutube />,
    Other: <FaGlobe />,
  }[type];
  return (
    <Box my="auto" ml={2}>
      {currentIcon}
    </Box>
  );
};

export default LinkIcon;
