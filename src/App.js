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

function App() {
  //  const { isAuthenticated } = useContext(SessionContext);
  //  console.log(isAuthenticated);

  return (
    <div className="App">
      {/*      {isAuthenticated ? (
        <NavLink to="/events">Events</NavLink>
      ) : (
        <NavLink to="/login">Login</NavLink>
      )}
*/}
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/events"
          element={
            <PrivateRoute>
              <EventsPage />
            </PrivateRoute>
          }
        />
        <Route path="/events/:Id" element={<EventDetailsPage />} />
        <Route path="/events/edit/:Id" element={<EditEventPage />} />
      </Routes>
    </div>
  );
}

export default App;
