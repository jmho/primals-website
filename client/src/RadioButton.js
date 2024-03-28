import React, { useState, useEffect } from 'react';
import './App.css'; // Import CSS file for styling
import RadioButton from './RadioButton'; // Import the RadioButton component

function App() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [additionalOptions, setAdditionalOptions] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [text, setText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageData, setPageData] = useState([]);
  const [pageOptions, setPageOptions] = useState({});
  const [isDuplicateClicked, setIsDuplicateClicked] = useState(false); // New state for tracking duplicate click

  const treeData = {
    folder1: ["Pleasurable", "Regenerative", "Progressing", "Harmless", "Cooperative", "Stable", "Just"],
    folder2: ["Interesting", "Beautiful", "Abundant", "Worth Exploring", "Improvable", "Meaningful", "Funny"],
    folder3: ["Intentional", "Needs Me", "About Me"],
    folder4: ["Miserable", "Degenerative", "Declining", "Threatening", "Competitive", "Fragile", "Unjust"],
    folder5: ["Boring", "Ugly", "Barren", "Not Worth Exploring", "Too Hard to Improve", "Meaningless", "Not Funny"],
    folder6: ["Unintentional", "Doesn't Need Me", "Indifferent"],
  };

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
    if (selectedOption && selectedOptions.length === 1 && additionalOptions) {
      // Action logic here
    }
  };

  const handleSaveAnnotations = async () => {
    const allOptions = [selectedOption, additionalOptions, ...selectedOptions];
    const dataToSave = {
      page: currentPage,
      options: allOptions
    };

    try {
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

  const handleDuplicateOptions = () => {
    const newSelectedOptions = [...selectedOptions];
    const newAdditionalOptions = additionalOptions;

    const filteredTreeData = Object.keys(treeData).reduce((acc, folder) => {
      if (folder !== "folder1" && folder !== "folder4") {
        acc[folder] = treeData[folder];
      }
      return acc;
    }, {});

    setSelectedOptions(newSelectedOptions);
    setAdditionalOptions(newAdditionalOptions);
    setPageOptions(filteredTreeData);
    setIsDuplicateClicked(true); // Set flag for duplicate clicked
  };

  return (
    <div className="app-container">
      <textarea
        className="text-box"
        placeholder="Type your text here..."
        rows="5"
        value={text}
        readOnly
      />
      <header>
      </header>
      <main>
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
        {!isDuplicateClicked && (
          <div className="additional-options-container">
            {/* Render additional options dynamically */}
            {Object.keys(treeData).map((folder, index) => (
              <div className="additional-option-container" key={index}>
                {treeData[folder].map((option, idx) => (
                  <RadioButton
                    key={idx}
                    value={option}
                    checked={selectedOptions.includes(option)}
                    onChange={() => handleTreeOptionChange(option)}
                  />
                ))}
              </div>
            ))}
          </div>
        )}
        {/* Render duplicated options if duplicate button is clicked */}
        {isDuplicateClicked && (
          <div className="additional-options-container">
            {Object.keys(pageOptions).map((folder, index) => (
              <div className="additional-option-container" key={index}>
                {pageOptions[folder].map((option, idx) => (
                  <RadioButton
                    key={idx}
                    value={option}
                    checked={selectedOptions.includes(option)}
                    onChange={() => handleTreeOptionChange(option)}
                  />
                ))}
              </div>
            ))}
          </div>
        )}
      </main>
      <footer className="footer">
        <button className="footer-button" onClick={handleSaveAndExit}>Save and Exit</button>
        <button className="footer-button" onClick={handleSaveAnnotations}>Save Annotations</button>
        <button className="footer-button" onClick={handlePrev} disabled={currentPage === 1}>Prev</button>
        <span className="page-info">Page {currentPage} of {totalPages}</span>
        <button className="footer-button" onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
        <button className="footer-button" onClick={handleDuplicateOptions} disabled={isDuplicateClicked}>Duplicate Options</button>
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
    </div>
  );
}

export default App;
