import './App.scss';
import { useEffect, useState } from 'react';
import *  as ColorScale from 'color-scales';

function App() {

  const [colour, setColour] = useState('yellow');
  const [reading, setReading] = useState(null);
 
  
 
  const fetchReadingData = () => {
    fetch('https://fn-temps.azurewebsites.net/api/temps?code=1sZNGbf5LX9o6eil2yQcgTKFGUPWv4klDBtfRfJqzcwEAzFuu7KIcw==')
      .then((response) => response.json())
      .then((data) => setReading(data));
  }

  useEffect(() => {
    fetchReadingData();
    const interval = setInterval(fetchReadingData, 150000);

    return () => {
      clearInterval(interval);
    }
  }, []);

  useEffect(() => {
    if(reading == null)return;
    const colorScale = new ColorScale(1, 100, ["#2e59e6","#76cf29", "#d9d443", "#c74734"]);
    const colourIndex = (reading.temperature/30)*100
    const hexValue = colorScale.getColor(colourIndex).toHexString(); // returns "rgba(127,127,127, 0.5)"
    setColour(hexValue);
  }, [reading]);

  if (reading == null) {
    return (
      <div>figuring out the temp ... </div>
    );
  }

  return (
    <div className='App'>
      <section className='climate' >
        <h1>How hot is John's office</h1>
        <div className='temperature' style={{ backgroundColor: colour }}>
          <h1>{Math.round(reading.temperature * 10) / 10}&#8451;</h1>
        </div>
      </section>
      <section className='chart-section'>
          this is graph space.
      </section>
    </div>
  );
}

export default App;
