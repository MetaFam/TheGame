import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './signpost.module.scss';

const directions = [
  {
    emoji: '👈',
    label: 'Library',
    url: '#here',
    description: 'Explore the Wiki',
  },
  {
    emoji: '🗞',
    label: 'Newsletter',
    url: 'https://metagame.substack.com/',
    description: 'MetaGame News.',
  },
  {
    emoji: '🎤',
    label: 'MetaView',
    url: 'https://anchor.fm/MetaGame/',
    description: 'A MetaGame Podcast.',
  },
  {
    emoji: '💬',
    label: 'Discord',
    url: 'https://discord.gg/VYZPBnx',
    description: 'Fast-paced MetaGame.',
  },
  {
    emoji: '📝',
    label: 'Forum',
    url: 'https://forum.metagame.wtf/',
    description: 'Thoughtful MetaGame.',
  },
  {
    emoji: '🐤',
    label: 'Twitter',
    url: 'https://twitter.com/metafam',
    description: 'Follow MetaGame on Twitter.',
  },
  {
    emoji: '🗺️',
    label: 'Raids',
    url: '/docs/enter-metagame/navigation-board',
    description: 'Find raids that peak your interest.',
  },
  {
    emoji: '🛠️',
    label: 'Github',
    url: 'https://github.com/MetaFam/TheGame',
    description: 'Where we build.',
  },
  {
    emoji: '📅',
    label: 'Calendar',
    url:
      'https://calendar.google.com/calendar/u/1?cid=bmloNTlrdGdhZm1tNjRlZDRxazZ1ZTh2djRAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ',
    description: 'Townhall Gatherings & Meetups.',
  },
  {
    emoji: '🧙',
    label: 'Players',
    url: 'https://my.metagame.wtf',
    description: 'The list of players of MetaGame.',
  },
  {
    emoji: '📈',
    label: 'Leaderboard',
    url: '/docs/enter-metagame/leaderboard',
    description: 'See the XP stats',
  },
  {
    emoji: '⚔️',
    label: 'Guilds',
    url: '/docs/enter-metagame/guilds-of-metagame',
    description: 'The list of guilds considered to be a part of MetaGame.',
  },
  {
    emoji: '🌱',
    label: 'Seed Market',
    url:
      'https://balancer.exchange/#/swap/ether/0x30cf203b48edaa42c3b4918e955fed26cd012a3f',
    description: 'Buy Seeds here',
  },
];

export function SignpostItem(props, key) {
  const [menuActive, setMenuActive] = useState(false);
  const { emoji, label, url, description } = props;
  console.log(url);
  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };
  useEffect(() => {
    const sidebar = document.querySelector('[class^="sidebar"]');

    console.log('sb', sidebar);
    const menu = document.querySelector('[class^="sidebar"] .menu');
    console.log('mn', menu);
    const display = window.innerWidth;

    menuActive
      ? sidebar.classList.add('highlight')
      : sidebar.classList.remove('highlight');

    if (display <= 800) {
      menuActive
        ? menu.classList.add('menu--show')
        : menu.classList.remove('menu--show');
    }
    setTimeout(() => {
      menuActive && toggleMenu();
    }, 5000);
    return () => {};
  }, [menuActive]);

  return (
    <ListItem key={`item-${key}`}>
      <Link
        className={url && url === '#here' ? 'trigger' : null}
        key={`link-${key}`}
        to={useBaseUrl(url)}
        title={description}
        onClick={url && url === '#here' ? toggleMenu : null}
      >
        <span>{emoji}</span>
        <span>{label}</span>
      </Link>
    </ListItem>
  );
}

export const ListItem = (props) => {
  const { children } = props;
  return <li className={styles.signpostItem}>{children}</li>;
};

export function Signpost() {
  return (
    <div className={styles.wrapper}>
      <img
        alt='MetaGame Wiki Logo'
        width='300'
        src='https://cdn.substack.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2Fe93a37b7-2a48-421c-80b7-3079eca8beb7_2048x881.png'
      />
      <ul className={styles.signpost}>
        {directions &&
          directions.length > 0 &&
          directions.map((direction, idx) => (
            <SignpostItem {...direction} key={`sp-${idx}`} />
          ))}
      </ul>
    </div>
  );
}
