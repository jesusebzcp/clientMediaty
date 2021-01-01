import Head from "next/head";

const HeadBase = () => {
  return (
    <Head>
      <html lang="es" />
      <title>Mediaty</title>
      <link
        rel="icon"
        type="image/png"
        href="https://www.google.com/s2/favicons?domain=https://mediaty.co/"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css"
        integrity="sha512-oHDEc8Xed4hiW6CxD7qjbnI+B07vDdX7hEPTvn9pSZO1bcRqHp8mj9pyr+8RVC2GmtEfI2Bi9Ke9Ass0as+zpg=="
        crossOrigin="anonymous"
      />

      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta property="og:layout" content="layout" key="layout" />

      <meta
        name="description"
        content="Marketing Simple. Marketing de Impacto. Marketing de Resultados."
      />
      <meta
        name="keywords"
        content="Mediaty MARKETING, DIGITAL,  Web & App UX Design,"
      />
    </Head>
  );
};
export default HeadBase;
