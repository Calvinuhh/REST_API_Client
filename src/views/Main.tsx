import { useState } from "react";
import Clients from "../components/Clients";
import Products from "../components/Products";
import Orders from "../components/Orders";
import Nav from "../components/Nav";
import LogoutBtn from "../components/LogoutBtn";

const Main = () => {
  const [activeComponent, setActiveComponent] = useState("Clients");

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
      <div className="header">
        <LogoutBtn />
      </div>
      <Nav onNavChange={setActiveComponent} />
      <main>{renderComponent()}</main>
    </div>
  );
};

export default Main;
