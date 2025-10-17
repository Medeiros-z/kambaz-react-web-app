import { Link, useLocation, useParams } from "react-router-dom";

export default function CourseNavigation() {
  const { pathname } = useLocation();
  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];
  const { cid } = useParams();

  return (
      <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
        {links.map((link) => {
          const to = `/Kambaz/Courses/${cid}/${link}`;
          const isActive = pathname.includes(`/${link}`);
          return (
            <Link
              key={link}
              to={to}
              id={`wd-course-${link.toLowerCase()}-link`}
              className={`list-group-item border border-0 ${isActive ? "active" : "text-danger"}`}
            >
              {link}
            </Link>
          );
        })}
      </div>
  );}

