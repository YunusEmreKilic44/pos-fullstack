import { useEffect, useState } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products/get-all");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, []);

  return (
    <div className="product-wrapper grid gap-4 grid-cols-[repeat(auto-fill,minmax(150px,1fr))]">
      {products.map((item) => (
        <div
          key={item._id}
          className="product-item border hover:shadow-lg cursor-pointer transition-all select-none"
        >
          <div className="product-image">
            <img
              src={item.img}
              alt={item.title}
              className="h-28 object-cover w-full border-b"
            />
          </div>
          <div className="product-info flex flex-col p-3">
            <span className="font-bold">{item.title}</span>
            <span>{item.price}₺</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
