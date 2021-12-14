import Head from 'next/head';
import React from 'react';

export type HeadMetaProps = {
  title?: string;
  description?: string;
  url?: string;
  img?: string;
};

export const HeadComponent: React.FC<HeadMetaProps> = ({
  title = '𝗠eta𝗚ame',
  description = 'MetaGame is a Massive Online Coordination Game! MetaGame is any approach to a game that transcends or operates outside of the prescribed rules of the game, uses external factors to affect the game, or goes beyond the supposed limits or environment set by the game.',
  url = 'https://my.metagame.wtf/',
  img = 'https://my.metagame.wtf/_next/image?url=%2Fassets%2Flogo.alt.png&w=1920&q=75',
}) => (
  <Head>
    <title>{title}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="title" content={title} />
    <meta name="description" content={description} />
    <meta name="theme-color" content="#5a32e6" />

    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="MetaGame" />
    <meta property="og:locale" content="en_US" />

    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={url} />
    <meta property="og:image" content={img} />

    <meta property="twitter:card" content="summary" />
    <meta property="twitter:url" content={url} />
    <meta property="twitter:site" content="@MetaFam" />
    <meta property="twitter:title" content={title} />
    <meta property="twitter:description" content={description} />
    <meta property="twitter:image" content={img} />
  </Head>
);
