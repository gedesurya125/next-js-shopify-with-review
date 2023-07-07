import "styles/globals.css";

import { ThemeProvider } from "theme-ui";
import theme from "theme";
import { CartProvider, ShopifyProvider } from "@shopify/hydrogen-react";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}
