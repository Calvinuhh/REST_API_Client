import { useEffect, useState } from "react";
import axios from "../axios/config";
import { isAxiosError } from "axios";
import Swal from "sweetalert2";

interface Client {
  _id: string;
  name: string;
  lastname: string;
  email: string;
  phone: string;
}

const Clients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const { data } = await axios.get("/clients");
        setClients(data);
      } catch (error) {
        if (isAxiosError(error) && error.response?.status === 400) {
          setError("No hay clientes registrados");
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong with the server, please try again.",
          });
        }
      }
    };

    fetchClients();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {error ? (
        <p className="text-center text-gray-700">{error}</p>
      ) : clients.length === 0 ? (
        <p className="text-center text-gray-700">No hay clientes registrados</p>
      ) : (
        <div
          className={`flex flex-wrap gap-10 ${
            clients.length < 4 ? "justify-center" : "justify-start"
          }`}
        >
          {clients.map((client) => (
            <div
              key={client._id}
              className="border rounded-lg p-6 bg-white shadow-md min-w-[250px] flex-grow"
            >
              <h2 className="text-xl font-semibold mb-4 font-roboto">
                {client.name} {client.lastname}
              </h2>
              <p className="text-gray-700 mb-2">Email: {client.email}</p>
              <p className="text-gray-700">Phone: {client.phone}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Clients;
