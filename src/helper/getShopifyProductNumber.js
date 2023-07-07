export const getShopifyProductNumber = (productId) =>
  productId.replace("gid://shopify/Product/", "");

export const getShopifyRealProductId = (id) => {
  return `gid://shopify/Product/${id}`;
};
