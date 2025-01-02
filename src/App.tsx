import { Routes, Route } from "react-router-dom";
import AuthLayouts from "./layouts/AuthLayouts";
import CRMLayouts from "./layouts/CRMLayouts";
import Clients from "./views/Clients";
import Products from "./views/Products";
import Orders from "./views/Orders";
import Register from "./views/Register";
import Login from "./views/Login";

function App() {
  return (
    <>
      <Routes>
        <Route element={<AuthLayouts />}>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<CRMLayouts />}>
          <Route path="/clients" element={<Clients />}></Route>
          <Route path="/products" element={<Products />}></Route>
          <Route path="/orders" element={<Orders />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
