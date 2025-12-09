import React from "react";
import Sidebar from "./Sidebar";
import "../CSS/Show.css";  
import "../CSS/About.css";   // <-- New CSS file for About Page

function AboutPage() {
  return (
    <>
      <Sidebar />

      <div className="about-wrapper">
        <div className="about-container">

          <h2 className="about-title">
            About the Hadith Archival System
          </h2>

          <p className="about-text">
            The Hadith Archival System is a digital platform designed to preserve,
            organise, and present authentic Islamic knowledge in a structured and
            accessible manner. Our goal is to help students, researchers, and the
            general public read and understand Hadith content in both Tamil and English.
          </p>

          <p className="about-text">
            All information and explanations available in this system are sourced only
            from <strong>authorised Islamic books, scholars, and recognised Hadith literature</strong>.
            We strictly avoid personal interpretations or unauthenticated content.
          </p>

          <p className="about-text">
            Our intention is to play a small role in sharing beneficial knowledge
            (Ilm-e-Nafi’) while maintaining accuracy, respect, and reliability in every
            Hadith we present.
          </p>

          <h3 className="about-subtitle">Disclaimer</h3>

          <p className="about-text">
            This platform does not replace scholarly study. Users are encouraged to
            refer to qualified Islamic scholars for deeper understanding and clarification
            of any Hadith or explanation.
          </p>

          <p className="about-text">
            The Hadith Archival System is intended purely for educational, research,
            and reference purposes.
          </p>

          <h3 className="about-subtitle">Contact Us</h3>

          <p className="about-text">
            If you have any questions, corrections, or suggestions, feel free to reach out:
          </p>

          <p className="about-contact">
            📧 <strong>anasjavith2906@gmail.com</strong>
          </p>

        </div>
      </div>
    </>
  );
}

export default AboutPage;
