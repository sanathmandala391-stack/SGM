import React, { useRef, useState } from "react";
import TopBar from "../components/TopBar";
import Buttons from "../components/Buttons";
import Menu from "../components/Menu";
import ImageSlider from "../components/ImageSlider";
import Footer from "../components/Footer";

function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  const scroll = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="Mainbar">
      <TopBar />
      <Buttons
        onToggle={toggleMenu}
        onScrollHome={() => scroll(homeRef)}
        onScrollAbout={() => scroll(aboutRef)}
        onScrollContact={() => scroll(contactRef)}
      />
      <Menu isOpen={menuOpen} />
      <ImageSlider />
      <br />

      <div className="home" ref={homeRef}>
        <p id="home">
          S.G.M. Government Polytechnic was established in 1980. It was started
          with a vision of creating a sustainable environment for the youth of
          Telangana to gain Technical Skill and Knowledge.
          <br />
          <br />
          The institute provides Diploma courses in 4 Streams. S.G.M.
          Government Polytechnic offers various diploma courses in various
          fields of engineering like Automobile, Computer, Architecture and
          Computer and Commercial Practice.
          <br />
          Tabulated below is the details of the same:
        </p>

        <br />
        <br />

        <h3 id="course">Courses</h3>
        <h3 id="coursedetails">Courses Details</h3>

        <div className="details">
          <h3>Diploma in Computer Science</h3>
          <br />
          <div className="content">
            Subjects: - Computer Science & O.S, Software Tools, MS Office,
            C,C++, etc.
            <br />
            <br />
            Course Type: - Full Time
            <br />
            <br />
            Duration of Course: - 3 years
            <br />
            <br />
            Yearly Intake: - 60 Students
            <br />
            <br />
            Eligibility: 10th pass.
          </div>
          <hr />

          <div className="detail">
            <h3>Diploma in Architecture</h3>
            <br />
            <div className="text">
              <p>
                Subject: - Construction & Material, Building Science, History of
                Architecture, Surveying, Town Planning, Estimating, Costing &
                Spec., etc.
                <br />
                <br />
                Duration: - 3 years
                <br />
                <br />
                Course Type: - Full Time
                <br />
                <br />
                Yearly Intake: - 40
                <br />
                <br />
                Eligibility: 10th pass.
              </p>
            </div>
            <hr />
          </div>

          <div className="header">
            <h3>Diploma in Automobile</h3>
            <br />
            <div className="para">
              Subjects: - Hydraulics, Pneumatics and Power Plant, Automotive
              Pollution and Control, CAD Practice, Mechanical Testing Lab,
              Project, Industrial Visit, and Seminar, etc.
              <br />
              <br />
              Course Type: - Full Time
              <br />
              <br />
              Duration of Course: - 3 years
              <br />
              <br />
              Yearly Intake: - 60 Students
              <br />
              <br />
              Eligibility: 10th pass
            </div>
            <hr />
          </div>

          <div className="ccp">
            <h3>
              Diploma in Computer
              <br />
              Commercial and Practice
            </h3>
            <br />
            <div className="text-content">
              Subjects: - Typewriting, Short hand & O.S, Software Tools:- MS
              Office, C,C++, etc.
              <br />
              <br />
              Course Type: - Full Time
              <br />
              <br />
              Duration of Course: - 3 years
              <br />
              <br />
              Yearly Intake: - 60 Students
              <br />
              <br />
              Eligibility: 10th pass.
            </div>
          </div>
        </div>
      </div>

      <br />
      <br />

      <div className="about" ref={aboutRef}>
        <br />
        <div className="mission">
          <h2>Our Mission</h2>
          <p>
            1) To transform the students into technically qualified/skilled
            Diploma Engineers with hardworking nature and social commitment
            through career-oriented courses taught by high profile faculty,
            competent to take up middle management positions.
            <br />
            <br />
            2) To identify, based on an informed perception of needs of
            Industries/organizations, areas of requirements upon which the
            Polytechnic can concentrate.
            <br />
            <br />
            3) To develop human potential so that technically capable and
            imaginatively gifted supervisory leaders can emerge in range of
            professional skills that include core competencies such as
            collaboration, digital literacy, critical thinking, and problem
            solving to face new challenges.
            <br />
            <br />
            4) To provide practical exposure through Industrial training thus
            bridging the institute and the Industry.
            <br />
            <br />
            5) To prepare the students for continuing their higher education in
            their respective field.
          </p>
        </div>
        <hr />
        <div className="vision">
          <h2>Our Vision</h2>
          <p>
            To be a center of excellence in Polytechnic education; to serve as
            a valuable resource for the Industry and the Society;
            <br />
            <br />
            to be the fountain head of new ideas and of innovations in Diploma
            education.
          </p>
        </div>
      </div>

      <br />

      <div className="contact" ref={contactRef}>
        <h2>Contact Us</h2>
        <br />
        <p>
          Principal
          <br />
          S G M Government Polytechnic
          <br />
          Abdullapurmet, OPP Ramoji Film City,
          <br />
          RangaReddy, Telangana - 501505
          <br />
        </p>
      </div>

      <Footer />
    </div>
  );
}

export default LandingPage;


