import './App.scss';
import { useEffect, useState } from 'react';
import TodaysTemperatures from './TodaysTemperatures';
import Weather from './Weather';
import Temperature from './Temperature';

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
        <Temperature reading={reading} colour={colour}></Temperature>
        <TodaysTemperatures onColourPick={getColourForTemperature} />
      </section>
    </main>
  );
}

export default App;
