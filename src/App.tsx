import { ChangeEvent, FormEvent, useState } from "react";
import ProductsCard from "./components/ProductCard";
import Modal from "./components/Ui/Modal";
import { formInputsList, productList } from "./data";
import Btn from "./components/Ui/Btn";
import Input from "./components/Ui/Input";
import { IProduct } from "./interfaces";
import { productValidation } from "./validation";
import ErrorMessage from "./ErrorMessage";

function App() {
  //** States **/
  const defaultProductObj = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  };
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState<IProduct>(defaultProductObj);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });

  console.log(errors);

  //** Handlers **/
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value, // set title with value or set description with value etc.
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };
  const open = () => {
    setIsOpen(true);
  };
  const OnCancle = () => {
    setIsOpen(false);
    setProduct(defaultProductObj);
  };

  function submitHandler(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    console.log(product);
    const errors = productValidation({
      title: product.title,
      description: product.description,
      imageURL: product.imageURL,
      price: product.price,
    });
    const hasErrorMsg =
      Object.values(errors).some((value) => value === "") &&
      Object.values(errors).every((value) => value === "");

    if (!hasErrorMsg) {
      setErrors(errors);
      return;
    }
  }

  // ** Render **//
  const renderProductList = productList.map((product) => (
    <ProductsCard key={product.id} product={product} />
  ));
  const formInputs = formInputsList.map((input) => (
    <div className="flex flex-col" key={input.id}>
      <label htmlFor={input.id}>{input.label}</label>
      <Input
        type="text"
        name={input.name}
        id={input.id}
        value={product[input.name]}
        onChange={onChangeHandler}
      />
      <ErrorMessage msg={errors[input.name]} />
    </div>
  ));

  return (
    <>
      <Btn width="w-fit" className=" bg-indigo-700" onClick={open}>
        Add
      </Btn>
      <div className="border-2 border-amber-400 grid grid-cols-1 md:grid-cols-4 gap-2.5">
        {renderProductList}
      </div>
      <Modal isOpen={isOpen} close={close} title="Add A New product">
        <form onSubmit={submitHandler}>
          {formInputs}
          <div className="flex justify-between items-center space-x-2 mt-5">
            <Btn className=" bg-indigo-700">Submit</Btn>
            <Btn onClick={OnCancle} className=" bg-gray-400 hover:bg-gray-600">
              Cancel
            </Btn>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default App;
