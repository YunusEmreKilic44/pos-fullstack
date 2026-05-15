import Categories from "../components/Categories/Categories";
import Products from "../components/Products/Products";
import CartTotals from "../components/Cart/CartTotals";
import Header from "./../components/Header/Header";

const HomePage = () => {
  return (
    <div>
      <Header />
      <div className="home px-6 flex flex-col md:flex-row justify-between gap-10 md:pb-0 pb-24">
        <div className="categories overflow-auto max-h-[calc(100vh--112px)] md:pb-10  ">
          <Categories />
        </div>
        <div className="products flex-8 max-h-[calc(100vh--112px)] overflow-y-auto pb-10">
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
