import Head from 'next/head';


export type HeadMetaProps = {
  title?: string;
  description?: string;
  url?: string;
  img?: string;
  cardStyle?: string;
};

export const HeadComponent: React.FC<HeadMetaProps> = ({
  /**
  * Defaults for the site meta tags and shares via Open Graph tags and Twitter cards
  * Can/should be customised per page
  * e.g. 
  * <HeadComponent
      title="MetaGame Seeds Page"
      description="..."
      url="https://metagame.wtf/seeds"
    />
  * The share image is in `/packages/web/public/assets`, so new images are available 
  * for testing locally or on deployments without having to mess about with host names
  * ref. https://nextjs.org/docs/basic-features/static-file-serving
  */
  title = 'MetaGame',
  description = 'MetaGame is a Massive Online Coordination Game! MetaGame is any approach to a game that transcends or operates outside of the prescribed rules of the game, uses external factors to affect the game, or goes beyond the supposed limits or environment set by the game.',
  url = 'https://metagame.wtf/',
  img = '/assets/new_logo_svg.svg',
  cardStyle = 'summary',
}) => (
  <Head>
    <title>{title}</title>
    <meta
      name="viewport"
      property="viewport"
      content="width=device-width, initial-scale=1.0"
    />
    <meta name="title" property="title" content={title} />
    <meta name="description" property="description" content={description} />
    <meta name="theme-color" property="theme-color" content="#5a32e6" />

    <meta name="og:type" property="og:type" content="website" />
    <meta name="og:site_name" property="og:site_name" content="MetaGame" />
    <meta name="og:locale" property="og:locale" content="en_US" />

    <meta name="og:title" property="og:title" content={title} />
    <meta
      name="og:description"
      property="og:description"
      content={description}
    />
    <meta name="og:url" property="og:url" content={url} />
    <meta name="og:image" property="og:image" content={img} />

    <meta name="twitter:card" property="twitter:card" content={cardStyle} />
    <meta name="twitter:url" property="twitter:url" content={url} />
    <meta name="twitter:site" property="twitter:site" content="@MetaFam" />
    <meta name="twitter:title" property="twitter:title" content={title} />
    <meta
      name="twitter:description"
      property="twitter:description"
      content={description}
    />
    <meta name="twitter:image" property="twitter:image" content={img} />
  </Head>
);
