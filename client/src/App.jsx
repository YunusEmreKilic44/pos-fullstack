import Header from "./components/Header/Header";

const App = () => {
  return (
    <>
      <Header />
      <div className="home px-6 flex justify-between">
        <div className="categories">
          <div>Categories</div>
        </div>
        <div className="products">
          <div>Products</div>
        </div>
        <div className="">
          <div>Cart</div>
        </div>
      </div>
    </>
  );
};

export default App;
