export const createProductReview = async ({
  heading,
  body,
  productId,
  customerName,
  customerEmail,
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
        rating: 4,
        state: "approved",
      },
    }),
    // body: formData,
  };

  const response = await fetch("/api/create_shopify_review", options)
    .then((response) => response.json())
    .catch((err) => console.error(err));

  console.log("this is the response", response);
  return response;
};
