import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document";

export default function MyDocument() {
  const getInitialProps = async (ctx: DocumentContext) => {
    const initalProps = await Document.getInitialProps(ctx);
    return initalProps;
  };
  return (
    <Html lang="en">
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link rel="shortcut icon" href="/public/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
