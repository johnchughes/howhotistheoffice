import './App.scss';
import { useEffect, useState } from 'react';
import TodaysTemperatures from './TodaysTemperatures';
import Weather from './Weather';


function App() {

  const [colour, setColour] = useState('yellow');
  const [reading, setReading] = useState(null);
  const [error, setError] = useState(null);

  const fetchReadingData = () => {
    fetch('https://fn-temps.azurewebsites.net/api/temps?code=1sZNGbf5LX9o6eil2yQcgTKFGUPWv4klDBtfRfJqzcwEAzFuu7KIcw==')
      .then((response) => response.json())
      .then((data) => setReading(data))
      .catch(err => {
        setError(err);
      })
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
  const FormatTimeStamp = (timestamp) => {
    const now = new Date(timestamp);
    now.setHours(now.getHours() - 1);
    return now.toLocaleString();
  }

  useEffect(() => {
    if (reading == null) return;
    const hexValue = getColourForTemperature(reading.temperature);
    setColour(hexValue);
  }, [reading]);

  if(error != null) {
    return (
      <main>
        <section className='App' >
        <div className='temp-wrapper'>
          <div className='temperature' style={{ backgroundColor: "black" }}>
            <h1>Fuck</h1>
            <p>Something went wrong ... </p>
          </div>
        </div>
      </section>
      </main >
    );
  }

  if (reading == null) {
    return (
      <main>
        <section className='App' >
        <div className='temp-wrapper'>
          <div className='temperature' style={{ backgroundColor: "pink" }}>
            <h1>Loading .... </h1>
          </div>
        </div>
      </section>
      </main >
    );
  }

  return (
    <main>
      <section className='App' >
        <Weather></Weather>
        <div className='temp-wrapper'>
          <div className='temperature' style={{ backgroundColor: colour }}>
            <h2>current office temp</h2>
            <h1>{Math.round(reading.temperature * 10) / 10}<sup>&#8451;</sup></h1>
            <p>{FormatTimeStamp(reading.temperatureTimeStamp)}</p>
          </div>
        </div>
        <TodaysTemperatures onColourPick={getColourForTemperature} />
      </section>
    </main>
  );
}

export default App;
