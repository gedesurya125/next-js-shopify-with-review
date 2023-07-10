export const createProductReview = async ({
  heading,
  body,
  productId,
  customerName,
  customerEmail,
}) => {
  // const formData = new FormData();

  // formData.append("heading", heading);
  // formData.append("body", body);
  // formData.append("external_product_id", productId);
  // formData.append(
  //   "customer",
  //   JSON.stringify({
  //     name: customerName,
  //     email: customerEmail,
  //   })
  // );
  // formData.append("rating", "4"), formData.append("state", "approved");

  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      // mode: "no-cors",
      "SECRET-KEY": process.env.NEXT_PUBLIC_FERA_SECRET_KEY,
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

  const response = await fetch(
    // `https://api.fera.ai/v3/private/reviews?api_key=${process.env.NEXT_PUBLIC_FERA_SECRET_KEY}&secret_key=${process.env.NEXT_PUBLIC_FERA_SECRET_KEY}`,
    `https://api.fera.ai/v3/private/reviews/`,
    options
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));

  return response;
};
