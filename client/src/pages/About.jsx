import "../style/aboutpage.css";
const About = () => {
  return (
    <div className="all-page-about">
      <div className="about-container">
        <h1>Welcome to School Bus Coordination Project</h1>
        <h3> Your Reliable School Transportation</h3>
        <h3>
          {" "}
          Solution At <u>School Bus Coordination Project</u>
        </h3>
        <p id="par-1">
          We understand the challenges that parents, schools, and private bus
          operators face when it comes to student transportation.
          <br></br>
        </p>
        <p className="par-2">
          <span> Our mission</span> is to simplify and streamline this process,
          making it efficient, transparent, and secure for all stakeholders
          involved.{" "}
        </p>
        <p className="par-3">
          <span> Our Vision</span> Empowering communities through safe,
          reliable, and accessible student transportation.
        </p>
        <p className="par-4">
          <span> What We Offer Centralized Platform:</span> Our website acts as
          a centralized hub, connecting schools with available buses,
          eliminating the hassle of manually searching for suitable
          transportation options. Detailed
        </p>
      </div>
    </div>
  );
};

export default About;
