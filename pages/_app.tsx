import "../styles/globals.css";
import type { AppProps } from "next/app";

import MediaQueryProvider from "context/MediaQueryListeners";
import SectionContextProvider from "context/SectionContext";
import Layout from "@/components/layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <MediaQueryProvider>
        <SectionContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SectionContextProvider>
      </MediaQueryProvider>
  );
}

export default MyApp;
