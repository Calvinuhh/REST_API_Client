import { useState, useEffect } from "react";
import Clients from "../components/Clients";
import Products from "../components/Products";
import Orders from "../components/Orders";
import Nav from "../components/Nav";
import LogoutBtn from "../components/LogoutBtn";

const Main = () => {
  const [activeComponent, setActiveComponent] = useState("Clients");
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    setInterval(() => {
      const user = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user") as string)
        : null;
      if (user) {
        setUserName(user);
      }
    }, 1000);
  }, []);

  const renderComponent = () => {
    switch (activeComponent) {
      case "Clients":
        return <Clients />;
      case "Products":
        return <Products />;
      case "Orders":
        return <Orders />;
      default:
        return <Clients />;
    }
  };

  return (
    <div className="p-5">
      <div className="header flex justify-between items-center">
        <div className="text-left">
          <h1 className="text-xl font-bold">
            {userName === null
              ? "Cargando..."
              : `Hola, ${userName}! Administra tus recursos!`}
          </h1>
        </div>
        <LogoutBtn />
      </div>
      <Nav onNavChange={setActiveComponent} />
      <main>{renderComponent()}</main>
    </div>
  );
};

export default Main;
