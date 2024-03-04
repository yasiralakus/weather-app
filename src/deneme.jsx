import { useState } from "react";
import { useEffect } from "react"

export default function App() {

    const [apiData, setApiData] = useState(null);
    const [inputValue, setInputValue] = useState('istanbul');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false)

    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formObj = Object.fromEntries(formData);
        setInputValue(formObj.city)
    }

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=3a7fef278f1c4b4586b135731240401&q=${inputValue}&days=3&aqi=no&lang=tr`).then(r => r.json());

            if(data.error) {
                setError(true);
            } else {
                setApiData(data)
            }

            setLoading(false)

            
        }
        fetchData();
    }, [inputValue])

    console.log(loading)
    console.log(apiData)

    return (
        <>
        {error === true &&
        <div className="error">
            <div className="error-item">
                <button onClick={() => {setError(false)}}><i className="fa-solid fa-xmark"></i></button>
                <i className="fa-solid fa-triangle-exclamation"></i>
                <p>Girilen şehir ismi geçersiz. Türkçe karakterler kullanmadan aramayı deneyiniz.</p>
            </div>
        </div> }
        <div className="container">

            <header>

                <p>{apiData?.location.name} / {apiData?.location.country}</p>

                <form onSubmit={handleSubmit}>
                    <input type="text" name="city" placeholder="Şehir giriniz..." />
                    <button><i className="fa-solid fa-magnifying-glass"></i></button>
                </form>

            </header>

            

            {loading === true ? <div className="loading">
                <div className="loading-icon"></div>
            </div> :
            <>

            <div className="current">

                <div className="current-top">

                    <p>Son güncelleme: <span>{apiData?.current.last_updated.slice(11,16)}</span></p>
                    <h1>{apiData?.current.temp_c}°C</h1>
                    <h1>Hissedilen: <span>{apiData?.current.feelslike_c}°C</span></h1>
                    <div>
                        <h1>{apiData?.current.condition.text}</h1>
                        <img src={apiData?.current.condition.icon} alt="" />
                    </div>
                </div>
            </div>

            <main>

            {apiData?.forecast.forecastday.map(x => (

            <div className="day">

                <h1>{x.date.slice(8,10)}.{x.date.slice(5,7)}.{x.date.slice(0,4)}</h1>

                <div className="day-hour">

                    <h1>{x.hour[10].time.slice(11,16)}</h1>

                    <p>{x.hour[10].temp_c}°C</p>

                    <p>Hissedilen: {x.hour[10].feelslike_c}°C</p>

                    <div>
                        <h1>{x.hour[10].condition.text}</h1>
                        <img src={x.hour[10].condition.icon} alt="" />
                    </div>

                </div>

                <div className="day-hour">

                    <h1>{x.hour[14].time.slice(11,16)}</h1>

                    <p>{x.hour[14].temp_c}°C</p>

                    <p>Hissedilen: {x.hour[14].feelslike_c}°C</p>

                    <div>
                        <h1>{x.hour[14].condition.text}</h1>
                        <img src={x.hour[14].condition.icon} alt="" />
                    </div>

                </div>

                <div className="day-hour">

                    <h1>{x.hour[18].time.slice(11,16)}</h1>

                    <p>{x.hour[18].temp_c}°C</p>

                    <p>Hissedilen: {x.hour[18].feelslike_c}°C</p>

                    <div>
                        <h1>{x.hour[19].condition.text}</h1>
                        <img src={x.hour[18].condition.icon} alt="" />
                    </div>

                </div>

            </div>

            ))}


        </main>
        </>}

        </div>
        </>
    )
}