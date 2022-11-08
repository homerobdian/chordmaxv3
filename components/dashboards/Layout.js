import React, { Fragment } from "react";
import Header from "./Header";
import Head from "next/head";

const Layout = (props) => {
  return (
    <React.Fragment>
      <Head>
        <title>Chord Admin Panel</title>
        <meta charSet="UTF-8" />
        <meta
          name="description"
          content="The ultimate collection of design-agnostic, flexible and accessible React UI Components."
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta property="og:type" content="website"></meta>
        <meta
          property="og:title"
          content="Sakai by PrimeReact | Free Admin Template for NextJS"
        ></meta>
        <meta
          property="og:url"
          content="https://www.primefaces.org/sakai-react"
        ></meta>
        <meta
          property="og:description"
          content="The ultimate collection of design-agnostic, flexible and accessible React UI Components."
        />
        <meta
          property="og:image"
          content="https://www.primefaces.org/static/social/sakai-nextjs.png"
        ></meta>
        <meta property="og:ttl" content="604800"></meta>
      </Head>
      <Header />
      <div className="w-full h-full bg bg-gray-800">
        <div className="mt-10 ">{props.children}</div>
      </div>
    </React.Fragment>
  );
};

export default Layout;
