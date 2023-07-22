import React, { useState, useCallback } from 'react';

import './App.css';
import Button from './components/UI/Button/Button';
import DemoOutput from './components/UI/Button/Demo/DemoOutput';

function App() {
  console.log('APP RUNNING');
  
  const [showParagraph, setShowParagraph] = useState(false);
  const [allowToggle, setAllowToggle] = useState(false);

  const paragraphHandler = useCallback(() => {
    if (allowToggle) {
      setShowParagraph((s) => !s);
    }
  }, [allowToggle]);

  const allowToggleHandler = () => {
    setAllowToggle(!allowToggle);
  };

  return (
    <div className="app">
      <h1>Hi there!</h1>
      {allowToggle && <p>toggle allowed</p>}
      <Button onClick={allowToggleHandler}>allow toggle</Button>
      <DemoOutput show={showParagraph} />
      <Button onClick={paragraphHandler}>toggle paragraph!</Button>
    </div>
  );
}

export default App;
