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
      "SECRET-KEY": process.env.NEXT_PUBLIC_FERA_SECRET_KEY,
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      heading,
      body,
      state: "approved",
      external_product_id: productId,
      customer: {
        name: customerName,
        email: customerEmail,
      },
    }),
  };

  const response = await fetch(
    "https://api.fera.ai/v3/private/reviews/",
    options
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));

  return response;
};
