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
import { AddPlayerLink } from 'components/Player/Section/PlayerLinks';
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

  return (
    <>
      <PlayerLinksView role={role} player={player} />
    </>
  );
};

const PlayerLinksView: React.FC<{
  role: string,
  player: Player
}> = ({role, player}) => {
  const currentView = {
    view: <PlayerLinks player={player} isOwnProfile={true} admin={true} />,
    add: <AddPlayerLink player={player} />
  }[role]

  return <> {currentView} </>
}