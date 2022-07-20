import { useEffect, useState } from "react";
import { AreaChart , XAxis, YAxis, ResponsiveContainer, Area, Tooltip } from "recharts";
import useWindowDimensions from "./hooks/useWindowDimensions";

const TemperatureChart = () => {

    const { height } = useWindowDimensions();
    const [data, setData] = useState(null);

    useEffect(() => {

        const today = new Date();
        const dateString = today.getFullYear() + "-" + ("0" + (today.getMonth() + 1)).slice(-2) + "-" + today.getDate();
        console.log(dateString);
        fetch('https://fn-temps.azurewebsites.net/api/TempsForDay?code=YxXpJgCmX6bnkVNXWN78CtErhAcb8I_4_6btELeCh1iYAzFuYnycaQ==&date='+dateString)
            .then(response => response.json())
            .then(result => setData(result));

        const onUnmout = () => {

        };

        return onUnmout;
    }, []);

    if (data == null) {
        return <div>loading data ...</div>
    }

    return (

        <section className='chart-section'>
            <ResponsiveContainer width="95%" height={height*0.85} >
            <AreaChart  data={data}>
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Area dataKey="temperature" stroke="#8884d8" fill="#8884d8" />
            </AreaChart >
            </ResponsiveContainer>
        </section>
    );

}

export default TemperatureChart;