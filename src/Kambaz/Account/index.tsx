import { Routes, Route, Navigate } from "react-router";
import { Container } from "react-bootstrap";
import Signin from "./Signin";
import Signup from "./Signup";
import Profile from "./Profile";
import AccountNavigation from "./Navigation";
import { useSelector } from "react-redux";
import Users from "./Users";

export default function Account() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  return (
    <Container fluid id="wd-account-screen" className="p-3 d-flex">
      {/* Navigation: fixed width, hidden on small screens */}
      <div
        className="d-none d-md-block" // hidden below md
        style={{ width: "200px", minWidth: "200px", marginRight: "20px" }}
      >
        <AccountNavigation />
      </div>

      {/* Main content: fills remaining space */}
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Navigate to={currentUser ? "/Kambaz/Account/Profile" : "/Kambaz/Account/Signin"} />} />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Users" element={<Users />} />
          <Route path="/Users/:uid" element={<Users />} />
        </Routes>
      </div>
    </Container>
  );
}
