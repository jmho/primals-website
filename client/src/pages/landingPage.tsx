import { useState } from "react";
import Footer from "../components/footer";
import "../styles/Landing.css";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const [annotator, setAnnotator] = useState("");
  const navigate = useNavigate();

  const handleAnnotator = () => {
    if (annotator) {
      const url = `/annotator/${annotator}`;
      navigate(url);
    }
  };

  const nameOptions = [
    {
      name: "Bonnie",
      value: "bonnie",
    },
    {
      name: "Brodie",
      value: "brodie",
    },
    {
      name: "Justin",
      value: "justin",
    },
  ];

  return (
    <div id="root">
      <div className="main-container">
        <div className="container">
          <h1>Primal Belief Annotation Study Web Interface</h1>
          <div className="instructions">
            <p>
              1. Please go through the{" "}
              <a
                href="https://docs.google.com/document/d/1cjKj_WP0jMg8Z4Gz4vYGiFP9oorDpQJ6UukM3nSWK_M/edit"
                target="_blank"
                rel="noreferrer"
              >
                Annotation Guidelines
              </a>{" "}
              for the annotation. <br />
              2. Select your Name in the Dropdown Below. <br />
              3. Click on Start to Begin Annotating. <br />
            </p>
          </div>
          <select
            onChange={(e) => setAnnotator(e.target.value)}
            value={annotator}
          >
            <option value="">Select your Name</option>
            {/* Add annotators here */}
            {nameOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
          <br />
          <button onClick={handleAnnotator}>Start</button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
