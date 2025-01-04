import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AuthLayouts = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/main", { replace: true });
    }
  }, [navigate]);

  return (
    <div className=" bg-gradient-to-r from-[#a2ddac] to-[#F2F2F2] min-h-screen">
      <Outlet />
    </div>
  );
};

export default AuthLayouts;
