import './App.css';
import { useEffect, useState } from 'react';
import *  as ColorScale from 'color-scales';

function App() {

  const [colour, setColour] = useState('yellow');
  const [reading, setReading] = useState(null);
 
  const colorScale = new ColorScale(1, 100, ["#2e59e6","#76cf29", "#d9d443", "#c74734"]);
 
  const fetchReadingData = () => {
    fetch('https://fn-temps.azurewebsites.net/api/temps?code=1sZNGbf5LX9o6eil2yQcgTKFGUPWv4klDBtfRfJqzcwEAzFuu7KIcw==')
      .then((response) => response.json())
      .then((data) => setReading(data));
  }

  useEffect(() => {
    fetchReadingData();
    const interval = setInterval(fetchReadingData, 150000);
  }, []);

  useEffect(() => {
    if(reading == null)return;
    const colourIndex = (reading.temperature/30)*100
    const hexValue = colorScale.getColor(colourIndex).toHexString(); // returns "rgba(127,127,127, 0.5)"
    setColour(hexValue);
  }, [reading]);

  const onNumberChanged = (event) => {
   
    setReading({ ...reading, temperature: event.target.value });
  }

  if (reading == null) {
    return (
      <div>Initial Fetch</div>
    );
  }

  return (
    <div className='App'>
      <div className='App-header' >
        <h1>How hot is Johns office</h1>
        <div className='temperature' style={{ backgroundColor: colour }}>
          <h1>{reading.temperature}</h1>
        </div>
      </div>

      
    </div>
  );
}

export default App;
