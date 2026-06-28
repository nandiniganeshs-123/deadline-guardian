import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";
import { logout } from "../services/authService";

export default function Navbar() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md px-4 md:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <span className="text-3xl">🚀</span>

        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Deadline Guardian AI
        </h1>
      </div>

      <div className="flex flex-wrap justify-center gap-4 text-base md:text-lg font-medium">
        <Link to="/" className="hover:text-purple-600">
          Dashboard
        </Link>

        <Link to="/add-task" className="hover:text-purple-600">
          Add Task
        </Link>

        <Link to="/ai-planner" className="hover:text-purple-600">
          AI Planner
        </Link>

        <Link to="/rescheduler" className="hover:text-purple-600">
          AI Rescheduler
        </Link>

        {user && (
          <>
           

            <span className="font-semibold">
              {user.displayName}
            </span>

            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}