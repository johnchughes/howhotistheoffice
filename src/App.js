import './App.scss';
import { useEffect, useState } from 'react';
import TodaysTemperatures from './TodaysTemperatures';
import Weather from './Weather';


function App() {

  const videos = [
    "https://www.youtube.com/embed/fyrAPtWLwCs",
    "https://www.youtube.com/embed/46XPGSlliik",
    "https://www.youtube.com/embed/Vqbk9cDX0l0"
  ]

  const rando = Math.floor(Math.random() * (videos.length));
  
  console.log(rando);

  return (
    <main>

      <section className='App' >
        <h1>why the fuckington stanley are you here?</h1>
        <iframe width="560" height="315" src={videos[rando]} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      </section> 
      </main>
  );
}

export default App;
