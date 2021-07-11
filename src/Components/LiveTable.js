import React, {useState, useEffect} from 'react'
import {fetchCountryData} from "../apiCalls";
import {sortData} from "../util.js";
import "./LiveTable.css";

const LiveTable = ({ranking}) => {

    const [countryData, setCountryData] = useState([]);

    const getData = () =>{
        fetchCountryData()
        .then(data =>{
            const sortedData = sortData(data, ranking);
            setCountryData(sortedData);
        })
    }

    useEffect(()=>{
        getData();
    }, [ranking])

    return (
        <div className="table-container">
            <table className="table">
                <tbody className="table-body">
                    {countryData.map((country, index)=>{
                        return <tr key={index}>
                                <td>{country.country}</td>
                                <td>{country[ranking]}</td>
                            </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default LiveTable
