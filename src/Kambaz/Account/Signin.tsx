import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "./reducer";
import { useNavigate } from "react-router-dom";
import { FormControl, Button } from "react-bootstrap";
import * as db from "../Database";
//import * as client from "./client";
import { Link } from "react-router";

export default function Signin() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUsers = useSelector((state: any) => state.accountReducer.users);

  // const signin = async () => {
  //   const user =  await client.signin(credentials);
  //   if (!user) return;
  //   dispatch(setCurrentUser(user));
  //   navigate("/Kambaz/Dashboard");
  // };

  const handleSignin = () => {
    // check both db.users and session users
    const users = [...db.users, ...sessionUsers];

    const user = users.find(
      (u: any) =>
        u.username === credentials.username && u.password === credentials.password
    );

    if (!user) {
      alert("Invalid username or password");
      return;
    }

    dispatch(setCurrentUser(user));
    navigate("/Kambaz/Account/Profile");
  };

  return (
    <div id="wd-signin-screen">
      <h1>Sign in</h1>
      <FormControl
        placeholder="Username"
        className="mb-2"
        value={credentials.username}
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
      />
      <FormControl
        placeholder="Password"
        type="password"
        className="mb-2"
        value={credentials.password}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
      />
      <Button className="w-100 mb-2" onClick={handleSignin}>Sign in</Button>
      <Link to="/Kambaz/Account/Signup" className="wd-signup-link">Sign up</Link>
    </div>
  );
}



// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { setCurrentUser } from "./reducer";
// import { useDispatch } from "react-redux";
// import * as db from "../Database";
// import { FormControl, Button } from "react-bootstrap";

// export default function Signin() {
//   const [credentials, setCredentials] = useState<any>({});
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const signin = () => {
//     const user = db.users.find(
//       (u: any) => u.username === credentials.username && u.password === credentials.password);
//     if (!user) return;
//     dispatch(setCurrentUser(user));
//     navigate("/Kambaz/Profile");
//   };
//   return (
//     <div id="wd-signin-screen">
//       <h1>Sign in</h1>
//       <FormControl defaultValue={credentials.username}
//              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
//              className="mb-2" placeholder="username" id="wd-username" />
//       <FormControl defaultValue={credentials.password}
//              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
//              className="mb-2" placeholder="password" type="password" id="wd-password" />
//       <Button onClick={signin} id="wd-signin-btn" className="w-100" > Sign in </Button>
//       <Link id="wd-signup-link" to="/Kambaz/Account/Signup"> Sign up </Link>
//     </div>
// );}
