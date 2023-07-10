export const createProductReview = async ({
  heading,
  body,
  productId,
  customerName,
  customerEmail,
}) => {
  const formData = new FormData();

  formData.append("heading", heading);
  formData.append("body", body);
  formData.append("external_product_id", productId);
  formData.append(
    "customer",
    JSON.stringify({
      name: customerName,
      email: customerEmail,
    })
  );

  const options = {
    method: "POST",
    headers: {
      accept: "multipart/form-date",
      "content-type": "multipart/form-data",
      // "SECRET-KEY": process.env.NEXT_PUBLIC_FERA_SECRET_KEY,
    },
    body: formData,
  };

  const response = await fetch(
    `https://api.fera.ai/v3/private/reviews?secret_key=${process.env.NEXT_PUBLIC_FERA_SECRET_KEY}`,
    // `https://api.fera.ai/v3/private/reviews`,
    options
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));

  return response;
};
