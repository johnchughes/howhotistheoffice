import './App.scss';
import { useEffect, useState } from 'react';
import *  as ColorScale from 'color-scales';
import TodaysTemperatures from './TodaysTemperatures';

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
    const colorScale = new ColorScale(1, 100, ["#1d69b5","#1d69b5","#69b51d","#69b51d","#69b51d","#69b51d","#b5781d","#b5361d"]);
    const colourIndex = (reading.temperature/30)*100
    const hexValue = colorScale.getColor(colourIndex).toHexString(); // returns "rgba(127,127,127, 0.5)"
    setColour(hexValue);
  }, [reading]);

  if (reading == null) {
    return (
      <div>its friday yeah!</div>
    );
  }

  return (
    <div className='App'>
      <section className='climate' >
        <div className='title'>
          <h1>&nbsp;</h1>
        </div>
        <div className='temperature' style={{ backgroundColor: colour }}>
          <h1>{Math.round(reading.temperature * 10) / 10}&#8451;</h1>
        </div>
        <TodaysTemperatures />
      </section>
    </div>
  );
}

export default App;
