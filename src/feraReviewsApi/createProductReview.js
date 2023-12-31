export const createProductReview = async ({
  heading,
  body,
  productId,
  customerName,
  customerEmail,
  rating,
}) => {
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      data: {
        heading,
        body: JSON.stringify(body),
        external_product_id: productId,
        customer: {
          name: customerName,
          email: customerEmail,
        },
        rating,
        state: "approved",
      },
    }),
    // body: formData,
  };

  const response = await fetch("/api/create_shopify_review", options)
    .then((response) => response.json())
    .catch((err) => console.error(err));

  return response;
};
