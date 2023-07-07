export const getProductReviews = async ({ productId }) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "SECRET-KEY": process.env.NEXT_PUBLIC_FERA_SECRET_KEY,
    },
  };

  const response = await fetch(
    `https://api.fera.ai/v3/private/products/${productId}/reviews`,
    options
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));

  return response;
};
