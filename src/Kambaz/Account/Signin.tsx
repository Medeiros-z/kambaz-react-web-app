import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import { useNavigate } from "react-router-dom";
import { FormControl } from "react-bootstrap";
import * as client from "./client";
import { Link } from "react-router";


export default function Signin() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signin = async () => {
    const user =  await client.signin(credentials);
    if (!user) return;
    dispatch(setCurrentUser(user));
    navigate("/Kambaz/Dashboard");
  };

  return (
    <div id="wd-signin-screen">
      <h1>Sign in</h1>
      <FormControl value={credentials.username} onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
             className="wb-username" placeholder="username" />
      <FormControl value={credentials.password} onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
             className="wb-username" placeholder="password" />
      <button onClick={signin} className="wd-signin-btn btn btn-primary mb-2 w-100"> Sign in </button><br />
      <Link to="/Kambaz/Account/Signup" className="wd-signup-link">Sign up</Link>
    </div>
  );
}
