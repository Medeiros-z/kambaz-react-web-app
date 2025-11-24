import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import PeopleDetails from "./Details";
import { Link, useParams } from "react-router-dom";
import * as userClient from "../client";
import * as accountClient from "../../Account/client";

export default function PeopleTable() {
  const { cid } = useParams();               // If on /Courses/:cid/*, this exists
  const [users, setUsers] = useState<any[]>([]);

  const fetchUsers = async () => {
    try {
      let data;

      if (cid) {
        // Course mode
        data = await userClient.findUsersForCourse(cid);
      } else {
        // Admin mode
        data = await accountClient.findAllUsers();
      }

      setUsers(data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [cid]);

  return (
    <div id="wd-people-table">
      <PeopleDetails />

      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user: any) => (
            <tr key={user._id}>
              <td className="wd-full-name text-nowrap">
                <Link
                  to={`/Kambaz/Account/Users/${user._id}`}
                  className="text-decoration-none"
                >
                  <FaUserCircle className="me-2 fs-1 text-secondary" />
                  <span className="wd-first-name">{user.firstName}</span>{" "}
                  <span className="wd-last-name">{user.lastName}</span>
                </Link>
              </td>

              <td className="wd-login-id">{user.loginId}</td>
              <td className="wd-section">{user.section}</td>
              <td className="wd-role">{user.role}</td>
              <td className="wd-last-activity">{user.lastActivity}</td>
              <td className="wd-total-activity">{user.totalActivity}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}