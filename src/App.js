import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { NavLink, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignupPage from "./pages/Signup";
import EventsPage from "./pages/Events";

function App() {
  const { isAuthenticated } = useContext(SessionContext);

  return (
    <div className="App">
      {isAuthenticated ? (
        <NavLink to="/beers">Beers</NavLink>
      ) : (
        <NavLink to="/login">Login</NavLink>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/events"
          element={
            <PrivateRoute>
              <EventsPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
