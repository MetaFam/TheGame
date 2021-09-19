import { SetupProfile } from 'components/Setup/SetupProfile';
import { SetupSkills } from 'components/Setup/SetupSkills';
import { SetupContextProvider } from 'contexts/SetupContext';
import { getSkills } from 'graphql/getSkills';
import { useUser } from 'lib/hooks';
import { InferGetStaticPropsType } from 'next';
import React, { useState } from 'react';
import { parseSkills, SkillOption } from 'utils/skillHelpers';

export const getStaticProps = async () => {
  const skills = await getSkills();
  const skillChoices = parseSkills(skills);

  return {
    props: {
      skillChoices,
      hideTopMenu: true,
    },
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const SkillsSetup: React.FC<Props> = (props) => {
  const { skillChoices } = props;
  const [skills, setSkills] = useState<Array<SkillOption>>([]);
  const { user } = useUser({ redirectTo: '/' });

  if (user?.player) {
    const { player } = user;
    if (player.skills && player.skills.length > 0 && skills.length === 0) {
      setSkills(
        player.skills.map((s) => ({
          value: s.Skill.id,
          label: s.Skill.name,
          ...s.Skill,
        })),
      );
    }
  }

  return (
    <SetupContextProvider>
      <SetupProfile>
        <SetupSkills
          skillChoices={skillChoices}
          skills={skills}
          setSkills={setSkills}
        />
      </SetupProfile>
    </SetupContextProvider>
  );
};
export default SkillsSetup;
