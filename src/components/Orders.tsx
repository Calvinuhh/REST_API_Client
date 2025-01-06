import { useEffect, useState } from "react";
import axios from "../axios/config";
import { AxiosError } from "axios";
import Swal from "sweetalert2";
import loading_gif from "/loading_gif.gif";
import delete_btn from "/borrar.png";
import newIcon from "/new-order.png";
import { Link } from "react-router-dom";

interface Client {
  name: string;
  email: string;
  phone: string;
}

interface Product {
  product: {
    name: string;
  };
  amount: number;
}

interface Order {
  _id: string;
  client: Client;
  products: Product[];
  total: number;
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get("/orders?names=true");
        setOrders(data);
        setLoading(false);
      } catch (error) {
        setError("No orders were found.");
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    });

    if (result.isConfirmed) {
      try {
        const { data } = await axios.delete(`/orders/${id}`);
        Swal.fire({
          icon: "success",
          title: "Order Deleted",
          text: data,
        });
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order._id !== id)
        );
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: String((error as AxiosError).response?.data),
        });
      }
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-[30px] flex justify-end items-center">
        <Link to="/new/order">
          <img
            src={newIcon}
            alt="new_icon"
            className="w-[50px] cursor-pointer transition-all ease-in-out duration-[0.2s] hover:scale-[1.2]"
          />
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <img src={loading_gif} alt="Loading..." className="w-[400px]" />
        </div>
      ) : error ? (
        <p className="text-center text-gray-700">{error}</p>
      ) : (
        <div
          className={`flex flex-wrap gap-10 mb-[200px] ${
            orders.length < 4 ? "justify-center" : "justify-start"
          }`}
        >
          {orders.map((order) => (
            <div
              key={order._id}
              className="border rounded-lg p-6 bg-white shadow-md min-w-[250px] flex-grow relative"
            >
              <button
                onClick={() => handleDelete(order._id)}
                className="absolute top-2 right-2 p-2 text-red-500 hover:text-red-700"
              >
                <img
                  src={delete_btn}
                  alt="delete_btn"
                  className="w-[30px] cursor-pointer"
                />
              </button>

              <h2 className="text-xl font-semibold mb-4 font-roboto">
                Products:{" "}
                {order.products
                  .map(
                    (product) => `${product.product.name} (${product.amount})`
                  )
                  .join(", ")}
              </h2>
              <p className="text-gray-700 mb-2">Total: ${order.total}</p>
              <p className="text-gray-700 mb-2">Client: {order.client.name}</p>
              <p className="text-gray-700 mb-2">Email: {order.client.email}</p>
              <p className="text-gray-700">Phone: {order.client.phone}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
