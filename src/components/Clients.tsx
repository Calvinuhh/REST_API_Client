import { useEffect, useState } from "react";
import axios from "../axios/config";

interface Client {
  _id: string;
  name: string;
  lastname: string;
  email: string;
  phone: string;
}

const Clients = () => {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const { data } = await axios.get("/clients");
        setClients(data);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    fetchClients();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
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
    </div>
  );
};

export default Clients;
