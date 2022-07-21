import { useEffect, useState } from "react";
import *  as ColorScale from 'color-scales';
import useWindowDimensions from "./hooks/useWindowDimensions";

const TodaysTemperatures = () => {

    const [data, setData] = useState(null);
    const { width } = useWindowDimensions();

    const getColourForTemperature = (TemperatureChart) => {
        const colorScale = new ColorScale(1, 100, ["#1d69b5","#1d69b5","#69b51d","#69b51d","#69b51d","#69b51d","#b5781d","#b5361d"]);
        const colourIndex = (TemperatureChart/30)*100
        const hexValue = colorScale.getColor(colourIndex).toHexString(); // returns "rgba(127,127,127, 0.5)"
        return hexValue;
      }
    

    useEffect(() => {

        const today = new Date();
        const dateString = today.getFullYear() + "-" + ("0" + (today.getMonth() + 1)).slice(-2) + "-" + today.getDate();
        //const dateString = "2022-07-20";
        fetch('https://fn-temps.azurewebsites.net/api/TempsForDay?code=YxXpJgCmX6bnkVNXWN78CtErhAcb8I_4_6btELeCh1iYAzFuYnycaQ==&date='+dateString)
            .then(response => response.json())
            .then(result => setData(result));

        const onUnmout = () => {

        };
        return onUnmout;
    }, []);


    if(data == null) {
        return <li></li>
    }

    const DayBars = data.map((x,i) => {
        const liHeight = x.temperature +"vh";
        const liWidth = ((width/24)-2) + "px";
        return <li key={i} style={{height: liHeight, width: liWidth, backgroundColor: getColourForTemperature(x.temperature)}}></li>
      });
    

    return (
        <div className='today'>
            <ul>
                {DayBars}
            </ul>
        </div>
    );

}

export default TodaysTemperatures;