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
} from "../types/data";
import Navbar from "../components/navbar";
import ControlFooter from "../components/ControlFooter";

function App() {
  const { name } = useParams();

  const BASE_URL =
    import.meta.env.MODE === "development"
      ? "http://localhost:3001/"
      : "https://annotation-experiment.netlify.app/api/";

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
  const [instruction, setInstruction] = useState(
    "Please select a primary belief."
  );

  // If the annotation has no primary belief we can assume it has not been completed yet.
  const completedAnnotations: Set<number> = new Set([
    ...annotationEntries
      .filter((item) => item.primaryOptionSets.primaryBelief)
      .map((entry) => entry.page),
  ]);

  const selectedPrimaryOptionSet =
    annotationEntries[currentAnnotation].primaryOptionSets;

  const selectedSecondaryOptionSet =
    annotationEntries[currentAnnotation].secondaryOptionSets;

  const selectedText = annotationData.pages[currentAnnotation].content;

  // Fetch initialization data from the server
  useEffect(() => {
    let ignore = false;

    async function getInitializationData() {
      await Promise.all([
        fetch(`${BASE_URL}annotation-data?name=${userName}`)
          .then(async (response) => {
            if (ignore) return;
            const data = await response.json();
            if (data !== undefined) {
              setAnnotationData(data);
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          }),

        fetch(`${BASE_URL}current-progress?name=${userName}`)
          .then(async (response) => {
            if (ignore) return;
            const data = await response.json();
            setAnnotationEntries(data);
          })
          .catch((error) => {
            console.error("Error:", error);
          }),
      ]);
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

  // If the annotation entries has changed, update the instructions
  useEffect(() => {
    if (selectedPrimaryOptionSet.primaryBelief === "") {
      setInstruction("Please select a primary belief.");
    } else if (selectedPrimaryOptionSet.secondaryBelief === "") {
      setInstruction("Please select a secondary belief.");
    } else if (selectedPrimaryOptionSet.tertiaryBelief === "") {
      setInstruction("Please select a tertiary belief.");
    } else {
      setInstruction(
        'Annotation complete! Please click next or if you feel there is a mixed belief, click "Add Mixed Belief".'
      );
    }
  }, [annotationEntries, currentAnnotation, selectedPrimaryOptionSet]);

  // Sometimes, the annotation data can have two options. This allows the user to
  // add a mixed belief to the annotation.
  const toggleMixedBelief = () => {
    const currentAnnotationEntryCopy = [...annotationEntries];
    const currentAnnotationEntry =
      currentAnnotationEntryCopy[currentAnnotation];
    if (currentAnnotationEntry.secondaryOptionSets === undefined) {
      currentAnnotationEntry.secondaryOptionSets = {
        primaryBelief: "",
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
  const onPrimaryBeliefSecondary = (belief: Belief) => {
    const currentAnnotationEntryCopy = [...annotationEntries];
    currentAnnotationEntryCopy[currentAnnotation].secondaryOptionSets = {
      primaryBelief: belief as primaryBelief,
      secondaryBelief: "",
      tertiaryBelief: "",
    };
    setAnnotationEntries(currentAnnotationEntryCopy);
  };

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

  console.log();

  return (
    <div className="app-container">
      <textarea className="text-box" rows={5} value={selectedText} readOnly />
      <h5 className="instructions">{instruction}</h5>
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
          userName={userName}
          currentAnnotation={currentAnnotation}
          totalAnnotation={annotationData.pages.length}
          completedAnnotationCount={completedAnnotations.size}
          hasMixedBelief={false}
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
      <Navbar
        currentAnnotation={currentAnnotation}
        setCurrentAnnotation={setCurrentAnnotation}
        savedAnnotationSet={completedAnnotations}
        totalAnnotations={annotationData.pages.length}
      />
    </div>
  );
}

export default App;
