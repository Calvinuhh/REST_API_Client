import { useEffect, useState } from "react";
import axios from "../axios/config";
import { isAxiosError, AxiosError } from "axios";
import Swal from "sweetalert2";
import newIcon from "/equipo.png";
import { Link } from "react-router-dom";
import delete_btn from "/borrar.png";
import loading_gif from "/loading_gif.gif";

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
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const { data } = await axios.get("/clients");
        setClients(data);
        setFilteredClients(data);
        setLoading(false);
      } catch (error) {
        setError("No clients were found that match your search.");
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  useEffect(() => {
    const filtered = clients.filter((client) =>
      `${client.name} ${client.lastname}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilteredClients(filtered);
  }, [searchTerm, clients]);

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
        const response = await axios.delete(`/clients/${id}`);
        Swal.fire({
          icon: "success",
          title: "Client Deleted",
          text: response.data,
        });
        setClients((prevClients) =>
          prevClients.filter((client) => client._id !== id)
        );
        setFilteredClients((prevFiltered) =>
          prevFiltered.filter((client) => client._id !== id)
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
      <div className="mb-[30px] flex justify-between items-center">
        <input
          type="text"
          placeholder="Search Clients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-[500px] p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-roboto "
        />
        <Link to="/new/client">
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
            filteredClients.length < 4 ? "justify-center" : "justify-start"
          }`}
        >
          {filteredClients.map((client) => (
            <div
              key={client._id}
              className="border rounded-lg p-6 bg-white shadow-md min-w-[250px] flex-grow relative"
            >
              <button
                onClick={() => handleDelete(client._id)}
                className="absolute top-2 right-2 p-2 text-red-500 hover:text-red-700"
              >
                <img
                  src={delete_btn}
                  alt="delete_btn"
                  className="w-[30px] cursor-pointer"
                />
              </button>
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
