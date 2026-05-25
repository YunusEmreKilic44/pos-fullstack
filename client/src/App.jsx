import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import BillsPage from "./pages/BillsPage";
import CustomersPage from "./pages/CustomersPage";
import StatisticPage from "./pages/StatisticPage";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import ProductPage from "./pages/ProductPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/bills" element={<BillsPage />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/statistic" element={<StatisticPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
