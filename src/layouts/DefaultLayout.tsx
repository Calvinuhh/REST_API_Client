import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  return (
    <div className=" min-h-screen bg-gradient-to-b from-[#6279c4] to-[#f9fafb]">
      <Outlet />
    </div>
  );
};

export default DefaultLayout;
