import React, { useState, useEffect } from 'react';
import './App.css'; // Import CSS file for styling

function App() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [additionalOptions, setAdditionalOptions] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [text, setText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageData, setPageData] = useState([]);
  const [pageOptions, setPageOptions] = useState({});
  const [duplicateCount, setDuplicateCount] = useState(1); // New state to track duplicate count

  // Load text content from the JSON file
  useEffect(() => {
    fetch('/dataset.json')
      .then(response => response.json())
      .then(data => {
        setText(data.pages[currentPage - 1].content);
        setTotalPages(data.pages.length);
        setPageData(data.pages);
      })
      .catch(error => console.error('Error loading text content:', error));
  }, [currentPage]);

  useEffect(() => {
    if (duplicateCount > 2) {
      setDuplicateCount(1); // Reset duplicate count after rendering duplicated options
    }
  }, [duplicateCount]);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setSelectedOptions([]);
    setAdditionalOptions(null); // Reset additional options
  };

  const handleAdditionalOptionChange = (option) => {
    setAdditionalOptions(option);
  };  

  const handleTreeOptionChange = (option) => {
    setSelectedOptions([option]);
  };

  const handleSaveAndExit = () => {
    // Perform action only if one option and one additional option are selected
    if (selectedOption && selectedOptions.length === 1 && additionalOptions) {
      // Action logic here
    }
  };

  const handleSaveAnnotations = async () => {
    // Combine selected option, selected additional option label, and additional options
    const allOptions = [selectedOption, additionalOptions, ...selectedOptions];
    const dataToSave = {
      page: currentPage,
      options: allOptions
    };
  
    try {
      // Send the data to the server
      const response = await fetch('http://localhost:4000/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSave),
      });
  
      if (response.ok) {
        console.log('Data saved successfully');
      } else {
        console.error('Failed to save data:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };
  
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Function to duplicate options
  const handleDuplicateOptions = () => {
    setDuplicateCount(2); // Set the duplicate count to 2 when the button is clicked
  };  

  return (
    <div className="app-container">
      <textarea
        className="text-box"
        placeholder="Type your text here..."
        rows="5"
        value={text} // Set the value of the text box
        readOnly // Make the text box read-only
      />
      <header>
        {/* <h1>{data.title}</h1>
        <p>{data.content}</p> */}
      </header>
      <main>
        {[...Array(duplicateCount)].map((_, index) => ( // Map through an array based on duplicate count
          <div key={index}>
            <div className='toplevel'>
              <label>
                <input
                  type="radio"
                  value="Good"
                  checked={selectedOption === "Good"}
                  onChange={() => handleOptionChange("Good")}
                />
                Good
              </label>
              <label>
                <input
                  type="radio"
                  value="Bad"
                  checked={selectedOption === "Bad"}
                  onChange={() => handleOptionChange("Bad")}
                />
                Bad
              </label>
            </div>
            <div className="additional-options-container">
              {selectedOption === "Good" && (
                <>
                  <div className="additional-option-container">
                    <label>
                      <input
                        type="radio"
                        checked={additionalOptions === "Safe"}
                        onChange={() => handleAdditionalOptionChange("Safe")}
                      />
                      Safe
                    </label>
                    {/* Duplicate the rest of the options */}
                    {/* Tree component should handle the rendering of the options */}
                    <Tree option={selectedOption} folder="folder1" selectedOptions={selectedOptions} onSelect={handleTreeOptionChange} />
                  </div>
                  <div className="additional-option-container">
                    <label>
                      <input
                        type="radio"
                        checked={additionalOptions === "Enticing"}
                        onChange={() => handleAdditionalOptionChange("Enticing")}
                      />
                      Enticing
                    </label>
                    {/* Tree component should handle the rendering of the options */}
                    <Tree option={selectedOption} folder="folder2" selectedOptions={selectedOptions} onSelect={handleTreeOptionChange} />
                  </div>
                  <div className="additional-option-container">
                    <label>
                      <input
                        type="radio"
                        checked={additionalOptions === "Alive"}
                        onChange={() => handleAdditionalOptionChange("Alive")}
                      />
                      Alive
                    </label>
                    {/* Tree component should handle the rendering of the options */}
                    <Tree option={selectedOption} folder="folder3" selectedOptions={selectedOptions} onSelect={handleTreeOptionChange} />
                  </div>
                </>
              )}
              {selectedOption === "Bad" && (
                <>
                  <div className="additional-option-container">
                    <label>
                      <input
                        type="radio"
                        checked={additionalOptions === "Dangerous"}
                        onChange={() => handleAdditionalOptionChange("Dangerous")}
                      />
                      Dangerous
                    </label>
                    {/* Tree component should handle the rendering of the options */}
                    <Tree option={selectedOption} folder="folder4" selectedOptions={selectedOptions} onSelect={handleTreeOptionChange} />
                  </div>
                  <div className="additional-option-container">
                    <label>
                      <input
                        type="radio"
                        checked={additionalOptions === "Dull"}
                        onChange={() => handleAdditionalOptionChange("Dull")}
                      />
                      Dull
                    </label>
                    {/* Tree component should handle the rendering of the options */}
                    <Tree option={selectedOption} folder="folder5" selectedOptions={selectedOptions} onSelect={handleTreeOptionChange} />
                  </div>
                  <div className="additional-option-container">
                    <label>
                      <input
                        type="radio"
                        checked={additionalOptions === "Mechanistic"}
                        onChange={() => handleAdditionalOptionChange("Mechanistic")}
                      />
                      Mechanistic
                    </label>
                    {/* Tree component should handle the rendering of the options */}
                    <Tree option={selectedOption} folder="folder6" selectedOptions={selectedOptions} onSelect={handleTreeOptionChange} />
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </main>

      <footer className="footer">
        <button className="footer-button" onClick={handleSaveAndExit}>Save and Exit</button>
        <button className="footer-button" onClick={handleSaveAnnotations}>Save Annotations</button>
        <button className="footer-button" onClick={handlePrev} disabled={currentPage === 1}>Prev</button>
        <span className="page-info">Page {currentPage} of {totalPages}</span>
        <button className="footer-button" onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
        <button className="footer-button" onClick={handleDuplicateOptions} >Duplicate Options</button>
      </footer>
      <div className="container">
        <nav className="navbar">
          <ul>
            {pageData.map((page, index) => (
              <li key={index}><a href="#" onClick={() => setCurrentPage(index + 1)}>Page {index + 1}</a></li>
            ))}
          </ul>
        </nav>
      </div>
      {/* <button onClick={downloadPageOptions}>Download Page Options</button> */}
    </div>
  );
}

function Tree({ option, folder, selectedOptions, onSelect }) {
  const treeData = {
    folder1: ["Pleasurable", "Regenerative", "Progressing", "Harmless", "Cooperative", "Stable", "Just"],
    folder2: ["Interesting", "Beautiful", "Abundant", "Worth Exploring", "Improvable", "Meaningful", "Funny"],
    folder3: ["Intentional", "Needs Me", "About Me"],
    folder4: ["Miserable", "Degenerative", "Declining", "Threatening", "Competitive", "Fragile", "Unjust"],
    folder5: ["Boring", "Ugly", "Barren", "Not Worth Exploring", "Too Hard to Improve", "Meaningless", "Not Funny"],
    folder6: ["Unintentional", "Doesn't Need Me", "Indifferent"],
  };

  const handleOptionChange = (option) => {
    onSelect(option);
  };

  const isOptionDisabled = (folderName) => {
    return (option === "Good" && (folderName === "folder4" || folderName === "folder5" || folderName === "folder6")) ||
           (option === "Bad" && (folderName === "folder1" || folderName === "folder2" || folderName === "folder3"));
  };

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
                  checked={selectedOptions.includes(option)}
                  onChange={() => handleOptionChange(option)}
                  disabled={isOptionDisabled(folder)}
                />
                <span className={isOptionDisabled(folder) ? "disabled-text" : ""}>{option}</span>
              </label>
              {(folder === "folder1" || folder === "folder2" || folder === "folder3") && (
                <label>
                  <input
                    type="radio"
                    value={treeData[`folder${parseInt(folder.slice(-1)) + 3}`][index]}
                    checked={false}
                    disabled
                  />
                  <span className="disabled-text">{treeData[`folder${parseInt(folder.slice(-1)) + 3}`][index]}</span>
                </label>
              )}
              {(folder === "folder4" || folder === "folder5" || folder === "folder6") && (
                <label>
                  <input
                    type="radio"
                    value={treeData[`folder${parseInt(folder.slice(-1)) - 3}`][index]}
                    checked={false}
                    disabled
                  />
                  <span className="disabled-text">{treeData[`folder${parseInt(folder.slice(-1)) - 3}`][index]}</span>
                </label>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
