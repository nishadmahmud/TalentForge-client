import React from "react";
import { useDarkMode } from "../context/DarkModeContext";

const About = () => {
  const { isDarkMode } = useDarkMode();
  return (
    <div
      className={`min-h-[80vh] flex flex-col items-center justify-center p-6 ${
        isDarkMode
          ? "bg-slate-900 text-white"
          : "bg-gradient-to-br from-slate-50 to-emerald-100 text-slate-900"
      }`}
    >
      <div className="max-w-3xl w-full rounded-2xl shadow-xl border p-8 mx-auto text-center mt-10 mb-10"
        style={{background: isDarkMode ? undefined : 'white'}}>
        <h1 className={`text-4xl font-bold mb-4 ${isDarkMode ? "text-emerald-400" : "text-emerald-700"}`}>About TalentForge</h1>
        <p className="mb-6 text-lg">
          TalentForge is a modern freelance marketplace connecting top talent with businesses and individuals worldwide. Our mission is to empower freelancers and clients to collaborate, innovate, and succeed together.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mt-8">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
            <p className="mb-4">To create a trusted, accessible, and efficient platform where freelancers and clients can find the perfect match for their needs and grow together.</p>
            <h2 className="text-2xl font-semibold mb-2">Our Vision</h2>
            <p>To be the leading global marketplace for freelance work, fostering creativity, opportunity, and success for all.</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2">Our Values</h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>Integrity & Trust</li>
              <li>Innovation & Growth</li>
              <li>Collaboration & Community</li>
              <li>Diversity & Inclusion</li>
              <li>Customer Success</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 