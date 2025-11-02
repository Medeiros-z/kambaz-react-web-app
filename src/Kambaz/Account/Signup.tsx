import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import { useNavigate } from "react-router-dom";
import { FormControl, Button } from "react-bootstrap";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = () => {
    if (!username || !password) return;

    // create a simple user object
    const newUser = { username, password };

    // set it as the current user
    dispatch(setCurrentUser(newUser));

    // navigate to profile
    navigate("/Kambaz/Account/Profile");
  };

  return (
    <div id="wd-signup-screen">
      <h1>Sign up</h1>
      <FormControl
        placeholder="Username"
        className="mb-2"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <FormControl
        placeholder="Password"
        type="password"
        className="mb-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button className="w-100 mb-2" onClick={handleSignup}>Sign up</Button>
    </div>
  );
}



// import { Link } from "react-router-dom";
// import { FormControl } from "react-bootstrap";
// export default function Signup() {
//   return (
//     <div id="wd-signup-screen">
//       <h1>Sign up</h1>
//       <FormControl id="wd-username"
//              placeholder="username"
//              className="mb-2"/><br />
//       <FormControl id="wd-password"
//              placeholder="password" type="password"
//              className="mb-2"/><br />
//       <Link id="wd-signin-btn"
//             to="/Kambaz/Account/Profile"
//             className="btn btn-primary w-100 mb-2">
//             Sign up </Link><br />
//       <Link id="wd-signin-link" to="/Kambaz/Account/Signin">Sign in</Link>
//     </div> );}
