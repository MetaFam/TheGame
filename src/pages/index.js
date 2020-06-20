import React from "react";
import classnames from "classnames";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";

const features = [
  {
    title: "For Players",
    imageUrl: "assets/icon-dark.png",
    description: "Join MetaGame as a player & get help forging your path.",
    linkText: "Through here",
    linkTo: "docs/handbook/for-players",
  },
  {
    title: "For Guilds",
    imageUrl: "assets/icon-plain.png",
    description:
      "Join MetaGame as a project & get support building the future.",
    linkText: "Through here",
    linkTo: "docs/handbook/for-guilds",
  },
  {
    title: "Third Patrons",
    imageUrl: "assets/icon-glow.png",
    description: "Join the future by supporting MetaGame.",
    linkText: "Through here",
    linkTo: "docs/handbook/for-investors",
  },
];

function Feature({ imageUrl, title, description, linkText, linkTo }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={classnames("col col--4", styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
      <Link
        className="button button--primary button--outline"
        to={useBaseUrl(linkTo)}
      >
        {linkText}
      </Link>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <header className={classnames("hero", styles.heroBanner)}>
        <div className="container">
          <img
            alt="MetaGame Wiki Logo"
            className={styles.wikiLogo}
            width="555"
            src={useBaseUrl("img/wiki-logo.png")}
          />
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className="button button--primary button--lg"
              to={useBaseUrl("docs/introduction")}
            >
              EXPLORE
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
