import { useState, useEffect } from "react";
import React from "react";

const Weather = () => {

    const [city, setCity] = useState(null)
    const [search, setSearch] = useState('Mumbai');
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        setTimeout(() => {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=26a0352a79eaa18d6cc69fe1c70f6673`)
                .then(response => {
                    // console.log(response.data)
                    if(!response.ok){
                        throw Error("Could not fetch")
                    }
                    return response.json()
                })
                .then(result => {
                    setCity(result.main)
                    console.log(result);
                    setIsPending(false)
                    setError(null)
                })
                .catch((err) => {
                    setError(err.message)
                    console.log(err.message);
                })
        }, 1000)
    }, [search])

    return (
        <>
            <div className="card">
                <div className="inputData">
                    <input type="text"
                        className="inputField"
                        onChange={(e) => {
                            setSearch(e.target.value)
                        }} />
                </div>
                <div className="info">
                        {error && <div>{ error }</div>}
                        {isPending && <div>Loading.....</div>}
                        {city && <React.Fragment><h2 className="location">{search}</h2>
                        <h1 className="temp">{city.temp}</h1>
                        <h3 className="tempmax-min"> Min : 5.25°C | Max : 5.25°C</h3></React.Fragment> }
                    </div>

            </div>

        </>
    )
}
export default Weather