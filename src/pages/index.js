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
  width: '740px',
  maxWidth: '740px',
  margin: '5rem auto',
  // overflow: 'hidden',
};
const panelStyle = {
  backgroundColor: 'rgba(255,255,255,0.08)',
  // borderRadius: '6px',
  display: 'flex',
  alignItems: 'flex-start',
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
};
const mainWrap = {
  flexGrow: 1,
  paddingLeft: '0px',
};
const aspectBox = {
  position: 'relative',
  height: '205px',
  width: '203px',
  overflow: 'hidden',
  textAlign: 'center',
};
const imgStyle = {
  width: '100%',
  height: '100%',
};
const lamerImgStyle = {
  ...imgStyle,
  width: '185px',
  height: '182px',
};

const sectionHeading = {
  fontFamily: '"IBM Plex Mono"',
  fontSize: '24px',
  color: '#a5b9f6',
  marginBottom: '13px',
};
const panelTitleStyle = {
  ...sectionHeading,
  color: 'white',
  marginBottom: '3px',
};
const textStyle = {
  fontSize: '17px',
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
          <div dangerouslySetInnerHTML={{ __html: description }} />
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
        <div className={classnames('inner-wrapper')} style={wrapperStyle}>
          <header className={classnames('hero', styles.heroBanner)}>
            <div className='container'>
              <img
                alt='MetaGame Wiki Logo'
                className={styles.wikiLogo}
                width='555'
                src={useBaseUrl('img/wiki-logo.png')}
              />
              <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
            </div>
          </header>
          <main>
            {features && features.length && (
              <section className={styles.features}>
                <div className='container'>
                  <div
                    className='row'
                    style={{
                      display: 'flex',
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
              </section>
            )}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div className={styles.buttons}>
                <Link
                  className={classnames(
                    'button button--primary button--lg button--explore',
                    styles.button,
                  )}
                  to={useBaseUrl('docs/introduction')}
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
