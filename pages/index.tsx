import Head from 'next/head'
import ContactList from '@/components/contact-list'
import { Global, ThemeProvider } from '@emotion/react';
import { globalStyles, mainStyles } from '@/styles/globals';
import { theme } from '@/styles/theme';


const Home=()=> {
  const googleLink = "https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"

  return (
    <>
      <Head>
        <title>Daftar Kontak</title>
        <meta name="description" content="Lists the names, addresses, and phone numbers of the people and businesses" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link href={googleLink} rel="stylesheet" />
      </Head>
       <Global styles={globalStyles} />
      <main css={mainStyles}>
        <ThemeProvider theme={theme}>
         <ContactList />
        </ThemeProvider>
      </main>
    </>
  )
}
export default  Home