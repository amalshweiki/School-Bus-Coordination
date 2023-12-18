import imagebus from "../images/bus.png";
import { Link } from "react-router-dom";
import "../style/homepage.css";
const HomePage = () => {
  return (
    <div className="all-page">
      <div className="grid-container-home">
        <div className="title-and-get">
          <h3>Right Bus.</h3>
          <h2>Right Stop.</h2>
          <h1>Right Time.</h1>
          <Link id="get-started" to="" className="GET-STARTED">
            GET STARTED
          </Link>
        </div>
        <div className="text">
          <p>
            <span>WELCOME TO Student School Bus Coordination</span>
            <br></br>
            In our commitment to creating a safer and more efficient student
            transportation system, we present the School Bus Coordination
            Project. Every academic year, the challenge of aligning suitable
            buses with students is a recurring issue for schools and parents
            alike. Our innovative solution serves as a centralized platform,
            connecting schools with available buses, providing a seamless
            experience for everyone involved.
          </p>
        </div>
        <div className="bus">
          <img src={imagebus} />
        </div>
      </div>
    </div>

    // <div className="home-container">
    //   <div>
    //     <div className="title-text">
    //       <h3>Right Bus.</h3>
    //       <h2>Right Stop.</h2>
    //       <h1>Right Time.</h1>{" "}
    //       <Link to="" className="GET-STARTED">
    //         GET STARTED
    //       </Link>
    //     </div>
    //     <div>
    //       <img src={imagebus} />
    //     </div>
    //   </div>
    // </div>
  );
};
export default HomePage;
