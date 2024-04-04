import { Belief, OptionSet as OptionSetType } from "../util/types";
import TwoColumnOptions from "./twoColumnOptions";
import {
  aliveTertiaries,
  dangerousTertiaries,
  dullTertiaries,
  enticingTertiaries,
  mechanisticTertiaries,
  noSecondaryGoodTertiaries,
  noSecondaryBadTertiaries,
  safeTertiaries,
} from "../util/data";

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

  return (
    <>
      <div className="toplevel">
        <TwoColumnOptions
          visibility={true}
          selectedBelief={selectedPrimary}
          leftColumn={["Good"]}
          rightColumn={["Bad"]}
          leftColumnDisabled={false}
          rightColumnDisabled={false}
          onSelect={onPrimaryBelief}
        />
      </div>

      <div className="additional-options-container">
        <div id="flex-col">
          <TwoColumnOptions
            visibility={selectedPrimary !== ""}
            selectedBelief={selectedSecondary}
            leftColumn={["Safe"]}
            rightColumn={["Dangerous"]}
            leftColumnDisabled={selectedPrimary !== "Good"}
            rightColumnDisabled={selectedPrimary === "Good"}
            onSelect={onSecondaryBelief}
          />
          <TwoColumnOptions
            visibility={selectedPrimary !== ""}
            selectedBelief={selectedTertiary}
            leftColumn={safeTertiaries}
            rightColumn={dangerousTertiaries}
            leftColumnDisabled={selectedSecondary !== "Safe"}
            rightColumnDisabled={selectedSecondary !== "Dangerous"}
            onSelect={onTertiaryBelief}
          />
        </div>

        <div id="flex-col">
          <div>
            <TwoColumnOptions
              visibility={selectedPrimary !== ""}
              selectedBelief={selectedSecondary}
              leftColumn={["Enticing"]}
              rightColumn={["Dull"]}
              leftColumnDisabled={selectedPrimary !== "Good"}
              rightColumnDisabled={selectedPrimary === "Good"}
              onSelect={onSecondaryBelief}
            />
            <TwoColumnOptions
              visibility={selectedPrimary !== ""}
              selectedBelief={selectedTertiary}
              leftColumn={enticingTertiaries}
              rightColumn={dullTertiaries}
              leftColumnDisabled={selectedSecondary !== "Enticing"}
              rightColumnDisabled={selectedSecondary !== "Dull"}
              onSelect={onTertiaryBelief}
            />
          </div>
        </div>

        <div id="flex-col">
          <div>
            <TwoColumnOptions
              visibility={selectedPrimary !== ""}
              selectedBelief={selectedSecondary}
              leftColumn={["Alive"]}
              rightColumn={["Mechanistic"]}
              leftColumnDisabled={selectedPrimary !== "Good"}
              rightColumnDisabled={selectedPrimary === "Good"}
              onSelect={onSecondaryBelief}
            />
            <TwoColumnOptions
              visibility={selectedPrimary !== ""}
              selectedBelief={selectedTertiary}
              leftColumn={aliveTertiaries}
              rightColumn={mechanisticTertiaries}
              leftColumnDisabled={selectedSecondary !== "Alive"}
              rightColumnDisabled={selectedSecondary !== "Mechanistic"}
              onSelect={onTertiaryBelief}
            />
          </div>
        </div>

        <div id="flex-col">
          <div className="tree-container">
            {selectedPrimary !== "" && (
              <div className="tree">
                <ul>
                  <div>
                    <label>
                      <input
                        type="radio"
                        value={"NoSecondaryBelief"}
                        checked={selectedSecondary === "NoSecondaryBelief"}
                        onChange={() => onSecondaryBelief("NoSecondaryBelief")}
                        disabled={false}
                      />
                      <span>Tertiaries with no Secondary</span>
                    </label>
                  </div>
                </ul>
              </div>
            )}
          </div>

          {selectedSecondary === "NoSecondaryBelief" && (
            <TwoColumnOptions
              visibility={selectedPrimary !== ""}
              selectedBelief={selectedTertiary}
              leftColumn={noSecondaryGoodTertiaries}
              rightColumn={noSecondaryBadTertiaries}
              leftColumnDisabled={selectedPrimary !== "Good"}
              rightColumnDisabled={selectedPrimary === "Good"}
              onSelect={onTertiaryBelief}
            />
          )}
        </div>
      </div>
    </>
  );
}
