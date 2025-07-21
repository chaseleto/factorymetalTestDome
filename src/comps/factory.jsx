import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

function FactoryStatus() {
  const [factoryState, setFactoryState] = useState({
    sheets: true,
    beams: true,
    frame: true,
    bolts: true
  });

  const [outOfOrder, setOutOfOrder] = useState({
    sheets: false,
    beams: false,
    frame: false,
    bolts: false
  });

  useEffect(() => {
    setOutOfOrder(prevState => {
      const updatedState = { ...prevState };
      
      if (!factoryState.sheets) {
        updatedState.beams = true;
        updatedState.frame = true;
      } else {
        updatedState.beams = false;
        if (!factoryState.beams || !factoryState.bolts) {
          updatedState.frame = true;
        } else {
          updatedState.frame = false;
        }
      }
      
      return updatedState;
    });
  }, [factoryState.sheets, factoryState.beams, factoryState.bolts]);

  const toggleComponent = (component) => {
    setFactoryState(prevState => ({
      ...prevState,
      [component]: !prevState[component]
    }));
  };

  const getStatusColor = (component) => {
    if (!factoryState[component] || outOfOrder[component]) {
      return "red";
    }
    return "";
  };

  return (
    <div>
      <h3>Control Panel</h3>
      <div> 
        <input 
          type="checkbox" 
          id="sheets-status" 
          checked={factoryState.sheets}
          onChange={() => toggleComponent('sheets')}
        />
        <span 
          id="sheets-station" 
          style={{ backgroundColor: getStatusColor('sheets') }}
        >
          SHEETS
        </span>
      </div>
      <div> 
        <input 
          type="checkbox" 
          id="beams-status" 
          checked={factoryState.beams}
          onChange={() => toggleComponent('beams')}
        /> 
        <span 
          id="beams-station" 
          style={{ backgroundColor: getStatusColor('beams') }}
        >
          BEAMS
        </span>
      </div>
      <div> 
        <input 
          type="checkbox" 
          id="bolts-status" 
          checked={factoryState.bolts}
          onChange={() => toggleComponent('bolts')}
        />
        <span 
          id="bolts-station" 
          style={{ backgroundColor: getStatusColor('bolts') }}
        >
          BOLTS
        </span>
      </div>
      <div> 
        <input 
          type="checkbox" 
          id="frame-status" 
          checked={factoryState.frame}
          onChange={() => toggleComponent('frame')}
        />
        <span 
          id="frame-station" 
          style={{ backgroundColor: getStatusColor('frame') }}
        >
          FRAME
        </span>
      </div>
    </div>
  );
}

export default FactoryStatus;