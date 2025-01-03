import { Routes, Route } from "react-router-dom";
import AuthLayouts from "./layouts/AuthLayouts";
import CRMLayouts from "./layouts/CRMLayouts";
import Main from "./views/Main";
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
          <Route path="/main" element={<Main />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
