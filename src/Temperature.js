const Temperature = (reading, colour) => {


    const FormatTimeStamp = (timestamp) => {
        const now = new Date(timestamp);
        now.setHours(now.getHours() - 1);
        return now.toLocaleString();
      }

    return (
        <div className='temp-wrapper'>
          <div className='temperature' style={{ backgroundColor: colour }}>
            <h2>current office temp</h2>
            <h1>{Math.round(reading.temperature * 10) / 10}<sup>&#8451;</sup></h1>
            <p>{FormatTimeStamp(reading.temperatureTimeStamp)}</p>
          </div>
        </div>
    );
}

export default Temperature;