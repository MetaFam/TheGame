import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  InfoIcon,
  Input,
  Tooltip,
  useToast,
} from '@metafam/ds';
import {
  AddPlayerLink,
  EditPlayerLink,
  PlayerLinks,
} from 'components/Player/Section/PlayerLinks';
import {
  Link,
  Player,
  useUpsertDeworkProfileMutation,
} from 'graphql/autogen/types';
import React, { useState } from 'react';

export const SetupPlayerLinks: React.FC<{
  onComplete: () => void;
  player: Player;
}> = ({ player, onComplete }) => {
  const [deworkURL, setDeworkURL] = useState<string>('');
  const [, upsertPlayerDework] = useUpsertDeworkProfileMutation();
  const toast = useToast();
  const [linkToEdit, setLinkToEdit] = useState<Link>();
  const [role, setRole] = useState<string>('view');
  const [linkId, setLinkId] = useState<string>('');

  const handleSetRole = (newRole: string, link?: Link) => {
    setRole(newRole);
    setLinkToEdit(link);
  };

  return (
    <>
      <PlayerLinksView
        role={role}
        player={player}
        link={linkToEdit}
        setRole={handleSetRole}
      />
      <Button onClick={() => setRole('add')}>Add Link</Button>
    </>
  );
};

const PlayerLinksView: React.FC<{
  role: string;
  player: Player;
  link?: Link;
  setRole: any;
}> = ({ role, player, link, setRole }) => {
  const currentView = {
    view: (
      <PlayerLinks
        player={player}
        isOwnProfile={true}
        admin={true}
        switchToEdit={setRole}
      />
    ),
    add: <AddPlayerLink player={player} />,
    edit: (
      <EditPlayerLink player={player} linkToEdit={link} editId={link?.id} />
    ),
  }[role];

  return <> {currentView} </>;
};
