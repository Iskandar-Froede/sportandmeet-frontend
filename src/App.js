import { useContext } from "react";
import { SessionContext } from "./contexts/Session.Context";
import { NavLink, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import EventsPage from "./pages/EventsPages";
import LoginPage from "./pages/LoginPage";
import Navbar from "./Components/Navbar";
import EventDetailsPage from "./pages/EventDetailsPage";
import EditEventPage from "./pages/EditEventPage";
import PrivateRoute from "./Components/PrivateRoute";
import ProfilePage from "./pages/ProfilePage";

function App() {
  const { isAuthenticated } = useContext(SessionContext);
  console.log(isAuthenticated);

  return (
    <div className="App">
      {isAuthenticated ? (
        <NavLink to="/events">events</NavLink>
      ) : (
        <NavLink to="/login"></NavLink>
      )}
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route
          path="/events"
          element={
            <PrivateRoute>
              <EventsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/events/:Id"
          element={
            <PrivateRoute>
              <EventDetailsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/events/edit/:Id"
          element={
            <PrivateRoute>
              <EditEventPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
