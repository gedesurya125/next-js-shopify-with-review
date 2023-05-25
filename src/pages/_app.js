import "@/styles/globals.css";

import { ThemeProvider } from "theme-ui";
import theme from "@/theme";
import { CartProvider, ShopifyProvider } from "@shopify/hydrogen-react";
// import { ApolloProvider } from "@apollo/client";
// import { apolloClient } from "@/apollo/apolloClient";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      {/* <ApolloProvider client={apolloClient}> */}

      <ShopifyProvider
        storeDomain={process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}
        storefrontToken={
          process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN
        }
        storefrontApiVersion={process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION}
        countryIsoCode="DE"
        languageIsoCode="DE"
      >
        <CartProvider
          onLineAdd={() => {
            console.log("a line is being added");
          }}
          onLineAddComplete={() => {
            console.log("a line has been added");
          }}
        >
          <Component {...pageProps} />
        </CartProvider>
      </ShopifyProvider>
      {/* </ApolloProvider> */}
    </ThemeProvider>
  );
}
