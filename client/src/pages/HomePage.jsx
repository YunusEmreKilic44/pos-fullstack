import Categories from "../components/Categories/Categories";
import Products from "../components/Products/Products";
import CartTotals from "../components/Cart/CartTotals";
import Header from "./../components/Header/Header";
import { useState } from "react";
import { useEffect } from "react";

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/categories/get-all");
        const data = await res.json();
        data &&
          setCategories(data.map((item) => ({ ...item, value: item.title })));
      } catch (error) {
        console.log(error);
      }
    };

    getCategories();
  }, []);

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
    <div>
      <Header />
      <div className="home px-6 flex flex-col md:flex-row justify-between gap-10 md:pb-0 pb-24 h-screen">
        <div className="categories overflow-auto max-h-[calc(100vh-112px)] md:pb-10">
          <Categories
            categories={categories}
            setCategories={setCategories}
            setFiltered={setFiltered}
            products={products}
          />
        </div>
        <div className="products flex-8 max-h-[calc(100vh-112px)] overflow-y-auto pb-10">
          <Products
            categories={categories}
            filtered={filtered}
            products={products}
            setProducts={setProducts}
          />
        </div>
        <div className="cart-wrapper min-w-75 md:-mr-6 md:-mt-6 border ">
          <CartTotals />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
