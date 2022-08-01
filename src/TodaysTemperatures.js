import { useEffect, useState } from "react";
import useWindowDimensions from "./hooks/useWindowDimensions";

const TodaysTemperatures = ({onColourPick}) => {

    const [data, setData] = useState(null);
    const { width } = useWindowDimensions();


    useEffect(() => {


        const today = new Date();
        const dateString = today.getFullYear() + "-" + ("0" + (today.getMonth() + 1)).slice(-2) + "-" + (today.getDate() + "").padStart(2, "0");
        console.log(dateString);
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
        return <li key={i} style={{height: liHeight, width: liWidth}}>
            <div className='colour-dot' style={{ backgroundColor: colour}}></div>
            <p>{x.temperature}<sup>&#8451;</sup></p>
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