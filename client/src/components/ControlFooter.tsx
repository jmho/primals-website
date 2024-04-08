import { AnnotationEntries } from "../util/types";

export default function ControlFooter(props: {
  userName: string;
  selectedPrimaryBelief: "Good" | "Bad" | "";
  currentAnnotation: number;
  totalAnnotation: number;
  completedAnnotationCount: number;
  hasMixedBelief: boolean;
  annotationEntries: AnnotationEntries;
  onAnnotationComplete: () => void;
  handleNext: () => void;
  handlePrev: () => void;
  toggleMixedBelief: () => void;
}) {
  const {
    userName,
    selectedPrimaryBelief,
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
      : "https://annotation-study-part-2.netlify.app/api/";

  async function saveAnnotation() {
    if (!validateCurrentAnnotation()) {
      return;
    }

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

  function validateCurrentAnnotation() {
    const currentEntry = annotationEntries[currentAnnotation].primaryOptionSets;
    const secondaryEntry =
      annotationEntries[currentAnnotation].secondaryOptionSets;

    if (!currentEntry.primaryBelief) {
      alert("Please select a primary belief");
      return false;
    } else if (!currentEntry.secondaryBelief) {
      alert("Please select a secondary belief");
      return false;
    } else if (!currentEntry.tertiaryBelief) {
      alert("Please select a tertiary belief");
      return false;
    } else if (secondaryEntry && !secondaryEntry.primaryBelief) {
      alert("Please select a primary belief for the secondary belief");
      return false;
    } else if (secondaryEntry && !secondaryEntry.secondaryBelief) {
      alert("Please select a secondary belief for the secondary belief");
      return false;
    } else if (secondaryEntry && !secondaryEntry.tertiaryBelief) {
      alert("Please select a tertiary belief for the secondary belief");
      return false;
    }

    return true;
  }

  return (
    <footer className="footer">
      {selectedPrimaryBelief !== "" && (
        <button className="footer-button" onClick={toggleMixedBelief}>
          {!hasMixedBelief
            ? `Add ${selectedPrimaryBelief === "Good" ? "Bad" : "Good"} Belief`
            : `Remove ${
                selectedPrimaryBelief === "Good" ? "Bad" : "Good"
              } Belief`}
        </button>
      )}

      <button className="footer-button" onClick={saveAnnotation}>
        Save Annotations
      </button>
      <button
        onClick={async () => {
          if (validateCurrentAnnotation()) {
            await saveAnnotation();
            handlePrev();
          }
        }}
      >
        Prev
      </button>
      <span className="page-info">
        Annotation {currentAnnotation + 1} of {totalAnnotation}
      </span>
      {showSubmit && (
        <button
          onClick={async () => {
            await saveAnnotation();
            props.onAnnotationComplete();
          }}
          className="submit-button"
        >
          Submit
        </button>
      )}
      {!showSubmit && (
        <button
          onClick={async () => {
            if (validateCurrentAnnotation()) {
              await saveAnnotation();
              handleNext();
            }
          }}
          className="next-button"
        >
          Next
        </button>
      )}
    </footer>
  );
}
