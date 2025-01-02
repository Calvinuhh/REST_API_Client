import { Outlet } from "react-router-dom";

const AuthLayouts = () => {
  return (
    <div className=" bg-gradient-to-r from-[#a2ddac] to-[#F2F2F2] min-h-screen">
      <Outlet />
    </div>
  );
};

export default AuthLayouts;
