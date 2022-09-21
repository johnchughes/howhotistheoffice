import { useEffect, useState } from "react";
import useWindowDimensions from "./hooks/useWindowDimensions";

const TodaysTemperatures = ({onColourPick}) => {

    const [data, setData] = useState(null);
    const { width } = useWindowDimensions();


    useEffect(() => {
        const dateString = (new Date()).toISOString().slice(0, 10);
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
        const colour = onColourPick(x.temperature);

        const temp = x.temperature > 0 ? <p>{x.temperature}<sup>&#8451;</sup></p> : <></>;
        const dot = x.temperature > 0 ? <div className='colour-dot' style={{ backgroundColor: colour}}></div> : <></>;

        return <li key={i} style={{height: liHeight, width: liWidth}}>
            {dot}
            {temp}
        </li>
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