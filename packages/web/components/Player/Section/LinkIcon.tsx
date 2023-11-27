import { Box } from '@metafam/ds';
import { LinkType_Enum, Maybe } from 'graphql/autogen/types';
import {
  FaDiscord,
  FaGithub,
  FaGlobe,
  FaPaperPlane,
  FaPodcast,
  FaTelegram,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa';

const LinkIcon = ({ type }: { type: Maybe<LinkType_Enum> | undefined }) => {
  if (!type) return <></>;
  const currentIcon = {
    PODCAST: <FaPodcast />,
    NEWSLETTER: <FaPaperPlane />,
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