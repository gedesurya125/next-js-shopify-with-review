// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  if (!req?.body?.data) return res.status(400);

  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "SECRET-KEY": process.env.NEXT_PUBLIC_FERA_SECRET_KEY,
    },
    body: JSON.stringify(req.body.data),
  };

  const response = await fetch(
    "https://api.fera.ai/v3/private/reviews",
    options
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));

  res
    .status(200)
    .json({ message: "success", data: response, payload: req.body.data });
}
