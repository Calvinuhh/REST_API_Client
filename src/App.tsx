import { Routes, Route } from "react-router-dom";
import AuthLayouts from "./layouts/AuthLayouts";
import CRMLayouts from "./layouts/CRMLayouts";
import NewItemLayout from "./layouts/NewItemLayout";
import Register from "./views/Register";
import Login from "./views/Login";
import NewClient from "./components/NewClient";
import NewProduct from "./components/NewProduct";
import NewOrder from "./components/NewOrder";
import Clients from "./components/Clients";
import Products from "./components/Products";
import Orders from "./components/Orders";

function App() {
  return (
    <>
      <Routes>
        <Route element={<AuthLayouts />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>

        <Route path="/" element={<CRMLayouts />}>
          <Route path="clients" element={<Clients />}></Route>
          <Route path="products" element={<Products />}></Route>
          <Route path="orders" element={<Orders />}></Route>
        </Route>

        <Route path="/new" element={<NewItemLayout />}>
          <Route path="client" element={<NewClient />} />
          <Route path="product" element={<NewProduct />} />
          <Route path="order" element={<NewOrder />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
