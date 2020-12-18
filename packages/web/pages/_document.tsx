import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';

class MetaDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;700&family=IBM+Plex+Sans:wght@400;700&family=Press+Start+2P&display=swap"
            rel="stylesheet"
          />
          <link rel="shortcut icon" href="/favicon.png" />
          {/* @TODO: remove and apply filter with _hover={} when https://github.com/chakra-ui/chakra-ui/issues/2831 is resolved */}
          <style>{`button.filter-effect:hover { filter: drop-shadow(0 0 15px #a5b9f680); }`}</style>
          <meta charSet="UTF-8" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MetaDocument;
