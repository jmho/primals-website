import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import Tree from './Tree';

function RadioButtonsGroup({ index, options, selectedOption, onChange, topLevel }) {

  // const handleOptionChange = (option) => {
  //   onChange(option);
  //   // Set instructions based on the selected option
  //   if (option === 'Good') {
  //     setInstruction('You chose "Good", so you can choose only one additionalOption.');
  //   } else if (option === 'Bad') {
  //     setInstruction('You chose "Bad", so you can choose additionalOptions freely.');
  //   }
  // };

  return (
    <span className="radio-buttons-group">
      {options.map(option => (
        <label key={option}>
          <input
            type="radio"
            value={option}
            checked={selectedOption && selectedOption[0] === option}
            onChange={() => onChange(option)}
            disabled={topLevel && index === 1 && selectedOption[0] !== option}
          />
          {option}
        </label>
      ))}
      {/* <div className="instructions">{instruction}</div> */}
    </span>
  );
}

function OptionSet({ index, onOptionChange, onAdditionalOptionChange, onTreeOptionChange, currentPage, resetOptions, data, optionSets }) {
  let initialSelectedOptions = []
  if(index === 1) {
    initialSelectedOptions = [optionSets[0].options === 'Good' ? 'Bad': 'Good']
  }
  const [selectedOptions, setSelectedOptions] = useState(initialSelectedOptions);
  const [additionalOptions, setAdditionalOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);

  
  // useEffect(() => {
    
  //   if(data === null) {
  //     setAdditionalOptions([]);
  //     setSelectedOption([]);
  //   }
  // }, [selectedOptions[0]])

  useEffect(() => {
    console.log('data coming: ', data);
    if(data !== null && data !== undefined && data.page===currentPage && data.optionSets && data.optionSets[index] && data.optionSets[index].options) {
      setSelectedOptions([data.optionSets[index].options]);
      console.log(selectedOptions);
      setAdditionalOptions([data.optionSets[index].additionalOptions]);
      console.log(additionalOptions);
      setSelectedOption([data.optionSets[index].selectedOption]);
      console.log(selectedOption);
    }
    else {
      setSelectedOptions(initialSelectedOptions);
      setAdditionalOptions([])
      setSelectedOption([]);
    }

    // else if(data!==null && data !== undefined && data.page===currentPage && data.options.length>1)
    // {
    //   setSelectedOptions(prevSelectedOptions => {
    //     const currentSelectedOptions = [...prevSelectedOptions]
    //     currentSelectedOptions.push(data.options[1].options)
    //     return currentSelectedOptions
    //   });
    //   console.log(selectedOptions);
    //   setAdditionalOptions(prevAdditionalOptions => {
    //     const currentAdditionalOptions = [...prevAdditionalOptions]
    //     currentAdditionalOptions.push(data.options[1].additionalOptions);
    //     return currentAdditionalOptions;
    //   });
    //   console.log(additionalOptions);
    //   setSelectedOption(prevSelectedOptions => {
    //     const currentSelectedOptions = [...prevSelectedOptions];
    //     currentSelectedOptions.push(data.options[1].selectedOption)
    //     return currentSelectedOptions;
    //   });
    //   console.log(selectedOption);
    // }
  }, [currentPage, resetOptions, data]);

  useEffect(() => {
    onOptionChange(selectedOptions, index);
    onAdditionalOptionChange(additionalOptions, index);
    onTreeOptionChange(selectedOption, index);
  }, [selectedOptions, additionalOptions, selectedOption ]);

  
  
  
  const handleTreeOptionChange = (option) => {
    if(additionalOptions.length === 0){
      alert('please select secondary option')
      return;
    }
      
    setSelectedOption([option]);
  };

  // const handleAdditionalOptionChange = (additionalOptions, index) => {
  //   setAdditionalOptions(additionalOptions);
  //   onAdditionalOptionChange(additionalOptions, index);
  // };

  const handle6OptionChange = (options) => {
    console.log('Its here')
      setAdditionalOptions([options])
      setSelectedOption([])
  }

  const handleSelectedOptionsChange = (option) => {
      setSelectedOptions([option])
      setAdditionalOptions([])
      setSelectedOption([])
  }

  return (
    <>
    <div className="toplevel">
      <RadioButtonsGroup
        index = {index}
        options={["Good", "Bad"]}
        selectedOption={selectedOptions}
        onChange={handleSelectedOptionsChange}
        topLevel = {true}
      />
      </div>
      <div className="additional-options-container">
        {selectedOptions[0] === "Good" && (
          <>
          <div id = "flex-col">
            <div>
            <RadioButtonsGroup
              index = {index}
              options={["Safe"]}
              selectedOption={additionalOptions}
              onChange={handle6OptionChange}
              topLevel={false}
            />
            <label>
            <span className="disabled-text">
              <input
                type="radio"
                checked={false}
                disabled
              />
              Dangerous
            </span>
            </label>
            </div>
            <Tree option={selectedOptions} folder="folder1" selectedOptions={selectedOption} additionalOption={additionalOptions[0]} onSelect={handleTreeOptionChange} />
          </div>
            
            <div id = "flex-col">
              <div>
            <RadioButtonsGroup
              index = {index}
              options={["Enticing"]}
              selectedOption={additionalOptions}
              onChange={handle6OptionChange}
              topLevel={false}
            />
            <label>
            <span className="disabled-text">
              <input
                type="radio"
                checked={false}
                disabled
              />
              Dull
            </span>
            </label>
            </div>
            <Tree option={selectedOptions} folder="folder2" selectedOptions={selectedOption} additionalOption={additionalOptions[0]} onSelect={handleTreeOptionChange} />
            </div>
            
            <div id = "flex-col">
            <div>
            <RadioButtonsGroup
              index = {index}
              options={["Alive"]}
              selectedOption={additionalOptions}
              onChange={handle6OptionChange}
              topLevel={false}
            />
            <label>
            <span className="disabled-text">
              <input
                type="radio"
                checked={false}
                disabled
              />
              Mechanistic
            </span>
            </label>
            </div>
            <Tree option={selectedOptions} folder="folder3" selectedOptions={selectedOption} additionalOption={additionalOptions[0]} onSelect={handleTreeOptionChange} />
            <Tree option={selectedOptions} folder="folder4" selectedOptions={selectedOption} additionalOption={additionalOptions[0]} onSelect={handleTreeOptionChange} />
            </div>
          </>
        )}
        {selectedOptions[0] === "Bad" && (
          <>
          <div id = "flex-col">
            <div>
            <label>
            <span className="disabled-text">
              <input
                type="radio"
                checked={false}
                disabled
              />
              Safe
            </span>
            </label>
            <RadioButtonsGroup
              index = {index}
              options={["Dangerous"]}
              selectedOption={additionalOptions}
              onChange={handle6OptionChange}
              topLevel={false}
            />
            </div>
            <Tree option={selectedOptions} folder="folder5" selectedOptions={selectedOption} additionalOption={additionalOptions[0]} onSelect={handleTreeOptionChange} />
            </div>

            <div id = "flex-col">
            <div>
            <label>
            <span className="disabled-text">
              <input
                type="radio"
                checked={false}
                disabled
              />
              Enticing
            </span>
            </label>
            <RadioButtonsGroup
              index = {index}
              options={["Dull"]}
              selectedOption={additionalOptions}
              onChange={handle6OptionChange}
              topLevel={false}
            />
            </div>
            <Tree option={selectedOptions} folder="folder6" selectedOptions={selectedOption} additionalOption={additionalOptions[0]} onSelect={handleTreeOptionChange} />
            </div>

            <div id = "flex-col">
            <div>
            <label>
            <span className="disabled-text">
              <input
                type="radio"
                checked={false}
                disabled
              />
              Alive
            </span>
            </label>
            <RadioButtonsGroup
              index = {index}
              options={["Mechanistic"]}
              selectedOption={additionalOptions}
              onChange={handle6OptionChange}
              topLevel={false}
            />
            </div>
            <Tree option={selectedOptions} folder="folder7" selectedOptions={selectedOption} additionalOption={additionalOptions[0]} onSelect={handleTreeOptionChange} />
            <Tree option={selectedOptions} folder="folder8" selectedOptions={selectedOption} additionalOption={additionalOptions[0]} onSelect={handleTreeOptionChange} />
            </div>
          </>
        )}
      </div>
    </>
  );
}


function App() {
  const [optionSets, setOptionSets] = useState([0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageData, setPageData] = useState([]);
  const [text, setText] = useState('');
  const [resetOptions, setResetOptions] = useState(false);
  const [savedPages, setSavedPages] = useState([]);
  const [isDuplicated, setIsDuplicated] = useState(false);
  const [duplicateOption, setDuplicateOption] = useState('Bad');
  const [instruction, setInstruction] = useState('Choose one of Good, Bad');
  const [data, setData] = useState(null);
  const [showSubmit, setShowSubmit] = useState(false);

  useEffect(() => {
    setResetOptions(true);
    fetch('/dataset.json')
      .then(response => response.json())
      .then(dataset => {
        setTotalPages(dataset.pages.length);
        setPageData(dataset.pages);
        setText(dataset.pages[currentPage - 1].content);
      })
      .catch(error => console.error('Error loading text content:', error));
  }, [currentPage]);

  // useEffect(() => {
  //   console.log('data coming: ', data);
  //   if(resetOptions){

  //   }
  //   if(data!=null && data.page===currentPage && data.options) {
  //     // setSelectedOptions([data.options[index].options[0]]);
  //     // console.log(selectedOptions);
  //     // setAdditionalOptions(data.options[index].additionalOptions);
  //     // console.log(additionalOptions);
  //     // setSelectedOption(data.options[index].selectedOption);
  //     // console.log(selectedOption);
  //     setOptionSets([data.options]);
  //   }
  //   // else {
  //   //   setSelectedOptions([]);
  //   //   setAdditionalOptions(null);
  //   //   setSelectedOption([]);
  //   // }
  // }, [currentPage, resetOptions, data]);

  useEffect(()=>{
    setInstruction('Choose one of Good, Bad')
    if(optionSets[0].option==='Good')
      setDuplicateOption('Bad');
    else
      setDuplicateOption('Good');
    if(resetOptions){
      setIsDuplicated(false);
      if(optionSets.length>1){
        setOptionSets(optionSets.splice(1,1));
      }
      setResetOptions(false);
    }
  },[resetOptions, currentPage])

  useEffect(() => {
    fetch(`http://localhost:4000/getByID/${currentPage}`)
      .then(response => {
        if (!response.ok) {
          setData(null)
          throw new Error('Network response was not ok');
        }
        // console.log('data is: ', response);
        return response.json();
      })
      .then(data => {
        console.log('data in App is: ', data);
        // setOptionSets(data.options.map(option => ({ options: option.options[0], additionalOptions: option.additionalOptions, selectedOption: option.selectedOption })));
        // setOptionSets([data.options[0].options[0], data.options[0].additionalOptions, data.options[0].selectedOption]);
        // setOptionSets(prevOptionSets => {
        //   const updatedOptionSets = [...prevOptionSets];
        //   updatedOptionSets[0] = { ...updatedOptionSets[0], options: data.options };
        //   return updatedOptionSets;
        // });
        setData(data);
        if(data!=null && data.page===currentPage && data.optionSets) {
          setOptionSets([{...data.optionSets[0]}])
          setSavedPages([...savedPages, currentPage])
          if(data.optionSets.length === 2) {
              setOptionSets(prevOptionSets => {
                const currOptionSets = [{...prevOptionSets[0]}]
                currOptionSets.push({...data.optionSets[1]})
                return currOptionSets;
              })
            }
        }
        // if(data!=null && data.page===currentPage && data.options) {
        //   // setSelectedOptions([data.options[index].options[0]]);
        //   // console.log(selectedOptions);
        //   // setAdditionalOptions(data.options[index].additionalOptions);
        //   // console.log(additionalOptions);
        //   // setSelectedOption(data.options[index].selectedOption);
        //   // console.log(selectedOption);
        //   // setOptionSets(data.options);
        //   setOptionSets(prevOptionSets => {
        //   const updatedOptionSets = [...prevOptionSets];
        //   updatedOptionSets[0] = { ...updatedOptionSets[0],  options: data.options };
        //   return updatedOptionSets;
        // });
        // }

      })
      .catch(error => {
        // setError('Error retrieving data');
        console.error('Error retrieving data:', error);
      });
  }, [currentPage]);
//  const getByID = (pageID) => {
//   // const pageID = 13; // Example pageID, you can set it dynamically
//     fetch(`http://localhost:4000/getByID/${pageID}`)
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         // console.log('data is: ', response);
//         return response.json();
//       })
//       .then(data => {
//         console.log('data is: ', data);
//         setOptionSets(data.options.map(option => ({ option: option.options[0], selectedOption: option.selectedOption[0] })));
//       })
//       .catch(error => {
//         // setError('Error retrieving data');
//         console.error('Error retrieving data:', error);
//       });
//   }
useEffect(() => {
  // Check if the current page is the last page
  if (currentPage === totalPages) {
    setShowSubmit(true);
  } else {
    setShowSubmit(false);
  }
}, [currentPage, totalPages]);

useEffect(() => { 
  if(optionSets.length==2)
    setIsDuplicated(true);
},[optionSets.length])

useEffect(() => {
  updateSavedPages();
}, []);

const updateSavedPages = async () => {
  try {
    const response = await fetch('http://localhost:4000/data');
    if (!response.ok) {
      throw new Error('Error fetching data');
    }
    const jsonData = await response.json();
    console.log(jsonData);
    const totalPages = jsonData.length;
    const existingPages = [];
    for (let i = 0; i < totalPages; i++) {
      existingPages.push(jsonData[i].page);
    }
    setSavedPages(existingPages);
  } catch (error) {
    console.error('Error updating saved pages:', error);
  }
};

  const handleOptionChange = useCallback(function handleOptionChange(options, index) {
    console.log(options, index);
    if(options[0]==='Bad'){
      setDuplicateOption('Good');
      setInstruction("You chose Bad. Now, choose one secondary from Dangerous, Dull and Mechanistic.")
    }
    else if (options[0] === 'Good') {
      setDuplicateOption('Bad');
      setInstruction('You chose Good. Now, choose one secondary from Safe, Enticing and Alive.');
    }
    // if(options[0]==='Good')
    // setInstruction("Good! Now, Choose one secondary primal good.")
    // else
    //   setDuplicateOption('Bad');
      const currentOption = options[0];
      const currentOptionSetObject = {options: currentOption}
    if(index === 0) {
      setOptionSets([currentOptionSetObject]);
      setIsDuplicated(false)
    }
    else {
      setOptionSets(prevOptionSets => {
        const currentOptionSets = [{...prevOptionSets[0]}, currentOptionSetObject]
        return currentOptionSets;
      }) 
    }
  }, []);

  const handleAdditionalOptionChange = useCallback(function handleAdditionalOptionChange(additionalOptions, index) {
    console.log('additional option is: ', additionalOptions);
    if(additionalOptions.length>0)
    setInstruction('Now, choose one from the tertiaries available.');     
      setOptionSets(prevOptionSets => {
        let currentOptionSets = [{...prevOptionSets[0]}];
        if(index === 1)
          currentOptionSets = [{...prevOptionSets[0]}, {...prevOptionSets[1]}]
        currentOptionSets[index].additionalOptions = additionalOptions[0];
        return currentOptionSets;
      });
  }, []);

  const handleTreeOptionChange = (selectedOption, index) => {
    console.log('tertiary is: ', selectedOption);
    if(selectedOption.length>0)
    setInstruction('Great! Now save your selections by clicking on Save Annotations button.');  
    setOptionSets(prevOptionSets => {
      let currentOptionSets = [{...prevOptionSets[0]}];
      if(index === 1)
        currentOptionSets = [{...prevOptionSets[0]}, {...prevOptionSets[1]}]
      currentOptionSets[index].selectedOption = selectedOption[0];
      return currentOptionSets;
    });
  };

  const handleDuplicateOptions = () => {
    if(
      !optionSets[0].options ||
      !optionSets[0].additionalOptions ||
      !optionSets[0].selectedOption
    ) {
      alert('Please select one primary, one secondary, and one tertiary primals before saving annotations.');
      console.log("Please select one primary, one secondary, and one tertiary primals before saving annotations.");
      return;
    }
    if(optionSets.length>1 && (
      !optionSets[1].options ||
      !optionSets[1].additionalOptions ||
      !optionSets[1].selectedOption)
    ) {
      alert('Please select one primary, one secondary, and one tertiary primals before saving annotations.');
      console.log("Please select one primary, one secondary, and one tertiary primals before saving annotations.");
      return;
    }
    setIsDuplicated(true);
    console.log("option sets after duplication:", optionSets)
    // Check if the current number of option sets is less than 3 before adding a new duplicate
    if (optionSets.length < 2) {
      setOptionSets(prevOptionSets => {
        const lastOptionSet = prevOptionSets[prevOptionSets.length - 1];
        const newOptionSets = [...prevOptionSets, {}];
        console.log("new option sets:", newOptionSets)
        return newOptionSets;
      });
    } else {
      alert('Maximum number of duplicate copies reached.');
      console.log("Maximum number of duplicate copies reached.");
    }
  };
  const handlePageChange = (index) => {
    setCurrentPage(index + 1)
    setOptionSets([0])
  }

  const handleSaveAnnotations = async () => {  
    // Check if one option, one additionalOption, and one treeOption are selected for each option set
    for (const optionSet of optionSets) {
      console.log(optionSets);
      if (
        !optionSet.options ||
        !optionSet.additionalOptions ||
        !optionSet.selectedOption
      ) {
        alert('Please select one primary, one secondary, and one tertiary primals before saving annotations.');
        console.log("Please select one primary, one secondary, and one tertiary primals before saving annotations.");
        return;
      }
    }
  
    // Filter out null values from optionSets
    const currentPageOptions = optionSets
      .slice(0, pageData.length)
      .filter(options => options !== null);
    
    const dataToSave = {
      page: currentPage,
      optionSets: currentPageOptions,
    };
    console.log("data to save:", dataToSave)
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
        setInstruction('Done! You can go to the next page or add another set of annotations by clicking on Add Good / Add Bad button.'); 
        alert('Data saved successfully');
        console.log('Data saved successfully');
        setSavedPages([...savedPages, currentPage]);
        console.log('total pages is: ', totalPages);
      } else {
        alert('Failed to save data');
        console.error('Failed to save data:', response.statusText);
      }
    } catch (error) {
      alert('Exception occurred. Check console for details');
      console.error('Error saving data:', error);
    }
  };

    const handleNext = async () => {
      try {
    if (!savedPages.includes(currentPage)) {
      await handleSaveAnnotations(currentPage);
      for (const optionSet of optionSets)
      if(optionSet.options &&
        optionSet.additionalOptions &&
        optionSet.selectedOption) {
          if (currentPage < totalPages) {
            resetPageOptions();
            setCurrentPage(currentPage + 1);
          }
        }
    }

    // Navigate to the next page if not already on the last page
    else if (currentPage < totalPages) {
      resetPageOptions();
      setCurrentPage(currentPage + 1);
    }
    } catch(error) {
      console.error('Error in handleNext:', error);
      alert('Error occurred while saving annotations. Check console for details.');
    }
  };

  const handlePrev = async () => {
    if (!savedPages.includes(currentPage)) {
      await handleSaveAnnotations(currentPage);
      for (const optionSet of optionSets)
      if(optionSet.options &&
        optionSet.additionalOptions &&
        optionSet.selectedOption) {
          if (currentPage > 1) {
            resetPageOptions();
            setCurrentPage(currentPage - 1);
          }
    }
  }
    else if (currentPage > 1) {
      resetPageOptions();
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!savedPages.includes(currentPage)) {
        await handleSaveAnnotations(currentPage);
        for (const optionSet of optionSets)
        if(optionSet.options &&
          optionSet.additionalOptions &&
          optionSet.selectedOption) {
            if (currentPage < totalPages) {
              resetPageOptions();
              setCurrentPage(currentPage + 1);
            }
          }
          alert('Data saved. You reached the end, now you may close the browser.');
      }
  
      // Navigate to the next page if not already on the last page
      else if (currentPage < totalPages) {
        resetPageOptions();
        setCurrentPage(currentPage + 1);
      }
      } catch(error) {
        console.error('Error in submit:', error);
        alert('Error occurred while saving annotations. Check console for details.');
      }
    // Additional code to close the browser if needed
  };

  const resetPageOptions = () =>{
     setResetOptions(true);
     setInstruction('Choose  one of Good, Bad.')
  }

  return (
    <div className="app-container">
        <textarea
          className='text-box'
          rows="5"
          value={text}
          readOnly
        />
        <h5 className='instructions'>
          {instruction}
        </h5>
        <div className="main-content">
        {console.log(optionSets)}
        {optionSets.map((_, index) => (
          <OptionSet
            key={index}
            index={index}
            onOptionChange={handleOptionChange}
            onAdditionalOptionChange={handleAdditionalOptionChange}
            onTreeOptionChange={handleTreeOptionChange}
            currentPage={currentPage}
            resetOptions = {resetOptions}
            data = {data}
            optionSets = {optionSets}
          />
        ))}
        <footer className="footer">
          <button className="footer-button" onClick={handleDuplicateOptions} disabled={isDuplicated} >
            Add {duplicateOption} </button>
          <button className="footer-button" onClick={handleSaveAnnotations}>Save Annotations</button>
          <button onClick={handlePrev} disabled={currentPage === 1}>Prev</button>
          <span className="page-info">Page {currentPage} of {totalPages}</span>
          {showSubmit && (
            <button onClick={handleSubmit} className="submit-button" disabled={savedPages.length===totalPages?false:true}>
                Submit
              </button>
            )}
          {!showSubmit && (
            <button onClick={handleNext} className="next-button">
                Next
              </button>
            )}
          </footer>
      </div>
      <div className="navbar" style={{ textAlign: 'left', backgroundColor: '#fafafa', padding: '10px' }}>
        <h3>Pages</h3>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {pageData.map((page, index) => (
            <li key={index} style={{ margin: '10px 0', padding: '4px', cursor: 'pointer', backgroundColor: currentPage === index + 1 ? '#bcbcbc' : '#eee', color: currentPage === index + 1 ? '#fff' : '#000' }}>
              <a href='#' onClick={() => setCurrentPage(index + 1)} style={{ textDecoration: 'none' }}>
                {`Page ${index + 1}`}
                {savedPages.includes(index + 1) && <span style={{ color: 'green', marginLeft: '5px' }}>&#10003;</span>}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}



export default App;
