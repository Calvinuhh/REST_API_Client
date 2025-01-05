import { Routes, Route } from "react-router-dom";
import AuthLayouts from "./layouts/AuthLayouts";
import CRMLayouts from "./layouts/CRMLayouts";
import DefaultLayout from "./layouts/DefaultLayout";
import Main from "./views/Main";
import Register from "./views/Register";
import Login from "./views/Login";
import NewClient from "./components/NewClient";
import NewProduct from "./components/NewProduct";
import NewOrder from "./components/NewOrder";
import EditClient from "./components/EditClient";
import EditProduct from "./components/EditProduct";

function App() {
  return (
    <>
      <Routes>
        <Route element={<AuthLayouts />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<CRMLayouts />}>
          <Route path="/main" element={<Main />}></Route>
        </Route>

        <Route path="/new" element={<DefaultLayout />}>
          <Route path="client" element={<NewClient />} />
          <Route path="product" element={<NewProduct />} />
          <Route path="order" element={<NewOrder />} />
        </Route>

        <Route path="/edit" element={<DefaultLayout />}>
          <Route path="client" element={<EditClient />} />
          <Route path="product" element={<EditProduct />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
