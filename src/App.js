import './App.scss';
import { useEffect, useState } from 'react';
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

  const getColourForTemperature = (temperature) => {
    if (temperature < 10) {
      return "#6DC0D5";
    }
    else if (temperature >= 10 && temperature <= 25) {
      return "#378D3A";
    }
    else if (temperature > 24 && temperature < 29) {
      return "#E38A36";
    }
    else {
      return "#AB3428"
    }
  }

  useEffect(() => {
    if (reading == null) return;
    const hexValue = getColourForTemperature(reading.temperature);
    setColour(hexValue);
  }, [reading]);

  if (reading == null) {
    return (
      <div>its friday yeah!</div>
    );
  }

  // const onChange = (event) => {
  //   setReading({...reading, temperature: event.target.value});
  // }

  const FormatTimeStamp = (timestamp) => {
    const now = new Date(timestamp);
    now.setHours(now.getHours() - 1);
    return now.toLocaleString();
  }

  return (
    <div className='App'>
      {/* <input type="number" onChange={onChange} /> */}
      <section className='climate' >
        <div className='title'>
          <h1>&nbsp;</h1>
        </div>
        <div className='temp-wrapper'>
          <div className='temperature' style={{ backgroundColor: colour }}>
            <h1>{Math.round(reading.temperature * 10) / 10}&#8451;</h1>
            <span>{FormatTimeStamp(reading.temperatureTimeStamp)}</span>
          </div>
        </div>
        <TodaysTemperatures onColourPick={getColourForTemperature} />
      </section>
    </div>
  );
}

export default App;
