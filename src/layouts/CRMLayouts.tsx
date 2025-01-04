import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios/config";

const CRMLayouts = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const petition = async () => {
      try {
        const { data } = await axios("/user");
        localStorage.setItem("user", JSON.stringify(data.name));
      } catch (error) {
        navigate("/login", { replace: true });
        localStorage.removeItem("user");
      }
    };

    petition();
  }, [navigate]);

  return (
    <div className=" min-h-screen bg-gradient-to-b from-[#6279c4] to-[#f9fafb]">
      <Outlet />
    </div>
  );
};

export default CRMLayouts;
