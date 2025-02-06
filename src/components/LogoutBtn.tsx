import { useNavigate } from "react-router-dom";

const LogoutBtn = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("tokenTimestamp");
    //test test
    navigate("/login");
  };

  return (
    <div className="fixed top-10 right-10">
      <button
        className="font-roboto font-black transition-all duration-[0.3s] ease-in-out bg-gradient-to-r from-[#a2ddac] to-[#F2F2F2] text-black shadow-2xl border-2 border-[#4e9c66] py-2 px-4 rounded-[7px] hover:from-[#65c473] hover:to-[#e0e0e0] hover:scale-[1.1]"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default LogoutBtn;
