import { PageContainer } from 'components/Container';
import { GuildList } from 'components/Guild/GuildList';
import { HeadComponent } from 'components/Seo';
import { GuildFragment } from 'graphql/autogen/types';
import { getGuilds } from 'graphql/queries/guild';
import { InferGetStaticPropsType } from 'next';
import React from 'react';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

// TODO: move this order to based on metamanifesto nft / pSEED holding in the future
const GUILD_ORDER = [
  { guildname: 'cr8rdao', name: 'CRΞ8R DAO' },
  { guildname: 'metacartel', name: 'MetaCartel' },
  { guildname: 'panvala', name: 'Panvala' },
  { guildname: 'daohaus', name: 'DAOhaus' },
  { guildname: 'metafactory', name: 'MetaFactory' },
  { guildname: 'bloomnetwork', name: 'Bloom Network' },
  { guildname: 'metafam', name: 'MetaFam' },
  { guildname: 'raidguild', name: 'RaidGuild' },
  { guildname: 'sourcecred', name: 'SourceCred' },
  { guildname: 'metacartelventures', name: 'MetaCartel Ventures' },
  { guildname: 'questchains', name: 'Quest Chains' },
  { guildname: 'Giveth', name: 'Giveth' },
  { guildname: 'liminalvillage', name: 'Liminal Village' },
  { guildname: 'projectark', name: 'Project Ark' },
  { guildname: 'rndao', name: 'rnDAO' },
  { guildname: 'wgmi', name: 'wgmi' },
  { guildname: 'opolis', name: 'Opolis' },
  { guildname: 'wildfiredao', name: 'Wildfire' },
  { guildname: '1hive', name: '1Hive' },
  { guildname: 'atlantisworld', name: 'Atlantis World' },
  { guildname: 'deepwork', name: 'Deep Work Studio' },
  { guildname: 'ethernautdao', name: 'ΞthernautDAO' },
  { guildname: 'storyguild', name: 'Story Guild' },
  { guildname: 'commonsstack', name: 'The Commons Stack' },
  { guildname: 'mgd', name: 'MGD DAO' },
  { guildname: 'safary', name: 'Safary 🦁' },
  { guildname: 'grdn', name: 'GRDN (🌎, 🌍, 🌏)' },
  { guildname: 'dorg', name: 'dOrg' },
  { guildname: 'buidl', name: 'Buidl Guidl' },
  { guildname: 'TEC', name: 'Token Engineering Commons' },
];

const sortGuild = (a: GuildFragment, b: GuildFragment) => {
  const guildIds = GUILD_ORDER.map((g) => g.guildname);
  const indexA = guildIds.indexOf(a.guildname);
  const indexB = guildIds.indexOf(b.guildname);

  if (indexB === indexA) return 0;
  if (indexB === -1) return -1;
  if (indexA === -1) return 1;

  return indexA > indexB ? 1 : -1;
};

export const getStaticProps = async () => {
  const guilds = (await getGuilds()).sort(sortGuild);

  return {
    props: {
      guilds,
    },
    revalidate: 1,
  };
};

const GuildsPage: React.FC<Props> = ({ guilds }) => (
  <PageContainer>
    <HeadComponent
      title="MetaGame Guilds"
      description="MetaGame is a Massive Online Coordination Game! Guilds participating in MetaGame…."
      url="https://my.metagame.wtf/community/guilds"
    />
    <GuildList {...{ guilds }} />
  </PageContainer>
);

export default GuildsPage;
