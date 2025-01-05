import { useState } from "react";
import axios from "../axios/config";
import Swal from "sweetalert2";
import loading_gif from "/loading_gif.gif";
import back_btn from "/back.png";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";

const NewClient = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    lastname: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  const validateName = (name: string) => /^[a-zA-ZñÑ\s]+$/.test(name);
  const validateEmail = (email: string) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  const validatePhone = (phone: string) => /^[0-9+\s]+$/.test(phone);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      name: "",
      lastname: "",
      email: "",
      phone: "",
    };

    let isValid = true;

    if (!formData.name) {
      newErrors.name = "Name is required.";
      isValid = false;
    } else if (formData.name.length < 2 || formData.name.length > 100) {
      newErrors.name = "The name must have at least 2 characters";
      isValid = false;
    } else if (!validateName(formData.name)) {
      newErrors.name =
        "Name must contain only letters and spaces, no numbers or special characters.";
      isValid = false;
    }

    if (!formData.lastname) {
      newErrors.lastname = "Lastname is required.";
      isValid = false;
    } else if (formData.lastname.length < 2 || formData.lastname.length > 100) {
      newErrors.lastname = "The lastname must have at least 2 characters";
      isValid = false;
    } else if (!validateName(formData.lastname)) {
      newErrors.lastname =
        "Lastname must contain only letters and spaces, no numbers or special characters.";
      isValid = false;
    }

    if (!formData.email) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format.";
      isValid = false;
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required.";
      isValid = false;
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone =
        "Phone number must contain only numbers and '+' symbol.";
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) return;

    try {
      setLoading(true);
      const user = localStorage.getItem("user");

      if (user) {
        const { _id } = JSON.parse(user);

        const { data } = await axios.post("/clients", {
          name: formData.name,
          lastname: formData.lastname,
          email: formData.email,
          phone: formData.phone,
          userId: _id,
        });

        Swal.fire({
          icon: "success",
          title: "Client Created",
          text: data,
        });
        setFormData({
          name: "",
          lastname: "",
          email: "",
          phone: "",
        });
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
        to="/main"
        className="absolute top-20 left-28 transition-all duration-[0.1s] ease-out hover:scale-[1.2]"
      >
        <img src={back_btn} alt="Back" className="w-8 h-8 cursor-pointer" />
      </Link>

      <div className="p-6 max-w-md mx-auto mt-[120px] bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-6 text-center font-roboto">
          Create New Client
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 font-roboto"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-roboto"
            />
            {errors.name && <p className="text-red-500">{errors.name}</p>}
          </div>
          <div>
            <label
              htmlFor="lastname"
              className="block text-sm font-medium text-gray-700 font-roboto"
            >
              Lastname
            </label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-roboto"
            />
            {errors.lastname && (
              <p className="text-red-500">{errors.lastname}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 font-roboto"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-roboto"
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 font-roboto"
            >
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-roboto"
            />
            {errors.phone && <p className="text-red-500">{errors.phone}</p>}
          </div>
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
              Create Client
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default NewClient;
