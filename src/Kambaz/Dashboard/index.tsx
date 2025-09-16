import { Link } from "react-router-dom";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/1234/Home"
                className="wd-dashboard-course-link" >
            <img src="/images/reactjs.jpg" width={200} />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer  </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course"> 
            <Link to="/Kambaz/Courses/M1000/Home"
                    className="wd-dashboard-course-link" >
                <img src="/images/math.jpg" width={200} />
                <div>
                    <h5> MATH1000 Basic Math </h5>
                    <p className="wd-dashboard-course-title">
                        Elementary Math student
                    </p>
                    <button> Go </button>
                </div>
            </Link> 
        </div>
        
        <div className="wd-dashboard-course"> 
            <Link to="/Kambaz/Courses/CS1100/Home"
                    className="wd-dashboard-course-link" >
                <img src="/images/csa.jpg" width={200} />
                <div>
                    <h5> CS1100 AP CSA </h5>
                    <p className="wd-dashboard-course-title">
                        High School CS
                    </p>
                    <button> Go </button>
                </div>
            </Link> 
        </div>

        <div className="wd-dashboard-course"> 
            <Link to="/Kambaz/Courses/ENGW1111/Home"
                    className="wd-dashboard-course-link" >
                <img src="/images/writing.jpg" width={200} />
                <div>
                    <h5> ENGW1111 Intro to writing </h5>
                    <p className="wd-dashboard-course-title">
                        Required Class
                    </p>
                    <button> Go </button>
                </div>
            </Link> 
        </div>

        <div className="wd-dashboard-course"> 
            <Link to="/Kambaz/Courses/MATH4000/Home"
                    className="wd-dashboard-course-link" >
                <img src="/images/calc1.jpg" width={200} />
                <div>
                    <h5> MATH4000 AP Calc AB </h5>
                    <p className="wd-dashboard-course-title">
                        Lesser
                    </p>
                    <button> Go </button>
                </div>
            </Link> 
        </div>

        <div className="wd-dashboard-course"> 
            <Link to="/Kambaz/Courses/MATH4050/Home"
                    className="wd-dashboard-course-link" >
                <img src="/images/calc2.jpg" width={200} />
                <div>
                    <h5> MATH4050 AP Calc BC </h5>
                    <p className="wd-dashboard-course-title">
                        GOAT
                    </p>
                    <button> Go </button>
                </div>
            </Link> 
        </div>

        <div className="wd-dashboard-course"> 
            <Link to="/Kambaz/Courses/HIS2300/Home"
                    className="wd-dashboard-course-link" >
                <img src="/images/usgov.jpg" width={200} />
                <div>
                    <h5> HIS2300 US Gov </h5>
                    <p className="wd-dashboard-course-title">
                        Independent Study
                    </p>
                    <button> Go </button>
                </div>
            </Link> 
        </div>
        
      </div>
    </div>
);}
