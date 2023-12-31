import {
  Image as ShopifyImage,
  ProductProvider,
  useProduct,
} from "@shopify/hydrogen-react";
import { queryShopifyData, shopifyFetch } from "apollo/shopifyFetch";
import { getShopifyProductNumber, getShopifyRealProductId } from "helper";
import React from "react";
import { GET_PRODUCT_BY_ID } from "shopify/queries";

// External Components
import {
  Box,
  Heading,
  Section,
  Input,
  Label,
  Button,
} from "@thepuzzlers/pieces";
import { createProductReview, getProductReviews } from "feraReviewsApi";
import { Paragraph } from "theme-ui";
import { AspectRatioImageContainer } from "components";
import { Field, Form, Formik, useField, useFormik } from "formik";
import TranslatedLink from "components/TranslatedLink";
const ProductDetailPage = ({ productDetail, productReviews }) => {
  // console.log("this i product detail", productDetail);
  if (!productDetail?.data) return null;

  return (
    <ProductProvider data={productDetail.data.product}>
      <PageContent productReviews={productReviews} />
    </ProductProvider>
  );
};

export default ProductDetailPage;

const PageContent = ({ productReviews }) => {
  const { product, variants } = useProduct();
  const [initialReview, setInitialReview] = React.useState(productReviews.data);

  console.log("this is the product reviews", initialReview);

  const addReview = (review) => {
    setInitialReview((state) => [...state, review]);
  };

  return (
    <Section as="header" id="product-detail__header">
      <TranslatedLink
        href="/"
        sx={{
          gridColumn: ["1/13"],
          variant: "buttons.primary",
          width: "max-content",
          mt: "3rem",
        }}
      >
        Back to home
      </TranslatedLink>

      <Heading
        as="h1"
        sx={{
          gridColumn: ["1/13"],
          mt: "10rem",
        }}
      >
        {product.title}
      </Heading>
      <ProductImage />
      <ReviewList productReviews={initialReview} />
      <CreateReviewForm productId={product.id} addReview={addReview} />
    </Section>
  );
};

const ProductImage = () => {
  const { product } = useProduct();

  return (
    <Box
      sx={{
        gridColumn: ["1/13"],
        justifySelf: "start",
        width: "40rem",
        height: "50rem",
        position: "relative",
      }}
    >
      <ShopifyImage
        data={product.featuredImage}
        sizes="(min-width: 45em) 50vw, 100vw"
        style={{
          objectFit: "contain",
          aspectRatio: "1/2",
          width: "100%",
          height: "100%",
        }}
      />
    </Box>
  );
};

const ReviewList = ({ productReviews }) => {
  return (
    <Box
      sx={{
        gridColumn: ["1/13"],
        mt: "10rem",
      }}
    >
      <Heading
        as="h2"
        sx={{
          fontSize: ["2rem"],
        }}
      >
        Reviews
      </Heading>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          gap: "2rem",
        }}
      >
        {productReviews.map((review, index) => {
          return <ReviewMessage data={review} key={index} />;
        })}
      </Box>
    </Box>
  );
};

const ReviewMessage = ({
  data: {
    body,
    heading,
    product,
    created_at,
    customer: { name, avatar_url, email },
    rating,
  },
}) => {
  return (
    <Box
      sx={{
        overflow: "scroll",
        mt: ["3rem"],
        p: "1rem",
        border: "1px solid",
        borderColor: "primary",
        width: "max-content",
        borderRadius: "12px",
      }}
    >
      <Paragraph>Review Message :</Paragraph>
      <Paragraph>{heading}</Paragraph>
      <Paragraph>{body}</Paragraph>
      <AspectRatioImageContainer
        aspectRatios={1}
        imgStyle={{ objectFit: "contain" }}
        src={product?.image_url}
        alt=""
        sx={{
          width: "10rem",
        }}
      />
      <Paragraph>Rating: {rating}</Paragraph>
      <Paragraph>Crated At: {created_at}</Paragraph>
      <Paragraph
        sx={{
          mt: "3rem",
        }}
      >
        Customer info :
      </Paragraph>
      <AspectRatioImageContainer
        aspectRatios={1}
        src={avatar_url}
        sx={{
          width: "5rem",
        }}
      />
      <Paragraph>{name}</Paragraph>
      <Paragraph>{email}</Paragraph>
    </Box>
  );
};

const CreateReviewForm = ({ productId, addReview }) => {
  return (
    <Box
      sx={{
        gridColumn: "1/13",
        mt: ["3rem"],
      }}
    >
      <Heading>Review Form</Heading>
      <Formik
        enableReinitialize
        initialValues={{
          heading: "",
          body: "",
          productId: getShopifyProductNumber(productId),
          customerName: "",
          customerEmail: "",
          rating: 1,
        }}
        onSubmit={async (values, { resetForm }) => {
          const response = await createProductReview(values);

          console.log("this is the response", response);
          if (response?.data?.customer?.name) {
            addReview(response.data);
            resetForm();
          }
        }}
      >
        {(props) => {
          return (
            <Form>
              <TextField
                label="name"
                id="review-customer-name"
                name="customerName"
              />
              <TextField
                label="email"
                id="review-customer-email"
                name="customerEmail"
              />
              <TextField label="title" id="review-title" name="heading" />
              <TextField label="message" id="review-message" name="body" />
              <TextField
                label="ProductId"
                id="review-productId"
                name="productId"
                disabled
              />
              <SelectField
                id="rating-select"
                name="rating"
                label="Rating"
                options={[
                  { label: "1", value: 1 },
                  { label: "2", value: 2 },
                  { label: "3", value: 3 },
                  { label: "4", value: 4 },
                  { label: "5", value: 5 },
                ]}
              />
              <Button
                type="submit"
                sx={{
                  mt: ["4rem"],
                }}
              >
                Submit
              </Button>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

const SelectField = ({ options, id, name, label }) => {
  return (
    <Box
      sx={{
        mt: "3rem",
      }}
    >
      <Paragraph
        as="label"
        htmlFor={id}
        sx={{
          variant: "forms.label",
        }}
      >
        {label}
      </Paragraph>
      <Field
        component="select"
        id={id}
        name={name}
        style={{
          display: "block",
          width: "100%",
        }}
      >
        {options.map((option, index) => {
          return (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </Field>
    </Box>
  );
};

const TextField = ({ label, name, id, disabled }) => {
  const [field] = useField(name);

  return (
    <Box
      sx={{
        mt: "2rem",
      }}
    >
      <Label
        htmlFor="id"
        sx={{
          variant: "forms.label",
        }}
      >
        {label}
      </Label>
      <Input
        disabled={disabled}
        sx={{
          mt: "1rem",
        }}
        id={id}
        {...field}
      />
    </Box>
  );
};

export const getStaticPaths = async () => {
  const GET_PRODUCT_IDS = `#graphql
    query getProduct {
      products(first: 10) {
        nodes {
          id
        }
      }
    }
  `;

  const response = await queryShopifyData({
    query: GET_PRODUCT_IDS,
  });

  const paths =
    response?.data?.products.nodes.map(({ id }) => {
      return {
        params: {
          product_id: `${getShopifyProductNumber(id)}`,
        },
      };
    }) || [];

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  const { product_id } = params;

  const productDetail = await queryShopifyData({
    query: GET_PRODUCT_BY_ID,
    variables: {
      id: getShopifyRealProductId(product_id),
    },
  });

  const productReviews = await getProductReviews({ productId: product_id });

  return {
    props: {
      productDetail: productDetail || null,
      productReviews: productReviews || null,
    },
  };
};
