import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios/config";
import LogoutBtn from "../components/LogoutBtn";
import Nav from "../components/Nav";

const CRMLayouts = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const petition = async () => {
      try {
        const { data } = await axios("/user");
        localStorage.setItem("user", JSON.stringify(data));
      } catch (error) {
        navigate("/login", { replace: true });
      } finally {
        setTimeout(() => {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
        }, 120000);
        
      }
    };

    petition();
  }, [navigate]);

  useEffect(() => {
    setTimeout(() => {
      const user = localStorage.getItem("user");

      if (user) {
        const { name } = JSON.parse(user);
        setUserName(name);
      }
    }, 1500);
  }, []);

  return (
    <div className=" min-h-screen bg-gradient-to-b from-[#6279c4] to-[#f9fafb]">
      <div className="p-5">
        <div className="header flex justify-between items-center">
          <div className="text-left">
            <h1 className="text-xl font-bold font-roboto">
              {userName === null
                ? "Loading..."
                : `Hi ${userName}! Manage your resources!`}
            </h1>
          </div>
          <LogoutBtn />
        </div>
        <Nav />
        <Outlet />
      </div>
    </div>
  );
};

export default CRMLayouts;
