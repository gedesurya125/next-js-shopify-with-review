import React from "react";

// External Components
import { Box, Paragraph, Button } from "@thepuzzlers/pieces";
import Image from "next/image";
import { ProductProvider, useCart, useMoney } from "@shopify/hydrogen-react";
import { AddToCartButton } from "./AddToCartButton";

export const ProductsDisplay = ({ products }) => {
  return (
    <Box
      className="__product-display"
      sx={{
        gridColumn: ["1/13", "1/13", "1/25", "4/ span 16", "4/ span 16"],
        display: "flex",
        gap: "3rem",
        mt: "4rem",
      }}
    >
      {products?.nodes.map((product, index) => {
        return <ProductCard product={product} key={index} />;
      })}
    </Box>
  );
};

const ProductCard = ({ product }) => {
  const { images, title, id, variants } = product;

  console.log("this is the product id", id);

  return (
    <Box
      sx={{
        width: "20rem",
        borderRadius: "12px",
        // height: "auto,
        bg: "white",
        position: "relative",
        overflow: "hidden",
        p: "1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        alignSelf: "start",
      }}
    >
      <ProductProvider data={product}>
        <CardImage alt="product image" src={images.nodes[0].url} fill={true} />
        <Paragraph
          sx={{
            textAlign: "center",
            mt: "1rem",
            fontFamily: "body.normal",
            fontSize: [null, null, null, null, null, "1.8rem"],
          }}
        >
          {title}
        </Paragraph>
        <Box
          sx={{
            mt: "3rem",
            width: "100%",
          }}
        >
          <Paragraph
            sx={{
              fontWeight: "bold",
              fontFamily: "body.normal",
              fontSize: [
                "1.6rem",
                "1.6rem",
                "1.6rem",
                "1.6rem",
                "1.6rem",
                "1.6rem",
              ],
            }}
          >
            Variants
          </Paragraph>
          {variants?.nodes?.map((variant, index) => {
            return <ProductVariant variant={variant} key={index} />;
          })}
        </Box>
      </ProductProvider>
    </Box>
  );
};

const CardImage = ({ src, alt, sx }) => {
  return (
    <Box
      sx={{
        height: "20rem",
        width: "15rem",
        position: "relative",
        ...sx,
      }}
    >
      <Image alt={alt} src={src} fill={true} objectFit="cover" />
    </Box>
  );
};

const ProductVariant = ({ variant: { id, title, price, image } }) => {
  const displayedPrice = useMoney(price);

  return (
    <Box
      sx={{
        border: "1px solid black",
        borderRadius: "card",
        pt: "1rem",
        mt: "2rem",
      }}
    >
      <CardImage
        src={image?.url}
        sx={{
          mx: "auto",
        }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: "1rem",
          bg: "teal",
          p: "1rem",
          borderRadius: "card",
        }}
      >
        <Box>
          <Paragraph
            sx={{
              color: "white",
            }}
          >
            {title}
          </Paragraph>

          <Paragraph
            sx={{
              color: "white",
              mt: "0.5rem",
            }}
          >
            {`${displayedPrice.currencyNarrowSymbol}. ${displayedPrice.amount}`}
          </Paragraph>
        </Box>
        <AddToCartButton variantId={id} />
      </Box>
    </Box>
  );
};
