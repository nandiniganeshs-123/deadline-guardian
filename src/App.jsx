import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "./context/AuthContext";

import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import AddTask from "./pages/AddTask";
import AIPlanner from "./pages/AIPlanner";
import Rescheduler from "./pages/Rescheduler";
import Login from "./pages/Login";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      {user && <Navbar />}

      <Routes>
        <Route
          path="/login"
          element={
            user ? <Navigate to="/" /> : <Login />
          }
        />

        <Route
          path="/"
          element={
            user ? <Dashboard /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/add-task"
          element={
            user ? <AddTask /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/ai-planner"
          element={
            user ? <AIPlanner /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/rescheduler"
          element={
            user ? <Rescheduler /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;