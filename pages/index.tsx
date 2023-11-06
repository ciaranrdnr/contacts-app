import Head from "next/head";
import { Global, ThemeProvider } from "@emotion/react";
import { globalStyles, mainStyles } from "@/styles/globals";
import { theme } from "@/styles/theme";
import dynamic from "next/dynamic";

const ContactList = dynamic(() => import("@/components/contact-list"), {
  ssr: false,
});

const Home = () => {
  const googleLink =
    "https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap";

  return (
    <>
      <Head>
        <title>Daftar Kontak</title>
        <meta
          name="description"
          content="Lists the names, addresses, and phone numbers of the people and businesses"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="preload"
          href={googleLink}
          as="style"
        />
        <noscript>
          <link rel="stylesheet" href={googleLink}/>
        </noscript>

        <link rel="icon" href="https://ciaraa.com/assets/logociara-col.svg" />
        <link
          rel="apple-touch-icon"
          href="https://ciaraa.com/assets/logociara-col.svg"
        />
      </Head>
      <Global styles={globalStyles} />
      <main css={mainStyles}>
        <ThemeProvider theme={theme}>
          <div
            css={{ position: "relative", maxWidth: "600px", margin: "auto" }}
          >
            <div
              css={{
                position: "sticky",
                top: 0,
                background: "white",
                zIndex: 10,
              }}
            >
              <ContactList />
            </div>
          </div>
        </ThemeProvider>
      </main>
    </>
  );
};
export default Home;
