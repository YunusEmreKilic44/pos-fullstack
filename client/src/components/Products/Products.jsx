import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import Add from "./Add";
import { useNavigate } from "react-router-dom";

const Products = ({ categories, filtered, products, setProducts }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="product-wrapper grid gap-4 grid-cols-[repeat(auto-fill,minmax(150px,1fr))]">
      {filtered.map((item) => (
        <ProductItem item={item} key={item._id} />
      ))}

      <div
        onClick={() => setIsAddModalOpen(true)}
        className="product-item border hover:shadow-lg cursor-pointer transition-all select-none bg-purple-800 flex justify-center items-center hover:opacity-90 min-h-[180px]"
      >
        <PlusOutlined className="text-white! md:text-2xl" />
      </div>

      <div
        className="product-item border hover:shadow-lg cursor-pointer transition-all select-none bg-orange-800 flex justify-center items-center hover:opacity-90 min-h-[180px]"
        onClick={() => navigate("/products")}
      >
        <EditOutlined className="text-white! md:text-2xl" />
      </div>
      <Add
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
        categories={categories}
        products={products}
        setProducts={setProducts}
      />
    </div>
  );
};

export default Products;
