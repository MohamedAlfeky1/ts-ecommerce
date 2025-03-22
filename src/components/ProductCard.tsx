import { IProduct } from "../interfaces";
import { textSlicer } from "../utils/functions";
import Image from "./Image";
import Btn from "./Ui/Btn";

interface Iprops {
  product: IProduct;
}

function ProductsCard({ product }: Iprops) {
  // ** Easy way to not use product.someThing by Using Destruction
  const { imageURL, description, title, category } = product;
  return (
    <div className="max-w-sm md:max-w-lg mx-auto md:mx-0 border rounded-md p-2 flex flex-col">
      <Image imageUrl={imageURL} alt={category.name} className="rounded-md" />
      <h3>{title}</h3>
      <p>{textSlicer(description)}</p>
      <div className="flex flex-row items-center my-4 space-x-2">
        {" "}
        <span className="w-5 h-5 bg-amber-900 rounded-full cursor-pointer"></span>
        <span className="w-5 h-5 bg-amber-400 rounded-full cursor-pointer"></span>
        <span className="w-5 h-5 bg-blue-500 rounded-full cursor-pointer"></span>
      </div>
      <div className="flex justify-between items-center">
        <span>$50,000</span>
        <Image
          imageUrl="https://images.pexels.com/photos/29822098/pexels-photo-29822098/free-photo-of-beautiful-bouquet-arrangement-in-sunlight.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
          alt={category.name}
          className="w-10 h-10 rounded-full"
        />
      </div>
      <div className="flex justify-between items-center space-x-2 mt-5">
        <Btn
          className=" bg-indigo-700"
          onClick={() => {
            console.log("Clicked");
          }}
        >
          Edit
        </Btn>
        <Btn className=" bg-red-700">DELETE</Btn>
      </div>
    </div>
  );
}

export default ProductsCard;
