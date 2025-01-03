import { useState } from "react";
import "./Nav.css";

interface NavProps {
  onNavChange: (button: string) => void;
}

const Nav = ({ onNavChange }: NavProps) => {
  const [activeButton, setActiveButton] = useState("Clients");

  const handleNavChange = (button: string) => {
    setActiveButton(button);
    onNavChange(button);
  };

  return (
    <nav className="nav-container">
      <div className={`nav-item ${activeButton === "Clients" ? "active" : ""}`}>
        <img
          className="nav-image"
          src="/clients.png"
          alt="logo"
          onClick={() => handleNavChange("Clients")}
        />
        <button
          onClick={() => handleNavChange("Clients")}
          disabled={activeButton === "Clients"}
        >
          Clients
        </button>
      </div>

      <div
        className={`nav-item ${activeButton === "Products" ? "active" : ""}`}
      >
        <img
          className="nav-image"
          src="/products.png"
          alt="logo"
          onClick={() => handleNavChange("Products")}
        />
        <button
          onClick={() => handleNavChange("Products")}
          disabled={activeButton === "Products"}
        >
          Products
        </button>
      </div>

      <div className={`nav-item ${activeButton === "Orders" ? "active" : ""}`}>
        <img
          className="nav-image"
          src="/orders.png"
          alt="logo"
          onClick={() => handleNavChange("Orders")}
        />
        <button
          onClick={() => handleNavChange("Orders")}
          disabled={activeButton === "Orders"}
        >
          Orders
        </button>
      </div>

      <div
        className={`nav-indicator ${activeButton.toLowerCase()} ${activeButton.toLowerCase()}-color`}
      ></div>
    </nav>
  );
};

export default Nav;
