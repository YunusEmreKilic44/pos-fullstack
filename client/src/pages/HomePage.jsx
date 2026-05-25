import Categories from "../components/Categories/Categories";
import Products from "../components/Products/Products";
import CartTotals from "../components/Cart/CartTotals";
import Header from "./../components/Header/Header";
import { useState } from "react";
import { useEffect } from "react";

const HomePage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/categories/get-all");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    };

    getCategories();
  }, []);

  return (
    <div>
      <Header />
      <div className="home px-6 flex flex-col md:flex-row justify-between gap-10 md:pb-0 pb-24">
        <div className="categories overflow-auto max-h-[calc(100vh-112px)] md:pb-10">
          <Categories categories={categories} setCategories={setCategories} />
        </div>
        <div className="products flex-8 max-h-[calc(100vh-112px)] overflow-y-auto pb-10">
          <Products />
        </div>
        <div className="cart-wrapper min-w-75 md:-mr-6 md:-mt-6 border ">
          <CartTotals />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
