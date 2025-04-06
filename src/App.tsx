import { ChangeEvent, FormEvent, useState } from "react";
import ProductsCard from "./components/ProductCard";
import Modal from "./components/Ui/Modal";
import { categories, colors, formInputsList, productList } from "./data";
import Btn from "./components/Ui/Btn";
import Input from "./components/Ui/Input";
import { ICategory, IProduct } from "./interfaces";
import { productValidation } from "./validation";
import ErrorMessage from "./ErrorMessage";
import CircleColor from "./components/CircleColor";
import { v4 as uuid } from "uuid";
import Select from "./components/Ui/Select";
import { TproductName } from "./components/types";

function App() {
  //** States **/
  const defaultProductObj: IProduct = {
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
  const [product, setProduct] = useState(defaultProductObj);
  const [products, setProducts] = useState<IProduct[]>(productList);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });
  const [tempColors, setTempColors] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [productToEdit, setProductToEdit] =
    useState<IProduct>(defaultProductObj);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);

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

  const onChangeEditHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductToEdit({
      ...productToEdit,
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

  const openEditModal = () => {
    setIsOpenEditModal(true);
  };
  const OnCancleEdit = () => {
    setIsOpenEditModal(false);
  };

  function submitHandler(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

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
    setProducts((prev) => [
      {
        ...product,
        id: uuid(),
        colors: tempColors,
        category: selectedCategory,
      },
      ...prev,
    ]);
    OnCancle();
    setTempColors([]);
    setProduct(defaultProductObj);
  }

  function submitEditHandler(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const errors = productValidation({
      title: productToEdit.title,
      description: productToEdit.description,
      imageURL: productToEdit.imageURL,
      price: productToEdit.price,
    });
    const hasErrorMsg =
      Object.values(errors).some((value) => value === "") &&
      Object.values(errors).every((value) => value === "");

    if (!hasErrorMsg) {
      setErrors(errors);
      return;
    }
    setProducts((prev) => [
      {
        ...product,
        id: uuid(),
        colors: tempColors,
        category: selectedCategory,
      },
      ...prev,
    ]);
    OnCancle();
    setTempColors([]);
    setProductToEdit(defaultProductObj);
  }

  // ** Render **//
  const renderProductList = products.map((product, index) => (
    <ProductsCard
      key={index}
      product={product}
      colors={tempColors}
      setProductToEdit={setProductToEdit}
      openEditModal={openEditModal}
    />
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

  const renderColors = colors.map((color) => (
    <CircleColor
      key={color}
      color={color}
      onClick={() => {
        if (tempColors.includes(color)) {
          setTempColors((prev) => prev.filter((item) => item !== color));
          return;
        }
        setTempColors((prev) => [...prev, color]);
      }}
    />
  ));

  const renderProductEditWithErrorMsg = (
    id: string,
    label: string,
    name: TproductName
  ) => {
    return (
      <div className="flex flex-col">
        <label htmlFor={name}>{label}</label>
        <Input
          type="text"
          name={name}
          id={id}
          value={productToEdit[name]}
          onChange={onChangeEditHandler}
        />
        <ErrorMessage msg={""} />
      </div>
    );
  };

  return (
    <>
      <Btn width="w-fit" className=" bg-indigo-700" onClick={open}>
        Add
      </Btn>
      <div className="border-2 border-amber-400 grid grid-cols-1 md:grid-cols-4 gap-2.5">
        {renderProductList}
      </div>
      {/* Add Product Modal */}
      <Modal isOpen={isOpen} close={close} title="Add A New product">
        <form onSubmit={submitHandler}>
          {formInputs}
          <Select
            selected={selectedCategory}
            setSelected={setSelectedCategory}
          />
          <div className="flex flex-row items-center my-4 space-x-2">
            {renderColors}
          </div>
          <div className="flex flex-row items-center my-4 space-x-2">
            {tempColors.map((color) => (
              <span
                key={color}
                className="text-white p-1 m-1 text-xs rounded-md"
                style={{ backgroundColor: color }}
              >
                {color}
              </span>
            ))}
          </div>

          <div className="flex justify-between items-center space-x-2 mt-5">
            <Btn className=" bg-indigo-700">Submit</Btn>
            <Btn onClick={OnCancle} className=" bg-gray-400 hover:bg-gray-600">
              Cancel
            </Btn>
          </div>
        </form>
      </Modal>

      {/* Edit product Modal */}
      <Modal
        isOpen={isOpenEditModal}
        close={OnCancleEdit}
        title="Edit This product"
      >
        <form onSubmit={submitEditHandler}>
          {renderProductEditWithErrorMsg("title", "Product Title", "title")}
          {renderProductEditWithErrorMsg(
            "description",
            "Product Description",
            "description"
          )}
          {renderProductEditWithErrorMsg(
            "imageURL",
            "Product Image URL",
            "imageURL"
          )}
          {renderProductEditWithErrorMsg("price", "Product Price", "price")}
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
