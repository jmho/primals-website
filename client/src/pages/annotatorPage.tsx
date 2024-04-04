import { useState, useEffect } from "react";
import "../styles/App.css";

import { useParams } from "react-router-dom";
import { OptionSet } from "../components/OptionSet";
import {
  AnnotationData,
  AnnotationEntries,
  AnnotationEntry,
  Belief,
  TertiaryBelief,
  primaryBelief,
  secondaryBelief,
} from "../util/types";
import Navbar from "../components/navbar";
import ControlFooter from "../components/ControlFooter";

function App() {
  const { name } = useParams();

  const BASE_URL =
    import.meta.env.MODE === "development"
      ? "http://localhost:3001/"
      : "https://annotation-study-part-2.netlify.app/api/";

  const userName = name ? name : "";

  const [currentAnnotation, setCurrentAnnotation] = useState(0);
  const [annotationData, setAnnotationData] = useState<AnnotationData>({
    pages: [
      {
        content: "",
      },
    ],
  });
  const [annotationEntries, setAnnotationEntries] = useState<AnnotationEntries>(
    [
      {
        page: 0,
        primaryOptionSets: {
          primaryBelief: "",
          secondaryBelief: "",
          tertiaryBelief: "",
        },
      },
    ]
  );

  // If the annotation has no primary belief we can assume it has not been completed yet.
  const completedAnnotations: Set<number> = new Set([
    ...annotationEntries
      .filter(
        (item) =>
          item.primaryOptionSets.primaryBelief !== "" &&
          item.primaryOptionSets.secondaryBelief !== "" &&
          item.primaryOptionSets.tertiaryBelief !== "" &&
          (item.secondaryOptionSets === undefined ||
            (item.secondaryOptionSets.primaryBelief !== "" &&
              item.secondaryOptionSets.secondaryBelief !== "" &&
              item.secondaryOptionSets.tertiaryBelief !== ""))
      )
      .map((entry) => entry.page),
  ]);

  const annotationIsComplete =
    completedAnnotations.size === annotationData.pages.length;

  const selectedPrimaryOptionSet =
    annotationEntries[currentAnnotation].primaryOptionSets;

  const selectedSecondaryOptionSet =
    annotationEntries[currentAnnotation].secondaryOptionSets;

  const selectedText = annotationData.pages[currentAnnotation].content;

  // Fetch initialization data from the server
  useEffect(() => {
    let ignore = false;

    async function getInitializationData() {
      const initAnnotationResp = await fetch(
        `${BASE_URL}annotation-data?name=${userName}`
      );
      if (ignore) return;
      const initAnnotationData = await initAnnotationResp.json();

      const initProgressResp = await fetch(
        `${BASE_URL}current-progress?name=${userName}`
      );

      if (ignore) return;

      if (initProgressResp.ok) {
        const initProgressData = await initProgressResp.json();
        setAnnotationEntries(initProgressData);
      }
      if (initAnnotationData !== undefined) {
        setAnnotationData(initAnnotationData);
      }
    }

    getInitializationData();

    return () => {
      ignore = true;
    };
  }, [BASE_URL, userName]);

  // Initialize the annotation entries if the user has no saved progress
  useEffect(() => {
    if (annotationEntries.length !== annotationData.pages.length) {
      const newAnnotationEntries = annotationData.pages.map((_, index) => {
        return {
          page: index,
          primaryOptionSets: {
            primaryBelief: "",
            secondaryBelief: "",
            tertiaryBelief: "",
          },
        } as AnnotationEntry;
      });
      setAnnotationEntries(newAnnotationEntries);
    }
  }, [annotationEntries, annotationData]);

  let instruction = "Please select a primary belief.";

  if (annotationIsComplete) {
    instruction = "All annotations are complete!";
  } else if (
    selectedPrimaryOptionSet.primaryBelief === "" ||
    (selectedSecondaryOptionSet &&
      selectedSecondaryOptionSet.primaryBelief === "")
  ) {
    instruction = "Please select a primary belief.";
  } else if (
    selectedPrimaryOptionSet.secondaryBelief === "" ||
    (selectedSecondaryOptionSet &&
      selectedSecondaryOptionSet.secondaryBelief === "")
  ) {
    instruction = "Please select a secondary belief.";
  } else if (
    selectedPrimaryOptionSet.tertiaryBelief === "" ||
    (selectedSecondaryOptionSet &&
      selectedSecondaryOptionSet.tertiaryBelief === "")
  ) {
    instruction = "Please select a tertiary belief.";
  } else {
    instruction =
      'Annotation complete! Please click next or if you feel this tweet has dual beliefs (Example: "XYZ is good, but IJK is bad..."), click "Add Bad/Good Belief".';
  }

  // If the sidebar is used, and the annotaiton is incomplete, reset the instruction
  function resetIfIncomplete() {
    const primaryIsComplete =
      selectedPrimaryOptionSet.primaryBelief !== "" &&
      selectedPrimaryOptionSet.secondaryBelief !== "" &&
      selectedPrimaryOptionSet.tertiaryBelief !== "";

    const secondaryIsComplete =
      selectedSecondaryOptionSet === undefined
        ? true
        : selectedSecondaryOptionSet.primaryBelief !== "" &&
          selectedSecondaryOptionSet.secondaryBelief !== "" &&
          selectedSecondaryOptionSet.tertiaryBelief !== ""
        ? true
        : false;

    if (!primaryIsComplete || !secondaryIsComplete) {
      const currentAnnotationEntryCopy = [...annotationEntries];
      const currentAnnotationEntry =
        currentAnnotationEntryCopy[currentAnnotation];
      currentAnnotationEntry.secondaryOptionSets = undefined;
      currentAnnotationEntry.primaryOptionSets = {
        primaryBelief: "",
        secondaryBelief: "",
        tertiaryBelief: "",
      };

      setAnnotationEntries(currentAnnotationEntryCopy);
    }
  }

  // Sometimes, the annotation data can have two options. This allows the user to
  // add a mixed belief to the annotation.
  const toggleMixedBelief = () => {
    const currentAnnotationEntryCopy = [...annotationEntries];
    const currentAnnotationEntry =
      currentAnnotationEntryCopy[currentAnnotation];
    if (currentAnnotationEntry.secondaryOptionSets === undefined) {
      currentAnnotationEntry.secondaryOptionSets = {
        primaryBelief:
          selectedPrimaryOptionSet.primaryBelief === "Good" ? "Bad" : "Good",
        secondaryBelief: "",
        tertiaryBelief: "",
      };
    } else {
      currentAnnotationEntry.secondaryOptionSets = undefined;
    }
    setAnnotationEntries(currentAnnotationEntryCopy);
  };

  // Update the primary belief when selected
  const onPrimaryBelief = (belief: Belief) => {
    const currentAnnotationEntryCopy = [...annotationEntries];
    currentAnnotationEntryCopy[currentAnnotation].primaryOptionSets = {
      primaryBelief: belief as primaryBelief,
      secondaryBelief: "",
      tertiaryBelief: "",
    };
    if (selectedSecondaryOptionSet !== undefined) {
      currentAnnotationEntryCopy[currentAnnotation].secondaryOptionSets = {
        primaryBelief:
          selectedSecondaryOptionSet.primaryBelief === "Good" ? "Bad" : "Good",
        secondaryBelief: "",
        tertiaryBelief: "",
      };
    }
    setAnnotationEntries(currentAnnotationEntryCopy);
  };

  // Update the secondary belief when selected
  const onSecondaryBelief = (belief: Belief) => {
    const currentAnnotationEntryCopy = [...annotationEntries];
    currentAnnotationEntryCopy[currentAnnotation].primaryOptionSets = {
      primaryBelief: selectedPrimaryOptionSet.primaryBelief,
      secondaryBelief: belief as secondaryBelief,
      tertiaryBelief: "",
    };
    setAnnotationEntries(currentAnnotationEntryCopy);
  };

  // Update the tertiary belief when selected
  const onTeriaryBelief = (belief: Belief) => {
    const currentAnnotationEntryCopy = [...annotationEntries];
    currentAnnotationEntryCopy[currentAnnotation].primaryOptionSets = {
      primaryBelief: selectedPrimaryOptionSet.primaryBelief,
      secondaryBelief: selectedPrimaryOptionSet.secondaryBelief,
      tertiaryBelief: belief as TertiaryBelief,
    };
    setAnnotationEntries(currentAnnotationEntryCopy);
  };

  // Belief handlers for Secondary Options

  // Update the primary belief when selected
  const onPrimaryBeliefSecondary = () => {};

  // Update the secondary belief when selected
  const onSecondaryBeliefSecondary = (belief: Belief) => {
    if (selectedSecondaryOptionSet === undefined) return;
    const currentAnnotationEntryCopy = [...annotationEntries];
    currentAnnotationEntryCopy[currentAnnotation].secondaryOptionSets = {
      primaryBelief: selectedSecondaryOptionSet.primaryBelief,
      secondaryBelief: belief as secondaryBelief,
      tertiaryBelief: "",
    };
    setAnnotationEntries(currentAnnotationEntryCopy);
  };

  // Update the tertiary belief when selected
  const onTeriaryBeliefSecondary = (belief: Belief) => {
    if (selectedSecondaryOptionSet === undefined) return;
    const currentAnnotationEntryCopy = [...annotationEntries];
    currentAnnotationEntryCopy[currentAnnotation].secondaryOptionSets = {
      primaryBelief: selectedSecondaryOptionSet.primaryBelief,
      secondaryBelief: selectedSecondaryOptionSet.secondaryBelief,
      tertiaryBelief: belief as TertiaryBelief,
    };
    setAnnotationEntries(currentAnnotationEntryCopy);
  };

  return (
    <div className="app-container">
      <textarea className="text-box" rows={5} value={selectedText} readOnly />
      <h5 className="instructions">{instruction}</h5>
      {!annotationIsComplete && (
        <div className="main-content">
          <OptionSet
            onPrimaryBelief={onPrimaryBelief}
            onSecondaryBelief={onSecondaryBelief}
            onTertiaryBelief={onTeriaryBelief}
            currentAnnotationData={selectedPrimaryOptionSet}
          />
          {selectedSecondaryOptionSet && (
            <OptionSet
              onPrimaryBelief={onPrimaryBeliefSecondary}
              onSecondaryBelief={onSecondaryBeliefSecondary}
              onTertiaryBelief={onTeriaryBeliefSecondary}
              currentAnnotationData={selectedSecondaryOptionSet}
            />
          )}
          <ControlFooter
            selectedPrimaryBelief={selectedPrimaryOptionSet.primaryBelief}
            userName={userName}
            currentAnnotation={currentAnnotation}
            totalAnnotation={annotationData.pages.length}
            completedAnnotationCount={completedAnnotations.size}
            hasMixedBelief={selectedSecondaryOptionSet !== undefined}
            annotationEntries={annotationEntries}
            handleNext={() =>
              setCurrentAnnotation(
                Math.min(currentAnnotation + 1, annotationData.pages.length - 1)
              )
            }
            handlePrev={() =>
              setCurrentAnnotation(Math.max(currentAnnotation - 1, 0))
            }
            toggleMixedBelief={toggleMixedBelief}
          />
        </div>
      )}
      <Navbar
        currentAnnotation={currentAnnotation}
        setCurrentAnnotation={(page: number) => {
          resetIfIncomplete();
          setCurrentAnnotation(page);
        }}
        savedAnnotationSet={completedAnnotations}
        totalAnnotations={annotationData.pages.length}
      />
    </div>
  );
}

export default App;
