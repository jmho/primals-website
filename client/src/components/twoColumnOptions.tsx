import "../styles/App.css";
import { Belief } from "../util/types";

export default function TwoColumnOptions(props: {
  visibility: boolean;
  selectedBelief: Belief;
  leftColumnDisabled: boolean;
  rightColumnDisabled: boolean;
  leftColumn: Belief[];
  rightColumn: Belief[];
  onSelect: (option: Belief) => void;
}) {
  const {
    visibility,
    selectedBelief,
    leftColumnDisabled,
    rightColumnDisabled,
    leftColumn,
    rightColumn,
    onSelect,
  } = props;

  return (
    <div className="tree-container">
      {visibility && (
        <div className="tree">
          <ul>
            {leftColumn.map((option, index) => (
              <div>
                <label>
                  <input
                    type="radio"
                    value={option}
                    checked={selectedBelief === option}
                    onChange={() => {
                      onSelect(option);
                    }}
                    disabled={leftColumnDisabled}
                  />
                  <span className={leftColumnDisabled ? "disabled-text" : ""}>
                    {option}
                  </span>
                </label>

                <label>
                  <input
                    type="radio"
                    value={rightColumn[index]}
                    checked={selectedBelief === rightColumn[index]}
                    onChange={() => {
                      onSelect(rightColumn[index]);
                    }}
                    disabled={rightColumnDisabled}
                  />
                  <span className={rightColumnDisabled ? "disabled-text" : ""}>
                    {rightColumn[index]}
                  </span>
                </label>
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
