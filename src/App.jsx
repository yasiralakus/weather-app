import { useEffect, useState } from "react"
import Clock from "./Clock"

export default function App() {

    const [inputValue, setInputValue] = useState('istanbul');
    const [database, setDatabase] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    function handleSearch(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formObj = Object.fromEntries(formData);
        setInputValue(formObj.city)        
    }

    useEffect(() => {
        async function fetchData() {
            setLoading(true)
            let data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=3a7fef278f1c4b4586b135731240401&q=${inputValue}&days=3&aqi=no&lang=tr`).then(r => r.json())

            if(data.error) {
                setError(true)
            } else {
                setDatabase(data)
            }
            setLoading(false)
        }

        fetchData();
    }, [inputValue])

    return (
        <>
        <div className="container-full">

        {error === true ? 
            <div className="modal">
                <div className="error-container">
                    <div className="error">
                        <button onClick={() => {setError(false)}}><i className="fa-solid fa-xmark"></i></button>
                        <i className="fa-solid fa-triangle-exclamation"></i>
                        <p>Girilen şehir ismi geçersiz. Türkçe karakterler kullanmadan aramayı deneyiniz.</p>
                    </div>
                </div>
            </div>
        :
        ''}

        <div className="container">

            <header className="header">

                <form onSubmit={handleSearch}>
                    <input type="text" name="city" placeholder="Şehir ismi giriniz..." required />
                    <button><i className="fa-solid fa-magnifying-glass"></i></button>
                </form>

                <Clock />

            </header>

            <main className="main">

                {loading === true ?
                <div className="loading">
                    <div className="loading-icon"></div>
                </div>
                :
                <>
                <div className="current">

                    <div className="current-top">

                        <div>
                            <h2>{database?.location.name},<br />{database?.location.country} </h2>
                            <p>{database?.location.localtime.slice(8,10)}.{database?.location.localtime.slice(5,7)}.{database?.location.localtime.slice(0,4)}</p>
                        </div>

                        <div>
                            <h2>Hissedilen <br /> sıcaklık:</h2>
                            <p>{database?.current.feelslike_c}°C</p>
                        </div>

                        <div>
                            <h2>Rüzgar <br /> hızı:</h2>
                            <p>{database?.current.wind_kph} km/s</p>
                        </div>

                        <div>
                            <h2>Nem <br /> oranı:</h2>
                            <p>%{database?.current.humidity}</p>
                        </div>

                        <img src={database?.current.condition.icon} alt="" />

                    </div>

                    <div className="current-bottom">

                        <h1>{database?.current.temp_c}°C</h1>

                        <p>Son güncelleme: <br /> {database?.current.last_updated.slice(8,10)}.{database?.current.last_updated.slice(5,7)}.{database?.current.last_updated.slice(0,4) } / {database?.current.last_updated.slice(11,13)}:{database?.current.last_updated.slice(14,16)}</p>
                    </div>



                </div>

                <div className="days">
                    {database?.forecast.forecastday.map(x => (
                        <div className="day">

                            <div className="day-top">

                                <div>
                                    <h2>{database?.location.name},<br />{database?.location.country} </h2>

                                    <p>{x?.date.slice(8,10)} . {x?.date.slice(5,7)} . {x?.date.slice(0,4)}</p>
                                </div>

                                <img src={x.day.condition.icon} alt="" />

                            </div>

                            <div className="day-mid">

                                <div>
                                    <h2>Rüzgar hızı:</h2>
                                    <p>{x.day.maxwind_kph} km/s</p>
                                </div>

                                <div>
                                    <h2>Yağmur ihtimali:</h2>
                                    <p>%{x.day.daily_chance_of_rain}</p>
                                </div>

                                <div>
                                    <h2>Kar ihtimali:</h2>
                                    <p>%{x.day.daily_chance_of_snow}</p>
                                </div>

                                <div>
                                    <h2>En yüksek sıcaklık:</h2>
                                    <p>{x.day.maxtemp_c}°C</p>
                                </div>

                                <div>
                                    <h2>En düşük sıcaklık:</h2>
                                    <p>{x.day.mintemp_c}°C</p>
                                </div>

                            </div>

                            <div className="day-bottom">

                                <h1>{x.day.avgtemp_c}°C</h1>

                            </div>

                        </div>
                    ))}
                </div>
                </>  
            }


            </main>

        </div>
        </div>
        </>
    )
}