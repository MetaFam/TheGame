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
    description: '',
    linkText: 'Through here',
    linkTo: 'docs/start-here/for-players',
  },
  {
    title: 'For Guilds',
    imageUrl: 'assets/guilds.png',
    description: '',
    linkText: 'Through here',
    linkTo: 'docs/start-here/for-guilds',
  },
  {
    title: 'For Patrons',
    imageUrl: 'assets/patrons.png',
    description: '',
    linkText: 'Through here',
    linkTo: 'docs/start-here/for-patrons',
  },
];

function Feature({ imageUrl, title, description, linkText, linkTo }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={classnames('col col--4', styles.feature)}>
      {imgUrl && (
        <div className={classnames('text--center', styles.imageWrapper)}>
          <img className={styles.featureImage} src={imgUrl} alt={title} />
          {/* <div> */}
          <Link
            className='button button--primary button--outline'
            to={useBaseUrl(linkTo)}
          >
            <span>{title}</span>
          </Link>
          {/* </div> */}
        </div>
      )}
      <div className='text--center'>{description && <p>{description}</p>}</div>
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
      <div className={classnames('inner-wrapper', wikipath)}>
        <div className={classnames('wrapper')}>
          <header className={classnames('hero', styles.heroBanner)}>
            <div className='container'>
              <img
                alt='MetaGame Wiki Logo'
                className={styles.wikiLogo}
                width='555'
                src={useBaseUrl('img/wiki-logo.png')}
              />
              <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
              <div className={styles.buttons}>
                <Link
                  className='button button--primary button--lg'
                  to={useBaseUrl('docs/introduction')}
                >
                  EXPLORE
                </Link>
              </div>
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
                    {features.map((props, idx) => (
                      <Feature key={idx} {...props} />
                    ))}
                  </div>
                </div>
              </section>
            )}
          </main>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
