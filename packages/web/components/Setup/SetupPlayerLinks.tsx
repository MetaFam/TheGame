import { MetaButton } from '@metafam/ds';
import {
  AddPlayerLink,
  EditPlayerLink,
  PlayerLinks,
} from 'components/Player/Section/PlayerLinks';
import { Link, Player } from 'graphql/autogen/types';
import React, { useState } from 'react';

export const SetupPlayerLinks: React.FC<{
  onComplete: () => void;
  player: Player;
}> = ({ player, onComplete }) => {
  const [linkToEdit, setLinkToEdit] = useState<Link>();
  const [role, setRole] = useState<string>('view');

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
        onClose={onComplete}
      />
      {role === 'view' ? (
        <MetaButton
          loadingText="Adding link..."
          onClick={() => setRole('add')}
          bg="purple.500"
        >
          Add Link
        </MetaButton>
      ) : (
        ''
      )}
    </>
  );
};

const PlayerLinksView: React.FC<{
  role: string;
  player: Player;
  link?: Link;
  setRole: any;
  onClose: any;
}> = ({ role, player, link, setRole, onClose }) => {
  const currentView = {
    view: (
      <PlayerLinks
        player={player}
        isOwnProfile={true}
        admin={true}
        switchToEdit={setRole}
        onClose={onClose}
      />
    ),
    add: <AddPlayerLink player={player} onClose={onClose} />,
    edit: (
      <EditPlayerLink
        player={player}
        linkToEdit={link}
        editId={link?.id}
        onClose={onClose}
      />
    ),
  }[role];

  return <> {currentView} </>;
};
