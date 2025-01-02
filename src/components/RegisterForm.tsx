import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AxiosError } from "axios";
import loading_gif from "/loading_gif.gif";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
      String(email).toLowerCase()
    );
  };

  const validatePassword = (password: string) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/.test(
      password
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    let errors = { email: "", password: "", confirmPassword: "" };

    if (!validateEmail(email)) {
      errors.email = "Invalid Email format";
      valid = false;
    }

    if (!validatePassword(password)) {
      errors.password =
        "Password must be at least 6 characters long, upper and lower case, one number and one special character.";
      valid = false;
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "Las contraseñas no coinciden";
      valid = false;
    }

    setErrors(errors);

    if (valid) {
      setIsLoading(true);
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/register`,
          {
            email,
            password,
          }
        );

        Swal.fire({
          icon: "success",
          title: "User created",
          text: data,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: String((error as AxiosError).response?.data),
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center max-w-[700px] rounded-[8px] shadow-2xl mx-auto p-6 mt-[100px] mb-[150px]
    bg-gradient-to-b from-black/10 to-black/30 backdrop-blur-md "
    >
      <div className=" mb-[80px] mt-[15px]">
        <h1 className=" font-roboto font-black text-[30px] ">Register</h1>
      </div>

      <div className=" flex flex-col justify-center items-center gap-2 w-[600px] max-w-[100%] mb-[40px] ">
        <label htmlFor="email" className="text-[20px] font-roboto">
          Email
        </label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className=" p-2 rounded-[8px] w-[70%] mb-4 font-roboto shadow-2xl"
        />
        {errors.email && <p className="text-red-500">{errors.email}</p>}
      </div>

      <div className=" flex flex-col justify-center items-center gap-2 w-[600px] max-w-[100%] mb-[40px]">
        <label htmlFor="password" className="text-[20px] font-roboto">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className=" p-2 rounded-[8px] font-roboto w-[70%] mb-4  shadow-2xl"
        />
        {errors.password && <p className="text-red-500">{errors.password}</p>}
      </div>

      <div className=" flex flex-col justify-center items-center gap-2  w-[600px] max-w-[100%] mb-[100px]">
        <label htmlFor="confirm_password" className="text-[20px] font-roboto">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirm_password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className=" p-2 rounded-[8px] font-roboto w-[70%] mb-4 shadow-2xl"
        />
        {errors.confirmPassword && (
          <p className="text-red-500">{errors.confirmPassword}</p>
        )}
      </div>

      {isLoading ? (
        <img
          src={loading_gif}
          alt="Loading..."
          className="w-[600px] h-[91px]"
        />
      ) : (
        <input
          type="submit"
          value="Send"
          className=" font-roboto bg-blue-400 mb-[50px] p-2 w-[200px] shadow-2xl shadow-blue-600/50 rounded-[7px] border border-blue-500 font-bold cursor-pointer transition-all duration-[0.15s] hover:bg-blue-500 hover:scale-[1.1] hover:shadow-blue-700/70"
        />
      )}
    </form>
  );
};

export default RegisterForm;