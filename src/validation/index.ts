export const productValidation = (product: {
  title: string;
  description: string;
  imageURL: string;
  price: string;
}) => {
  //** Return the Object */
  const errors: {
    title: string;
    description: string;
    imageURL: string;
    price: string;
  } = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
  };

  const validUrl = /^(ftp|http|https):\/\/[^"]+$/.test(product.imageURL);

  if (
    !product.title.trim() ||
    product.title.length < 10 ||
    product.title.length > 80
  ) {
    errors.title = "must be between 10 - 80 chars";
  }

  if (
    !product.description.trim() ||
    product.description.length < 10 ||
    product.description.length > 800
  ) {
    errors.description = "must be between 10 - 800 chars";
  }

  if (!product.imageURL.trim() || !validUrl) {
    errors.imageURL = "Valid Image URL is required";
  }

  if (!product.price.trim() || isNaN(Number(product.price))) {
    errors.price = "it is not a number";
  }

  return errors;
};
