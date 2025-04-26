import { useState } from "react";
import { IProduct } from "../interfaces";
import { textSlicer } from "../utils/functions";
import CircleColor from "./CircleColor";
import Image from "./Image";
import Btn from "./Ui/Btn";
import Modal from "./Ui/Modal";
import toast from "react-hot-toast";

interface Iprops {
  product: IProduct;
  setProducts: (products: IProduct[]) => void;
  colors: string[];
  setProductToEdit: (product: IProduct) => void;
  openEditModal: () => void;
  setproductToEditIdx: (value: number) => void;
  productToEditIdx: number;
  products: IProduct[];
}

function ProductsCard({
  product,
  setProductToEdit,
  openEditModal,
  setproductToEditIdx,
  productToEditIdx,
  setProducts,
  products,
}: Iprops) {
  // ** Easy way to not use product.someThing by Using Destruction
  const { imageURL, description, title, colors, category, id, price } = product;
  const [isModalOpend, setIsModalOpend] = useState(false);

  const renderColors = colors.map((color) => (
    <CircleColor key={color} color={color} />
  ));

  const onEdit = () => {
    setProductToEdit(product);
    openEditModal();
    setproductToEditIdx(productToEditIdx);
  };

  const onRemove = () => {
    setProductToEdit(product);
    setIsModalOpend(true);
  };

  const close = () => {
    setIsModalOpend(false);
  };

  const onDeleteProduct = () => {
    const filtered = products.filter((product) => product.id !== id);
    setProducts(filtered);
    toast.success("Successfully Deleted!");
  };
  return (
    <div className="max-w-sm mx-auto bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <Image
        imageUrl={imageURL}
        alt={category.name}
        className="w-full h-48 object-cover"
      />

      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600 text-sm mb-4">{textSlicer(description)}</p>

        <div className="flex flex-wrap items-center gap-2 mb-4 min-h-[40px]">
          {renderColors.length > 0 ? (
            renderColors
          ) : (
            <span>No Colors Selected</span>
          )}
        </div>

        <div className="flex justify-between items-center mt-auto mb-2">
          <span className="font-semibold text-lg text-indigo-700">
            ${price}
          </span>
          <Image
            imageUrl={category.imageURL}
            alt={category.name}
            className="w-10 h-10 rounded-full"
          />
        </div>
      </div>

      <div className="flex justify-between items-center space-x-2 px-4 pb-4 mt-2">
        <Btn className="w-full bg-indigo-700" onClick={onEdit}>
          Edit
        </Btn>
        <Btn className="w-full bg-red-700" onClick={onRemove}>
          Delete
        </Btn>
      </div>

      <Modal
        isOpen={isModalOpend}
        close={close}
        title="Are you sure you want to delete this product?"
      >
        <h5>
          Deleting this product will permanently remove it and all associated
          information from the system. This action cannot be undone. Please
          confirm if you wish to proceed with deletion.
        </h5>
        <div className="flex mt-4 space-x-2">
          <Btn className="w-full bg-indigo-700" onClick={onDeleteProduct}>
            Yes
          </Btn>
          <Btn className="w-full bg-red-700" onClick={close}>
            No
          </Btn>
        </div>
      </Modal>
    </div>
  );
}

export default ProductsCard;
