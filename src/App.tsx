import { useState } from "react";
import ProductsCard from "./components/ProductCard";
import Modal from "./components/Ui/Modal";
import { productList } from "./data";
import Btn from "./components/Ui/Btn";

function App() {
  const renderProductList = productList.map((product) => (
    <ProductsCard key={product.id} product={product} />
  ));

  const [isOpen, setIsOpen] = useState(false);
  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  return (
    <>
      <Btn width="w-fit" className=" bg-indigo-700" onClick={open}>
        Add
      </Btn>
      <div className="border-2 border-amber-400 grid grid-cols-1 md:grid-cols-4 gap-2.5">
        {renderProductList}
      </div>
      <Modal isOpen={isOpen} close={close} title="Add A New product">
        <div className="flex justify-between items-center space-x-2 mt-5">
          <Btn className=" bg-indigo-700">Submit</Btn>
          <Btn onClick={close} className=" bg-gray-400 hover:bg-gray-600">
            Cancel
          </Btn>
        </div>
      </Modal>
    </>
  );
}

export default App;
