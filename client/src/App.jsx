import CartTotals from "./components/Cart/CartTotals";
import Categories from "./components/Categories/Categories";
import Header from "./components/Header/Header";
import Products from "./components/Products/Products";

const App = () => {
  return (
    <>
      <Header />
      <div className="home px-6 flex justify-between gap-10">
        <div className="categories overflow-auto max-h-[calc(100vh--112px)] pb-64">
          <Categories />
        </div>
        <div className="products flex-8">
          <Products />
        </div>
        <div className="cart-wrapper min-w-75 md:-mr-6 md:-mt-6 border">
          <CartTotals />
        </div>
      </div>
    </>
  );
};

export default App;
