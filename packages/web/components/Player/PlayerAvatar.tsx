import { Avatar, AvatarProps } from '@metafam/ds';
import { PlayerFragmentFragment } from 'graphql/autogen/types';
import React from 'react';
import {
	getPlayerImage,
	getPlayerName,
	hasPlayerImage,
} from 'utils/playerHelpers';

type PlayerAvatarProps = AvatarProps & { player: PlayerFragmentFragment };
export const PlayerAvatar: React.FC<PlayerAvatarProps> = ({
	player,
	...props
}) => {
	const attrs = {
		src: getPlayerImage(player),
		name: getPlayerName(player),
		...props,
	};
	if (hasPlayerImage(player)) attrs.bg = 'transparent';

	return <Avatar {...attrs} />;
};
