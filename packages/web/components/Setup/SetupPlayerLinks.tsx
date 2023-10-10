import { Box, MetaButton } from '@metafam/ds';
import { Links } from 'components/Player/Section/Links';
import { AddPlayerLink } from 'components/Player/Section/PlayerLinks/AddPlayerLink';
import { EditPlayerLink } from 'components/Player/Section/PlayerLinks/EditPlayerLink';
import { usePlayerHydrationContext } from 'contexts/PlayerHydrationContext';
import { Link, Player } from 'graphql/autogen/types';
import React, { useCallback, useState } from 'react';

const SetupPlayerLinks: React.FC<{
  onComplete?: () => void;
  player: Player;
}> = ({ player, onComplete }) => {
  const [role, setRole] = useState<string>('view');

  return (
    <>
      <PlayerLinksView {...{ role, setRole, player }} />
      {role === 'view' && (
        <Box textAlign="center" mt="1rem">
          <MetaButton
            loadingText="Adding link…"
            onClick={() => setRole('add')}
            bg="purple.500"
          >
            Add Link
          </MetaButton>
          {onComplete && (
            <MetaButton onClick={onComplete} bg="green.500" ml="1rem">
              Done
            </MetaButton>
          )}
        </Box>
      )}
    </>
  );
};
SetupPlayerLinks.displayName = 'SetupPlayerLinks';
export { SetupPlayerLinks };

const PlayerLinksView: React.FC<{
  role: string;
  player: Player;
  setRole: (role: string) => void;
}> = ({ role, player, setRole }) => {
  const { hydrateFromHasura } = usePlayerHydrationContext();
  const closeInner = useCallback(async () => {
    await hydrateFromHasura();
    setRole('view');
  }, [hydrateFromHasura, setRole]);
  const [linkToEdit, setLinkToEdit] = useState<Link>();
  const editLink = (link?: Link) => {
    setRole('edit');
    setLinkToEdit(link);
  };

  const currentView = {
    view: (
      <Links
        {...{ editLink, player }}
        onDelete={closeInner}
        isOwnProfile={true}
        admin={true}
      />
    ),
    add: <AddPlayerLink {...{ player }} onClose={closeInner} />,
    edit: <EditPlayerLink {...{ linkToEdit }} onClose={closeInner} />,
  }[role];

  return currentView;
};
