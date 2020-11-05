import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.scss';

const features = [
  {
    title: 'For Players',
    imageUrl: 'assets/players.png',
    description:
      '<p>MetaGame is for those who want to play an active role in building the future.</p> <p>For those who want to:</p> <ul><li>Build their knowledge, get experience & level up.</li> <li>Find cool projects, solve problems & get paid.</li> <li>Become a part of something bigger.</li></ul>',
    linkText: 'Through here',
    linkTo: 'docs/start-here/for-players',
  },
  {
    title: 'For Guilds',
    imageUrl: 'assets/guilds.png',
    description:
      '<p>Its also for groups of people, those building tools & services for a decentralized future.</p> <p>For those who want:</p> <ul><li>Help finding tools, frameworks & funds accessible.</li> <li>Help getting value-aligned contributors & adopters.</li> <li>Become a part of the "new world" puzzle.</li></ul>',
    // linkText: 'Through here',
    // linkTo: 'docs/start-here/for-guilds',
  },
  {
    title: 'For Patrons',
    imageUrl: 'assets/patrons.png',
    description:
      '<p>Those who really want to see MetaGame succeed, but prefer to help with funds.</p> <p>Why?</p> <ul><li>They love builder onboarding & support systems.</li> <li>Membership and other things, all paid in Seeds.</li> <li>Understanding MetaGame made them go: Fuck yeah!</li></ul>',
    // linkText: 'Through here',
    // linkTo: 'docs/start-here/for-patrons',
  },
  {
    title: 'For Lamers',
    imageUrl: 'assets/lamers.png',
    description:
      '<p>Those who prefer to push their self-interest over everyone & only detract from the commons.</p> <p>NOT for:</p> <ul><li>Those who want to get rich quick & buy Lambos.</li><li>Those who say, but do not do.</li><li>Those who like to complain.</li></ul>',
    // linkText: 'Through here',
    // linkTo: 'docs/start-here/for-patrons',
  },
];

const wrapperStyle = {
  width: '680px',
  maxWidth: '680px',
  margin: '5rem auto',
  // overflow: 'hidden',
};
const panelStyle = {
  backgroundColor: 'rgba(255,255,255,0.08)',
  // borderRadius: '6px',
  display: 'flex',
  alignItems: 'center',
  flexFlow: 'row nowrap',
  flex: '0 0 100%',
  marginBottom: '30px',
  padding: '30px',
  textAlign: 'left',
  width: '100%',
};
const lastPanelStyle = {
  ...panelStyle,
  marginBottom: '50px',
};
const lamerPanelStyle = {
  ...panelStyle,
  marginBottom: '30px',
};
const imgWrap = {
  flex: '0 0 33%',
  width: '33%',
  marginRight: '15px',
};
const mainWrap = {
  flexGrow: 1,
  paddingLeft: '10px',
  paddingRight: '20px',
};
const aspectBox = {
  position: 'relative',
  height: '205px',
  width: '203px',
  // overflow: 'hidden',
  textAlign: 'center',
};
const imgStyle = {
  width: '100%',
  height: '100%',
};
const lamerImgStyle = {
  ...imgStyle,
  // width: '185px',
  // height: '182px',
};

const sectionHeading = {
  fontFamily: '"IBM Plex Mono"',
  fontSize: '24px',
  color: '#a5b9f6',
};
const panelTitleStyle = {
  ...sectionHeading,
  color: 'white',
  marginBottom: '3px',
  flex: '0 0 100%',
  width: '100%',
  textAlign: 'left',
};
const textStyle = {
  fontSize: '14px',
};

function Panel({
  imageUrl,
  title,
  description,
  linkText,
  linkTo,
  lastPlayerPanel,
  lamerPanel,
}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div
      className={classnames(
        'col',
        styles.feature,
        styles.panel,
        lastPlayerPanel && styles.lastItem,
      )}
      style={lastPlayerPanel ? lastPanelStyle : panelStyle}
    >
      {imgUrl && (
        <div style={imgWrap} className={styles.imageWrapper}>
          <div style={aspectBox}>
            <img
              style={lamerPanel ? lamerImgStyle : imgStyle}
              src={imgUrl}
              alt={title}
            />
          </div>
        </div>
      )}
      <div style={mainWrap}>
        {title && <h3 style={panelTitleStyle}>{title}</h3>}
        {description && (
          <div
            style={textStyle}
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}
      </div>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  let wikipath = 'home';
  useEffect(() => {
    wikipath = window.location.pathname === '/' ? 'home' : 'docs';
  });

  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <div className={classnames('wrapper', wikipath)}>
        <div
          className={classnames('inner-wrapper', styles.innerWrapper)}
          style={wrapperStyle}
        >
          <header className={classnames(styles.heroBanner)}>
            <div className='container'>
              <img
                alt='MetaGame Wiki Logo'
                className={styles.wikiLogo}
                width='555'
                src={
                  'https://cdn.substack.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2Fe93a37b7-2a48-421c-80b7-3079eca8beb7_2048x881.png'
                }
              />
              <p className={styles.heroSubtitle}>
                <em>A Massive Online Coordination Game</em>
              </p>
            </div>
          </header>
          <main className={styles.mainContent}>
            <div
              className='row'
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <div className={'col'}>
                <h2 id='abstract'>Abstract</h2>
                <blockquote>
                  <p>
                    <em>
                      “Metagame is any approach to a game that transcends or
                      operates outside of the prescribed rules of the game, uses
                      external factors to affect the game, or goes beyond the
                      supposed limits or environment set by the game.”
                    </em>{' '}
                    - From Wiki
                  </p>
                </blockquote>
                <p>
                  Players of MetaGame are on a quest to change the way people
                  coordinate around solving problems &amp; creating value.
                </p>
                <p>
                  The quest stretches from fixing the onboarding to the Ethereum
                  space
                  <br />
                  by symmetrifying information &amp; composing the basic
                  socio-economic infrastructure, to grappling with actual
                  problems.
                </p>
                <ul>
                  <li>
                    You know, the opposite of the first crypto-world problems.
                  </li>
                </ul>
                <p>But, it all starts with Seeds…</p>
                <h2 id='seed-phase'>Seed Phase</h2>
                <p>
                  <img
                    src='https://cdn.substack.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2Ffa305be3-279a-440a-9ba2-cfa2d49281c4_952x186.png'
                    alt=''
                  />
                </p>
                <p>
                  The main goal of Seed phase is to build a hub for anyone
                  interested in decentralized
                  <br />
                  organizations &amp; applications.
                  <br />
                  Guides &amp; portals to anything one might need to build them
                  &amp; a community of people to support them.
                </p>
                <p>
                  We’re building a <em>Decentralized Factory</em> for baking the
                  building blocks we are going to use to compose the bigger
                  picture.
                </p>
                <h2 id='the-bigger-picture'>The Bigger Picture</h2>
                <p>
                  <img
                    src='https://cdn.substack.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2Fbe6c92b4-6ead-4a60-acf0-db9cc0251b9c_1310x265.png'
                    alt=''
                  />
                </p>
                <p>
                  The long term goal of MetaGame is to build an alternative
                  society; a global society focused around solving problem - not
                  squeezing the world for profit.
                </p>
                <p>We are building the future we want to live in:</p>
                <ul>
                  <li>
                    A more collaborative, transparent &amp; decentralized
                    future.
                  </li>
                  <li>
                    A future in which human progress isn’t accelerating its
                    destruction.
                  </li>
                </ul>
                <p>Read more about the Phases of MetaGame?</p>
              </div>
            </div>

            {features && features.length && (
              <section className={styles.features}>
                <div className='container'>
                  <div className='row'>
                    <div
                      className={'col'}
                      style={{
                        display: 'flex',
                        flexFlow: 'row wrap',
                        justifyContent: 'center',
                      }}
                    >
                      <h2 style={sectionHeading}>So, who is it for?</h2>
                      {features &&
                        features.map((props, i, idx) => (
                          <>
                            {features.length === i + 1 && (
                              <h2 style={sectionHeading}>Who is it NOT for?</h2>
                            )}
                            <Panel
                              key={idx}
                              lastPlayerPanel={
                                i === features.length - 2 ? 'last-item' : ''
                              }
                              lamerPanel={
                                i === features.length - 1 ? 'lamer-panel' : ''
                              }
                              {...props}
                            />
                          </>
                        ))}
                    </div>
                  </div>
                </div>
              </section>
            )}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div className={styles.buttons}>
                <Link
                  className={classnames(
                    'button button--primary button--lg button--explore',
                    styles.button,
                  )}
                  to={useBaseUrl('docs/home')}
                >
                  EXPLORE
                </Link>
                <Link
                  className={classnames(
                    'button button--primary button--lg button--join',
                    styles.button,
                    styles.btnJoin,
                  )}
                  to={useBaseUrl('docs/enter-metagame/join-metagame')}
                >
                  JOIN
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
