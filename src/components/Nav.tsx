import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Nav = () => {
  const location = useLocation();
  const [activeButton, setActiveButton] = useState(location.pathname);

  const handleNavChange = (button: string) => {
    setActiveButton(button);
  };

  return (
    <nav className="relative flex w-[500px] justify-between mx-auto mt-[100px] items-center font-roboto h-[100px] mb-[70px]">
      <Link
        to="/clients"
        className={`flex flex-col items-center transition-all ease-in duration-[0.1s] hover:scale-[1.1] ${
          activeButton === "/clients" ? "pointer-events-none" : ""
        }`}
        onClick={() => handleNavChange("/clients")}
      >
        <img className="w-[90px]" src="/clients.png" alt="logo" />
        <h2>Clients</h2>
      </Link>

      <Link
        to="/products"
        className={`flex flex-col items-center transition-all ease-in duration-[0.1s] hover:scale-[1.1] ${
          activeButton === "/products" ? "pointer-events-none" : ""
        }`}
        onClick={() => handleNavChange("/products")}
      >
        <img className="w-[100px]" src="/products.png" alt="logo" />
        <h2>Products</h2>
      </Link>

      <Link
        to="/orders"
        className={`flex flex-col items-center transition-all ease-in duration-[0.1s] hover:scale-[1.1] ${
          activeButton === "/orders" ? "pointer-events-none" : ""
        }`}
        onClick={() => handleNavChange("/orders")}
      >
        <img className="w-[100px]" src="/orders.png" alt="logo" />
        <h2>Orders</h2>
      </Link>

      <div
        className={`absolute bottom-0 h-[6px] w-[70px] transition-transform duration-300 ${
          activeButton === "/clients"
            ? "transform translate-x-[10px] translate-y-[20px] bg-[#4dcfe3]"
            : activeButton === "/products"
            ? "transform translate-x-[209px] translate-y-[20px] bg-[#a5c190]"
            : activeButton === "/orders"
            ? "transform translate-x-[417px] translate-y-[20px] bg-[#fd8148]"
            : ""
        }`}
      ></div>
    </nav>
  );
};

export default Nav;
