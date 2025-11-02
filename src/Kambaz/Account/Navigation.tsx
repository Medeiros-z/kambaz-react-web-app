import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { pathname } = useLocation();

  const links = currentUser
    ? [{ id: "wd-profile-link", name: "Profile", path: "/Kambaz/Account/Profile" }]
    : [
        { id: "wd-signin-link", name: "Sign In", path: "/Kambaz/Account/Signin" },
        { id: "wd-signup-link", name: "Sign Up", path: "/Kambaz/Account/Signup" },
      ];

  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => (
        <Link
          key={link.id}
          to={link.path}
          id={link.id}
          className={`list-group-item border border-0 ${
            pathname.includes(link.path) ? "active text-bg-danger" : "text-danger"
          }`}
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
}
