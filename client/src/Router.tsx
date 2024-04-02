import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/App.css";
import LandingPage from "./pages/landingPage";
import AnnotatorPage from "./pages/annotatorPage";

function AppRouter() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/annotator/:name" element={<AnnotatorPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default AppRouter;
