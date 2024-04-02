import { RadioButtonsGroup } from "./RadioButtonGroup";
import Tree from "./Tree";
import { Belief, OptionSet as OptionSetType } from "../types/data";

export function OptionSet(props: {
  onPrimaryBelief: (belief: Belief) => void;
  onSecondaryBelief: (belief: Belief) => void;
  onTertiaryBelief: (belief: Belief) => void;
  currentAnnotationData: OptionSetType;
}) {
  const {
    onPrimaryBelief,
    onSecondaryBelief,
    onTertiaryBelief,
    currentAnnotationData,
  } = props;

  const selectedPrimary = currentAnnotationData.primaryBelief;
  const selectedSecondary = currentAnnotationData.secondaryBelief;
  const selectedTertiary = currentAnnotationData.tertiaryBelief;

  const index = 1;

  return (
    <>
      <div className="toplevel">
        <RadioButtonsGroup
          index={index}
          options={["Good", "Bad"]}
          selectedOption={selectedPrimary}
          onChange={onPrimaryBelief}
        />
      </div>
      <div className="additional-options-container">
        {selectedPrimary === "Good" && (
          <>
            <div id="flex-col">
              <div>
                <RadioButtonsGroup
                  index={index}
                  options={["Safe"]}
                  selectedOption={selectedSecondary}
                  onChange={onSecondaryBelief}
                />
                <label>
                  <span className="disabled-text">
                    <input type="radio" checked={false} disabled />
                    Dangerous
                  </span>
                </label>
              </div>
              <Tree
                folder="folder1"
                selectedPrimary={selectedPrimary}
                selectedSecondary={selectedSecondary}
                selectedTertiary={selectedTertiary}
                onSelect={onTertiaryBelief}
              />
            </div>

            <div id="flex-col">
              <div>
                <RadioButtonsGroup
                  index={index}
                  options={["Enticing"]}
                  selectedOption={selectedSecondary}
                  onChange={onSecondaryBelief}
                />
                <label>
                  <span className="disabled-text">
                    <input type="radio" checked={false} disabled />
                    Dull
                  </span>
                </label>
              </div>
              <Tree
                folder="folder2"
                selectedPrimary={selectedPrimary}
                selectedSecondary={selectedSecondary}
                selectedTertiary={selectedTertiary}
                onSelect={onTertiaryBelief}
              />
            </div>

            <div id="flex-col">
              <div>
                <RadioButtonsGroup
                  index={index}
                  options={["Alive"]}
                  selectedOption={selectedSecondary}
                  onChange={onSecondaryBelief}
                />
                <label>
                  <span className="disabled-text">
                    <input type="radio" checked={false} disabled />
                    Mechanistic
                  </span>
                </label>
              </div>
              <Tree
                folder="folder3"
                selectedPrimary={selectedPrimary}
                selectedSecondary={selectedSecondary}
                selectedTertiary={selectedTertiary}
                onSelect={onTertiaryBelief}
              />
              <Tree
                folder="folder4"
                selectedPrimary={selectedPrimary}
                selectedSecondary={selectedSecondary}
                selectedTertiary={selectedTertiary}
                onSelect={onTertiaryBelief}
              />
            </div>
          </>
        )}
        {selectedPrimary === "Bad" && (
          <>
            <div id="flex-col">
              <div>
                <label>
                  <span className="disabled-text">
                    <input type="radio" checked={false} disabled />
                    Safe
                  </span>
                </label>
                <RadioButtonsGroup
                  index={index}
                  options={["Dangerous"]}
                  selectedOption={selectedSecondary}
                  onChange={onSecondaryBelief}
                />
              </div>
              <Tree
                folder="folder5"
                selectedPrimary={selectedPrimary}
                selectedSecondary={selectedSecondary}
                selectedTertiary={selectedTertiary}
                onSelect={onTertiaryBelief}
              />
            </div>

            <div id="flex-col">
              <div>
                <label>
                  <span className="disabled-text">
                    <input type="radio" checked={false} disabled />
                    Enticing
                  </span>
                </label>
                <RadioButtonsGroup
                  index={index}
                  options={["Dull"]}
                  selectedOption={selectedSecondary}
                  onChange={onSecondaryBelief}
                />
              </div>
              <Tree
                folder="folder6"
                selectedPrimary={selectedPrimary}
                selectedSecondary={selectedSecondary}
                selectedTertiary={selectedTertiary}
                onSelect={onTertiaryBelief}
              />
            </div>

            <div id="flex-col">
              <div>
                <label>
                  <span className="disabled-text">
                    <input type="radio" checked={false} disabled />
                    Alive
                  </span>
                </label>
                <RadioButtonsGroup
                  index={index}
                  options={["Mechanistic"]}
                  selectedOption={selectedSecondary}
                  onChange={onSecondaryBelief}
                />
              </div>
              <Tree
                folder="folder7"
                selectedPrimary={selectedPrimary}
                selectedSecondary={selectedSecondary}
                selectedTertiary={selectedTertiary}
                onSelect={onTertiaryBelief}
              />
              <Tree
                folder="folder8"
                selectedPrimary={selectedPrimary}
                selectedSecondary={selectedSecondary}
                selectedTertiary={selectedTertiary}
                onSelect={onTertiaryBelief}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}
