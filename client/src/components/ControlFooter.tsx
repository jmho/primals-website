import { AnnotationEntries } from "../types/data";

export default function ControlFooter(props: {
  userName: string;
  currentAnnotation: number;
  totalAnnotation: number;
  completedAnnotationCount: number;
  hasMixedBelief: boolean;
  annotationEntries: AnnotationEntries;
  handleNext: () => void;
  handlePrev: () => void;
  toggleMixedBelief: () => void;
}) {
  const {
    userName,
    currentAnnotation,
    totalAnnotation,
    completedAnnotationCount,
    hasMixedBelief,
    annotationEntries,
    handleNext,
    handlePrev,
    toggleMixedBelief,
  } = props;

  const showSubmit = completedAnnotationCount === totalAnnotation;

  const BASE_URL =
    import.meta.env.MODE === "development"
      ? "http://localhost:3001/"
      : "https://annotation-experiment.netlify.app/api/";

  async function saveAnnotation() {
    const response = await fetch(`${BASE_URL}save?name=${userName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(annotationEntries),
    });
    if (!response.ok) {
      console.error("Error saving annotation");
    }
  }

  return (
    <footer className="footer">
      <button className="footer-button" onClick={toggleMixedBelief}>
        {!hasMixedBelief ? "Add Mixed Belief" : "Remove Mixed Belief"}
      </button>
      <button className="footer-button" onClick={saveAnnotation}>
        Save Annotations
      </button>
      <button onClick={handlePrev}>Prev</button>
      <span className="page-info">
        Annotation {currentAnnotation + 1} of {totalAnnotation}
      </span>
      {showSubmit && (
        <button onClick={saveAnnotation} className="submit-button">
          Submit
        </button>
      )}
      {!showSubmit && (
        <button onClick={handleNext} className="next-button">
          Next
        </button>
      )}
    </footer>
  );
}
