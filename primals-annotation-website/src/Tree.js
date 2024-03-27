
import React, { useState, useEffect } from 'react';
import './App.css';
export default function Tree({ option, folder, selectedOptions, additionalOption, onSelect }) {
    const [resetOptions, setResetOptions] = useState(false);
  
    useEffect(()=>{
      // if(optionSets[0].option==='Good')
      //   setDuplicateOption('Bad');
      // else
      //   setDuplicateOption('Good');
      if(resetOptions){
        // setIsDuplicated(false);
        // if(optionSets.length>1){
        //   setOptionSets(optionSets.splice(1,1));
        // }
        setResetOptions(false);
      }
    },[resetOptions])
  
    const treeData = {
      folder1: ["Pleasurable", "Regenerative", "Progressing", "Harmless", "Cooperative", "Stable", "Just"],
      folder2: ["Interesting", "Beautiful", "Abundant", "Worth Exploring", "Improvable", "Meaningful", "Funny"],
      folder3: ["Intentional", "Needs Me", "About Me"],
      folder4: ["Acceptable", "Changing", "Hierarchical", "Interconnected", "Understandable"],
      folder5: ["Miserable", "Degenerative", "Declining", "Threatening", "Competitive", "Fragile", "Unjust"],
      folder6: ["Boring", "Ugly", "Barren", "Not Worth Exploring", "Too Hard to Improve", "Meaningless", "Not Funny"],
      folder7: ["Unintentional", "Doesn't Need Me", "Indifferent"],
      folder8: ["Unacceptable", "Static", "Non Hierarchical", "Separable", "Too Hard To Understand"],
    };
  
    const handleOptionChange = (option) => {
      onSelect(option);
    };
  
    const resetPageOptions = () =>{
      setResetOptions(true);
   }
  
    const isOptionDisabled = (folderName) => {
      // resetPageOptions();
      return (additionalOption === "Safe" && (folderName === "folder2" || folderName === "folder3" || folderName === "folder7" || folderName === "folder5" || folderName === "folder6")) ||
             (additionalOption === "Enticing" && (folderName === "folder1" || folderName === "folder3" || folderName === "folder7" || folderName === "folder5" || folderName === "folder6")) ||
             (additionalOption === "Alive" && (folderName === "folder1" || folderName === "folder2" || folderName === "folder7" || folderName === "folder5" || folderName === "folder6")) ||
             (additionalOption === "Dangerous" && (folderName === "folder1" || folderName === "folder2" || folderName === "folder3" || folderName === "folder7" || folderName === "folder6")) ||
             (additionalOption === "Dull" && (folderName === "folder1" || folderName === "folder2" || folderName === "folder3" || folderName === "folder7" || folderName === "folder5")) ||
             (additionalOption === "Mechanistic" && (folderName === "folder1" || folderName === "folder2" || folderName === "folder3" || folderName === "folder6" || folderName === "folder5"));
    };
  if(option[0] === "Good")
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
                {(folder === "folder1" || folder === "folder2" || folder === "folder3" || folder === "folder4" ) && (
                  <label>
                    <input
                      type="radio"
                      value={treeData[`folder${parseInt(folder.slice(-1)) + 4}`][index]}
                      checked={false}
                      disabled
                    />
                    <span className="disabled-text">{treeData[`folder${parseInt(folder.slice(-1)) + 4}`][index]}</span>
                  </label>
                )}
                {/* {(folder === "folder4" || folder === "folder5" || folder === "folder6") && (
                  <label>
                    <input
                      type="radio"
                      value={treeData[`folder${parseInt(folder.slice(-1)) - 3}`][index]}
                      checked={false}
                      disabled
                    />
                    <span className="disabled-text">{treeData[`folder${parseInt(folder.slice(-1)) - 3}`][index]}</span>
                  </label>
                )} */}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  
    // if(option[1] === "Good")
    // return (
    //   <div className="tree-container">
    //     <div className="tree">
    //       <ul>
    //         {treeData[folder].map((option, index) => (
    //           <li key={option}>
    //             <label>
    //               <input
    //                 type="radio"
    //                 value={option}
    //                 checked={selectedOptions.includes(option)}
    //                 onChange={() => handleOptionChange(option)}
    //                 disabled={isOptionDisabled(folder)}
    //               />
    //               <span className={isOptionDisabled(folder) ? "disabled-text" : ""}>{option}</span>
    //             </label>
    //             {(folder === "folder1" || folder === "folder2" || folder === "folder3" || folder === "folder4" ) && (
    //               <label>
    //                 <input
    //                   type="radio"
    //                   value={treeData[`folder${parseInt(folder.slice(-1)) + 4}`][index]}
    //                   checked={false}
    //                   disabled
    //                 />
    //                 <span className="disabled-text">{treeData[`folder${parseInt(folder.slice(-1)) + 4}`][index]}</span>
    //               </label>
    //             )}
    //             {/* {(folder === "folder4" || folder === "folder5" || folder === "folder6") && (
    //               <label>
    //                 <input
    //                   type="radio"
    //                   value={treeData[`folder${parseInt(folder.slice(-1)) - 3}`][index]}
    //                   checked={false}
    //                   disabled
    //                 />
    //                 <span className="disabled-text">{treeData[`folder${parseInt(folder.slice(-1)) - 3}`][index]}</span>
    //               </label>
    //             )} */}
    //           </li>
    //         ))}
    //       </ul>
    //     </div>
    //   </div>
    // );
  
    else
    return (
      <div className="tree-container">
        <div className="tree">
          <ul>
            {treeData[folder].map((option, index) => (
              <li key={option}>
                {/* {(folder === "folder1" || folder === "folder2" || folder === "folder3") && (
                  <label>
                    <input
                      type="radio"
                      value={treeData[`folder${parseInt(folder.slice(-1)) + 3}`][index]}
                      checked={false}
                      disabled
                    />
                    <span className="disabled-text">{treeData[`folder${parseInt(folder.slice(-1)) + 3}`][index]}</span>
                  </label>
                )} */}
                {(folder === "folder5" || folder === "folder6" || folder === "folder7" || folder === "folder8" ) && (
                  <label>
                    <input
                      type="radio"
                      value={treeData[`folder${parseInt(folder.slice(-1)) - 4}`][index]}
                      checked={false}
                      disabled
                    />
                    <span className="disabled-text">{treeData[`folder${parseInt(folder.slice(-1)) - 4}`][index]}</span>
                  </label>
                )}
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
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }