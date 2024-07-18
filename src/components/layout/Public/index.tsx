import Head from "next/head";
import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
type Props = {
  children: JSX.Element[] | JSX.Element;
  title?: string;
};
const PublicLayout: React.FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <meta property="og:url" content="" />
        <meta property="og:type" content="website" />
        <title>{title}</title>
      </Head>
      <main>
        <Navbar />
        {children}
        <Footer />
      </main>
    </>
  );
};

export default PublicLayout;
