import { getStorefrontApiUrl, getPrivateTokenHeaders } from "shopify";

// This function used in next js SSR
export async function shopifyFetch({ query, variables }) {
  try {
    const result = await fetch(`${getStorefrontApiUrl()}`, {
      method: "POST",
      headers: getPrivateTokenHeaders("..."),
      body: { query, variables } && JSON.stringify({ query, variables }),
    });
    console.log("result", result);
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
}

export const queryShopifyData = async ({ query, variables }) => {
  try {
    const response = await shopifyFetch({ query, variables });
    return await response.json();
  } catch (error) {
    console.log("error fetching shopify", error);
  }
};

export async function getAllProducts() {
  return shopifyFetch({
    query: `{
        products(sortKey: TITLE, first: 100) {
          edges{
            node {
              id
              title
              description
            }
          }
        }
      }`,
  });
}
