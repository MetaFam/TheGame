import { MetaTag, Wrap, WrapItem } from '@metafam/ds';
import { PlayerFragmentFragment } from 'graphql/autogen/types';
import { SkillColors } from 'graphql/types';
import React from 'react';

type Props = {
  player: PlayerFragmentFragment;
};

const SHOW_SKILLS = 4;

export const PlayerTileSkills: React.FC<Props> = ({ player }) => {
  return (
    <Wrap>
      {player.Player_Skills.slice(0, SHOW_SKILLS).map(({ Skill }) => (
        <WrapItem key={Skill.id}>
          <MetaTag
            size="md"
            fontWeight="normal"
            backgroundColor={SkillColors[Skill.category]}
          >
            {Skill.name}
          </MetaTag>
        </WrapItem>
      ))}
      {player.Player_Skills.length > SHOW_SKILLS && (
        <WrapItem>
          <MetaTag size="md" fontWeight="normal">
            {`+${player.Player_Skills.length - SHOW_SKILLS}`}
          </MetaTag>
        </WrapItem>
      )}
    </Wrap>
  );
};
