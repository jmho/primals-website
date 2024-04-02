import { Belief } from "../types/data";

export function RadioButtonsGroup(props: {
  index: number;
  options: Belief[];
  selectedOption: Belief;
  onChange: (option: Belief) => void;
}) {
  return (
    <span className="radio-buttons-group">
      {props.options.map((option) => (
        <label key={option}>
          <input
            type="radio"
            value={option}
            checked={props.selectedOption === option}
            onChange={() => props.onChange(option)}
          />
          {option}
        </label>
      ))}
    </span>
  );
}
