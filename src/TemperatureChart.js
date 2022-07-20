import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import useWindowDimensions from "./hooks/useWindowDimensions";

const TemperatureChart = () => {

    const { height, width } = useWindowDimensions();
    const [data, setData] = useState(null);

    useEffect(() => {

        fetch('https://fn-temps.azurewebsites.net/api/TempsForDay?code=YxXpJgCmX6bnkVNXWN78CtErhAcb8I_4_6btELeCh1iYAzFuYnycaQ==&date=2022-07-20')
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
            <ResponsiveContainer width="95%" height={height*0.9} >
            <LineChart data={data}>
                <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
                <XAxis dataKey="time" />
                <YAxis />
            </LineChart>
            </ResponsiveContainer>
        </section>
    );

}

export default TemperatureChart;