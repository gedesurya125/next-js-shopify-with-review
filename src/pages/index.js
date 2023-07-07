import React from "react";
import { useShop } from "@shopify/hydrogen-react";

// External Components
import { Section, Box } from "@thepuzzlers/pieces";
import { LanguageSwitchLink, ProductsDisplay, SEO } from "components";
import { NavigationBar } from "components/NavigationBar";
import { CartPreview } from "components/CartPreview";
import { shopifyFetch } from "apollo/shopifyFetch";

import Link from "next/link";
import TranslatedLink from "components/TranslatedLink";
import { LanguageSwitchLinkGroup } from "components/LanguageSwitchLinkGroup";

export default function Home({ shopifyData }) {
  const { getStorefrontApiUrl } = useShop();

  console.log("this is shopify data", getStorefrontApiUrl());

  return (
    <>
      <SEO title="Home" description="home description" />
      <NavigationBar shopData={shopifyData} />
      <Section as="main">
        <ProductsDisplay products={shopifyData?.data?.products} />
        <CartPreview />
        <Box
          sx={{
            gridColumn: "1/ span 10",
            display: "flex",
            alignSelf: "start",
            gap: "2rem",
            my: "3rem",
          }}
        >
          <TranslatedLink
            href="/blog"
            sx={{
              variant: "buttons.secondary",
            }}
          >
            Go to BLOG
          </TranslatedLink>
          <Link href="/blog" sx={{}}>
            Default Next Link to Blog
          </Link>

          <LanguageSwitchLinkGroup />
          <TranslatedLink
            href="/legal-page"
            sx={{
              variant: "buttons.secondary",
            }}
          >
            Go To Legal Page
          </TranslatedLink>
        </Box>
      </Section>
    </>
  );
}

export async function getServerSideProps({ locales, locale }) {
  // A Storefront API query, defined in a separate file where you make queries.
  //? language setting refer to https://shopify.dev/docs/api/storefront#directives
  const GRAPHQL_QUERY = `
    query products @inContext(language:${locale.toUpperCase()}) {
      shop {
        name
      }
      products(first: 10) {
        nodes {
          id
          images(first: 10) {
            nodes {
              id
              altText
              url
            }
          }
          title
          variants(first: 10) {
            nodes {
              id
              title
              price{
                currencyCode
                amount
              }
              selectedOptions {
                name
                value
              }
              image {
                altText
                url
              }
            }
          }
        }
      }
    }
  `;

  const response = await shopifyFetch({
    query: GRAPHQL_QUERY,
  });

  const shopifyData = await response.json();

  return { props: { shopifyData } };
}
