import { useState, useEffect } from "react";
import axios from "../axios/config";
import Swal from "sweetalert2";
import loading_gif from "/loading_gif.gif";
import back_btn from "/back.png";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";

interface Client {
  _id: string;
  name: string;
}

interface Product {
  _id: string;
  name: string;
}

const NewOrder = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<
    { product: string; amount: number }[]
  >([{ product: "", amount: 1 }]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchClientsAndProducts = async () => {
      try {
        const clientsData = await axios.get("/clients");
        const productsData = await axios.get("/products");
        setClients(clientsData.data);
        setProducts(productsData.data);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch clients or products.",
        });
      }
    };

    fetchClientsAndProducts();
  }, []);

  const handleProductChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const updatedProducts = [...selectedProducts];
    updatedProducts[index] = { ...updatedProducts[index], [field]: value };
    setSelectedProducts(updatedProducts);
  };

  const addProductField = () => {
    setSelectedProducts([...selectedProducts, { product: "", amount: 1 }]);
  };

  const removeProductField = (index: number) => {
    const updatedProducts = selectedProducts.filter((_, i) => i !== index);
    setSelectedProducts(updatedProducts);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedClient) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please select a client.",
      });
      return;
    }

    if (selectedProducts.some((p) => !p.product || p.amount <= 0)) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please select valid products and amounts.",
      });
      return;
    }

    try {
      setLoading(true);
      const user = localStorage.getItem("user");

      if (user) {
        const { _id } = JSON.parse(user);

        const { data } = await axios.post("/orders", {
          client: selectedClient,
          products: selectedProducts,
          userId: _id,
        });

        Swal.fire({
          icon: "success",
          title: "Order Created",
          text: data,
        });
        setSelectedClient("");
        setSelectedProducts([{ product: "", amount: 1 }]);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: String((error as AxiosError).response?.data),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3">
      <Link
        to="/orders"
        className="absolute top-20 left-28 transition-all duration-[0.1s] ease-out hover:scale-[1.2]"
      >
        <img src={back_btn} alt="Back" className="w-8 h-8 cursor-pointer" />
      </Link>

      <div className="p-6 max-w-md mx-auto mt-[120px] bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-6 text-center font-roboto">
          Create New Order
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="client"
              className="block text-sm font-medium text-gray-700 font-roboto"
            >
              Client
            </label>
            <select
              id="client"
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-roboto"
            >
              <option value="">Select a client</option>
              {clients.map((client) => (
                <option key={client._id} value={client._id}>
                  {client.name}
                </option>
              ))}
            </select>
          </div>
          {selectedProducts.map((product, index) => (
            <div key={index} className="flex space-x-2">
              <div className="flex-1">
                <label
                  htmlFor={`product-${index}`}
                  className="block text-sm font-medium text-gray-700 font-roboto"
                >
                  Product
                </label>
                <select
                  id={`product-${index}`}
                  value={product.product}
                  onChange={(e) =>
                    handleProductChange(index, "product", e.target.value)
                  }
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-roboto"
                >
                  <option value="">Select a product</option>
                  {products.map((product) => (
                    <option key={product._id} value={product._id}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label
                  htmlFor={`amount-${index}`}
                  className="block text-sm font-medium text-gray-700 font-roboto"
                >
                  Amount
                </label>
                <input
                  type="number"
                  id={`amount-${index}`}
                  value={product.amount}
                  onChange={(e) =>
                    handleProductChange(
                      index,
                      "amount",
                      parseInt(e.target.value)
                    )
                  }
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-roboto"
                  min="1"
                />
              </div>
              <button
                type="button"
                onClick={() => removeProductField(index)}
                className="self-end p-2 text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addProductField}
            className="w-full bg-green-500 text-white py-2 px-4 rounded-lg transition-all duration-[0.2s] ease-in-out hover:scale-[1.03] hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-700 font-roboto"
          >
            Add Product
          </button>
          {loading ? (
            <img
              src={loading_gif}
              alt="Loading..."
              className="w-[200px] mx-auto "
            />
          ) : (
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg transition-all duration-[0.2s] ease-in-out hover:scale-[1.03] hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700 font-roboto"
            >
              Create Order
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default NewOrder;
