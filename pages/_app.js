import Layout from "../components/dashboards/Layout";
import NextNProgress from "nextjs-progressbar";
import { SessionProvider } from "next-auth/react";
import Header from "../components/front/Header.js";
import Footer from "../components/front/Footer.js";
import "../styles/tailwind.css";
import "prismjs/themes/prism-okaidia.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  if (Component.getLayout) {
    return (
      <SessionProvider session={session}>
        <Layout className="bg-gray-500">
          <NextNProgress />
          {Component.getLayout(<Component {...pageProps} />)}
        </Layout>
      </SessionProvider>
    );
  }
  if (Component.getAuth) {
    return <>{Component.getAuth(<Component {...pageProps} />)}</>;
  }
  return (
    <>
      <div className="bg-white dark:bg-slate-900">
        <div className="flex flex-col justify-between max-w-2xl min-h-screen p-4 mx-auto sm:py-8">
          <div>
            <Header />

            <main className="py-8">
              <NextNProgress />
              <Component {...pageProps} />
            </main>
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
}

export default MyApp;
