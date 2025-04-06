import { IProduct } from "../interfaces";
import { textSlicer } from "../utils/functions";
import CircleColor from "./CircleColor";
import Image from "./Image";
import Btn from "./Ui/Btn";

interface Iprops {
  product: IProduct;
  colors: string[];
  setProductToEdit: (product: IProduct) => void;
  openEditModal: () => void;
}

function ProductsCard({ product, setProductToEdit, openEditModal }: Iprops) {
  // ** Easy way to not use product.someThing by Using Destruction
  const { imageURL, description, title, colors, category } = product;
  console.log(product);

  const renderColors = colors.map((color) => (
    <CircleColor key={color} color={color} />
  ));

  const onEdit = () => {
    setProductToEdit(product);
    openEditModal();
  };
  return (
    <div className="max-w-sm md:max-w-lg mx-auto md:mx-0 border rounded-md p-2 flex flex-col">
      <Image imageUrl={imageURL} alt={category.name} className="rounded-md" />
      <h3>{title}</h3>
      <p>{textSlicer(description)}</p>

      <div className="flex flex-row items-center my-4 space-x-2 flex-wrap">
        {renderColors}
      </div>
      <div className="flex justify-between items-center">
        <span>$50,000</span>
        <Image
          imageUrl={category.imageURL}
          alt={category.name}
          className="w-10 h-10 rounded-full"
        />
      </div>
      <div className="flex justify-between items-center space-x-2 mt-5">
        <Btn className=" bg-indigo-700" onClick={onEdit}>
          Edit
        </Btn>
        <Btn className=" bg-red-700">Cancel</Btn>
      </div>
    </div>
  );
}

export default ProductsCard;
