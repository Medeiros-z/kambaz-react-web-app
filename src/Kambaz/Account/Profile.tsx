import { Link } from "react-router-dom";
import { Form, FormControl } from "react-bootstrap";

export default function Profile() {
  return (
    <div id="wd-profile-screen" className="p-3" style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h3 className="mb-3">Profile</h3>

      {/* Username */}
      <Form.Group className="mb-2" controlId="wd-username">
        <FormControl defaultValue="alice" placeholder="username" />
      </Form.Group>

      {/* Password */}
      <Form.Group className="mb-2" controlId="wd-password">
        <FormControl defaultValue="123" type="password" placeholder="password" />
      </Form.Group>

      {/* First Name */}
      <Form.Group className="mb-2" controlId="wd-firstname">
        <FormControl defaultValue="Alice" placeholder="First Name" />
      </Form.Group>

      {/* Last Name */}
      <Form.Group className="mb-2" controlId="wd-lastname">
        <FormControl defaultValue="Wonderland" placeholder="Last Name" />
      </Form.Group>

      {/* Date of Birth */}
      <Form.Group className="mb-2" controlId="wd-dob">
        <FormControl defaultValue="2000-01-01" type="date" />
      </Form.Group>

      {/* Email */}
      <Form.Group className="mb-2" controlId="wd-email">
        <FormControl defaultValue="alice@wonderland" type="email" placeholder="Email" />
      </Form.Group>

      {/* Role */}
      <Form.Group className="mb-3" controlId="wd-role">
        <Form.Select defaultValue="FACULTY">
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
          <option value="FACULTY">Faculty</option>
          <option value="STUDENT">Student</option>
        </Form.Select>
      </Form.Group>

      
      <Link
        to="/Kambaz/Account/Signin"
        className="btn btn-red w-100"
      >
        Sign out
      </Link>
    </div>
  );
}
