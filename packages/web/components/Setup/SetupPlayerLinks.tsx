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
import { Player, useUpsertDeworkProfileMutation } from 'graphql/autogen/types';
import React, { useState } from 'react';
import { AddPlayerLink, EditPlayerLink } from 'components/Player/Section/PlayerLinks';
import { PlayerLinks } from 'components/Player/Section/PlayerLinks';

export const SetupPlayerLinks: React.FC<{
  onComplete: () => void;
  player: Player;
}> = ({ player, onComplete }) => {
  const [deworkURL, setDeworkURL] = useState<string>('');
  const [, upsertPlayerDework] = useUpsertDeworkProfileMutation();
  const toast = useToast();
  const [linkToEdit, setLinkToEdit] = useState<string | null>();
  const [role, setRole] = useState<string>('view');
  const [linkId, setLinkId] = useState<string>('');

  const handleSetRole = (newRole: string, id?: string) => {
    setRole(newRole)
    setLinkId(id || '')
  }

  return (
    <>
      <PlayerLinksView role={role} player={player} setRole={handleSetRole} />
      <Button onClick={() => setRole('add')}>Add Link</Button>
    </>
  );
};

const PlayerLinksView: React.FC<{
  role: string,
  player: Player
  setRole: any
}> = ({role, player, setRole}) => {
  const currentView = {
    view: <PlayerLinks player={player} isOwnProfile={true} admin={true} switchToEdit={setRole} />,
    add: <AddPlayerLink player={player} />,
    edit: <EditPlayerLink player={player} editId={''} />
  }[role]

  return <> {currentView} </>
}