export default function Label({primal, selectedOption, handleOptionChange}) {
    return(
        <label >
            <input
              type="radio"
              value={primal}
              checked={selectedOption === primal}
              onChange={() => handleOptionChange(primal)}
            />
            {primal.charAt(0).toUpperCase() + primal.slice(1)}
          </label>
    )
}