import Alliances from '#assets/menuIcon/alliances.svg';
import Asketh from '#assets/menuIcon/asketh.svg';
import Discord from '#assets/menuIcon/discord.svg';
import Events from '#assets/menuIcon/events.svg';
import Forum from '#assets/menuIcon/forum.svg';
import Guilds from '#assets/menuIcon/guilds.svg';
import Invest from '#assets/menuIcon/invest.svg';
import Learn from '#assets/menuIcon/learn.svg';
import MetaGameWiki from '#assets/menuIcon/metagamewiki.svg';
import MetaRadio from '#assets/menuIcon/metaradio.svg';
import Patrons from '#assets/menuIcon/patrons.svg';
import Playbooks from '#assets/menuIcon/playbooks.svg';
import Players from '#assets/menuIcon/players.svg';
import Quests from '#assets/menuIcon/quests.svg';
import Raids from '#assets/menuIcon/raids.svg';
import Roles from '#assets/menuIcon/roles.svg';
import SeedEarned from '#assets/menuIcon/seedearned.svg';
import Seeds from '#assets/menuIcon/seeds.svg';
import TheGreatHouses from '#assets/menuIcon/thegreathouses.svg';
import WelcomeToMetaGame from '#assets/menuIcon/welcometometagame.svg';
import XPEarned from '#assets/menuIcon/xpearned.svg';
import Youtube from '#assets/menuIcon/youtube.svg';

export const menuIcons: Record<string, string> = {
  alliances: Alliances.src,
  asketh: Asketh.src,
  discord: Discord.src,
  forum: Forum.src,
  guilds: Guilds.src,
  invest: Invest.src,
  learn: Learn.src,
  metagamewiki: MetaGameWiki.src,
  patrons: Patrons.src,
  playbooks: Playbooks.src,
  players: Players.src,
  quests: Quests.src,
  raids: Raids.src,
  roles: Roles.src,
  seedearned: SeedEarned.src,
  seeds: Seeds.src,
  thegreathouses: TheGreatHouses.src,
  welcometometagame: WelcomeToMetaGame.src,
  xpearned: XPEarned.src,
  youtube: Youtube.src,
  metaradio: MetaRadio.src,
  events: Events.src,
} as const;
