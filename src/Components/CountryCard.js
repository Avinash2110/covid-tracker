import React from 'react'
import "./CountryCard.css";
import { Chart } from "react-google-charts";

const CountryCard = (props) => {
    return (
        <div className="chart-container">
                <Chart
                    width={'100%'}
                    height={'100%'}
                    chartType="Bar"
                    loader={<div>Loading Chart</div>}
                        data={[
                            ['Cases Type', 'Cases', 'Deaths', 'Recovered'],
                            ['Total', props.cases, props.deaths, props.recovered],
                        ]}
                    options={{
                    // Material design options
                        chart: {
                            title: `${props.title} Covid Cases`,
                            subtitle: 'Cases, Deaths and Recoveries',
                        },
                        colors: ['#EDC126', '#BF3325', '#00D84A']
                    }}
                />
        </div>
    )
}

export default CountryCard;
