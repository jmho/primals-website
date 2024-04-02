import { useState, useEffect } from "react";
import "../styles/App.css";
import {
  Belief,
  Folders,
  TertiaryBelief,
  primaryBelief,
  secondaryBelief,
} from "../types/data";
export default function Tree(props: {
  folder: Folders;
  selectedPrimary: primaryBelief;
  selectedSecondary: secondaryBelief;
  selectedTertiary: TertiaryBelief;
  onSelect: (option: Belief) => void;
}) {
  const [resetOptions, setResetOptions] = useState(false);

  const {
    folder,
    selectedPrimary,
    selectedSecondary,
    selectedTertiary,
    onSelect,
  } = props;

  useEffect(() => {
    if (resetOptions) {
      setResetOptions(false);
    }
  }, [resetOptions]);

  const treeData = {
    folder1: [
      "Pleasurable",
      "Regenerative",
      "Progressing",
      "Harmless",
      "Cooperative",
      "Stable",
      "Just",
    ],
    folder2: [
      "Interesting",
      "Beautiful",
      "Abundant",
      "Worth Exploring",
      "Improvable",
      "Meaningful",
      "Funny",
    ],
    folder3: ["Intentional", "Needs Me", "About Me"],
    folder4: [
      "Acceptable",
      "Changing",
      "Hierarchical",
      "Interconnected",
      "Understandable",
    ],
    folder5: [
      "Miserable",
      "Degenerative",
      "Declining",
      "Threatening",
      "Competitive",
      "Fragile",
      "Unjust",
    ],
    folder6: [
      "Boring",
      "Ugly",
      "Barren",
      "Not Worth Exploring",
      "Too Hard to Improve",
      "Meaningless",
      "Not Funny",
    ],
    folder7: ["Unintentional", "Doesn't Need Me", "Indifferent"],
    folder8: [
      "Unacceptable",
      "Static",
      "Non Hierarchical",
      "Separable",
      "Too Hard To Understand",
    ],
  };

  const isOptionDisabled = (folderName: string) => {
    return (
      (selectedSecondary === "Safe" &&
        (folderName === "folder2" ||
          folderName === "folder3" ||
          folderName === "folder7" ||
          folderName === "folder5" ||
          folderName === "folder6")) ||
      (selectedSecondary === "Enticing" &&
        (folderName === "folder1" ||
          folderName === "folder3" ||
          folderName === "folder7" ||
          folderName === "folder5" ||
          folderName === "folder6")) ||
      (selectedSecondary === "Alive" &&
        (folderName === "folder1" ||
          folderName === "folder2" ||
          folderName === "folder7" ||
          folderName === "folder5" ||
          folderName === "folder6")) ||
      (selectedSecondary === "Dangerous" &&
        (folderName === "folder1" ||
          folderName === "folder2" ||
          folderName === "folder3" ||
          folderName === "folder7" ||
          folderName === "folder6")) ||
      (selectedSecondary === "Dull" &&
        (folderName === "folder1" ||
          folderName === "folder2" ||
          folderName === "folder3" ||
          folderName === "folder7" ||
          folderName === "folder5")) ||
      (selectedSecondary === "Mechanistic" &&
        (folderName === "folder1" ||
          folderName === "folder2" ||
          folderName === "folder3" ||
          folderName === "folder6" ||
          folderName === "folder5"))
    );
  };

  if (selectedPrimary === "Good")
    return (
      <div className="tree-container">
        <div className="tree">
          <ul>
            {treeData[folder].map((option, index) => (
              <li key={option}>
                <label>
                  <input
                    type="radio"
                    value={option}
                    checked={selectedTertiary === option}
                    onChange={() => {
                      onSelect(option as Belief);
                    }}
                    disabled={isOptionDisabled(folder)}
                  />
                  <span
                    className={isOptionDisabled(folder) ? "disabled-text" : ""}
                  >
                    {option}
                  </span>
                </label>
                {(folder === "folder1" ||
                  folder === "folder2" ||
                  folder === "folder3" ||
                  folder === "folder4") && (
                  <label>
                    <input
                      type="radio"
                      value={
                        treeData[
                          `folder${parseInt(folder.slice(-1)) + 4}` as Folders
                        ][index]
                      }
                      checked={false}
                      disabled
                    />
                    <span className="disabled-text">
                      {
                        treeData[
                          `folder${parseInt(folder.slice(-1)) + 4}` as Folders
                        ][index]
                      }
                    </span>
                  </label>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  else
    return (
      <div className="tree-container">
        <div className="tree">
          <ul>
            {treeData[folder].map((option, index) => (
              <li key={option}>
                {(folder === "folder5" ||
                  folder === "folder6" ||
                  folder === "folder7" ||
                  folder === "folder8") && (
                  <label>
                    <input
                      type="radio"
                      value={
                        treeData[
                          `folder${parseInt(folder.slice(-1)) - 4}` as Folders
                        ][index]
                      }
                      checked={false}
                      disabled
                    />
                    <span className="disabled-text">
                      {
                        treeData[
                          `folder${parseInt(folder.slice(-1)) - 4}` as Folders
                        ][index]
                      }
                    </span>
                  </label>
                )}
                <label>
                  <input
                    type="radio"
                    value={option}
                    checked={selectedTertiary === option}
                    onChange={() => {
                      onSelect(option as Belief);
                    }}
                    disabled={isOptionDisabled(folder)}
                  />
                  <span
                    className={isOptionDisabled(folder) ? "disabled-text" : ""}
                  >
                    {option}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
}
