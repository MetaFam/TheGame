import { EmbedContainer } from 'components/Container';
import React from 'react';
import { descriptions } from 'utils/menuLinks';

const PlaybooksPage: React.FC = () => (
  <EmbedContainer
    title="MetaGame Playbooks"
    description={descriptions.playbooks}
    url="https://wiki.metagame.wtf/playbooks/how-to-make-it-without-technical-skills/?metaos=true"
  />
);

export default PlaybooksPage;
