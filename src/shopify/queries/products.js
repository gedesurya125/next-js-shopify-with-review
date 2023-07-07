export const PRODUCT_FIELDS = `#graphql
  fragment productFields on Product {
    availableForSale
    createdAt
    description
    descriptionHtml
    featuredImage {
      altText
      height
      width
      url
    }
    id
    images(first: 10) {
      nodes {
        url
        altText
      }
    }
    isGiftCard
    options {
      name
      values
    }
    priceRange {
      maxVariantPrice {
        amount
        currencyCode
      }
      minVariantPrice {
        amount
        currencyCode
      }
    }
    productType
    publishedAt
    requiresSellingPlan
    seo {
      title
      description
    }
    tags
    title
    totalInventory
    updatedAt
    vendor
    variants(first: 10) {
      nodes {
        id
        title
        price {
          amount
          currencyCode
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

`;

export const GET_PRODUCT_BY_ID = `#graphql
  ${PRODUCT_FIELDS}
  query getProduct ($id: ID) {
    product(id: $id) {
      ...productFields
    }
  }
`;
