import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ReactLoading from "react-loading";

function RoundedButton({ setUnit }) {
    const handleClick = (e) => {
        e.preventDefault()
        let btn = document.getElementById("btn-key")
        if (btn.classList.contains("float-left")) {
            btn.classList.remove("float-left")
            btn.classList.add("float-right")
            setUnit('f')
        } else {
            btn.classList.remove("float-right")
            btn.classList.add("float-left")
            setUnit('c')
        }
    }

    return (
        <div className='flex w-fit items-center hover:cursor-pointer'>
            <h1 className='m-2 text-xl'>°C</h1>
            <div onClick={handleClick} className='shadow-custom bg-black   h-10 w-20 rounded-3xl p-1'>
                <div id="btn-key" className='rounded-full h-8 w-8 bg-slate-100 float-right'></div>
            </div>
            <h1 className='m-2 text-xl'>°F</h1>
        </div>
    )
}

function Card(props) {
    let { id } = useParams()
    const [data, setData] = useState(null)
    const [unit, setUnit] = useState('f')

    useEffect(() => {
        let getData = async () => {
            let key = "3781117b77f642bbab772214232606"
            let response = await fetch("http://api.weatherapi.com/v1/forecast.json?key=" + key + "&q=" + id)
            let x = await response.json()
            console.log(x)
            setData(x)
        }
        getData()
    }, [])

    return data == null ? (
        <div>
            <ReactLoading type='spin' />
        </div>
    ) :
        ('error' in data) ? (
            <div className='flex flex-col items-center justify-center'>
                <h1 className='text-5xl mb-5'>Oops!! That's a glitch</h1>
                <h1 className='text-2xl'>{data.error.message}</h1>
            </div>
        ) :
            (
                <div className='card w-100'>
                    <div className='w-fit float-right'>
                        <RoundedButton setUnit={setUnit} />
                    </div>

                    <div className='flex p-2 justify-center'>
                        <img className='h-32 w-32' src={data.current.condition.icon}></img>
                        <div className='flex flex-col justify-center m-5'>
                            <h1 className='text-xl'>{data.location.name}, <span className='text-md'>{data.location.country}</span></h1>
                            <h1 className='text-3xl text-start'>{data == null ? 0 : data.current['temp_' + unit]} °{unit.toUpperCase()}</h1>
                            <h1 className='text-md text-start'>Feels like {data.current['feelslike_' + unit]} °{unit.toUpperCase()}</h1>
                        </div>
                    </div>

                    <div className='text-xl'>
                        <table className=' w-full'>
                            <tr>
                                <td><h1 className='p-2'>Local Time ⏰:</h1></td>
                                <td><h1 className='p-2'>{data.location.localtime}</h1></td>
                            </tr>

                            <tr>
                                <td>
                                    <div className='flex items-center justify-center p-2'>
                                        <h1>Maximum Temperature </h1>
                                        <img className='h-8 w-8' src={require("./images/high_temp.png")} />
                                        <h1>:</h1>
                                    </div>
                                </td>
                                <td>
                                    <h1 className='p-2'>{data.forecast.forecastday[0].day['maxtemp_' + unit]} °{unit.toUpperCase()}</h1>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <div className='flex items-center justify-center p-2'>
                                        <h1>Minimum Temperature </h1>
                                        <img className='h-8 w-8' src={require("./images/low_temp.png")} />
                                        <h1>:</h1>
                                    </div>
                                </td>
                                <td>
                                    <h1 className='p-2'>{data.forecast.forecastday[0].day['mintemp_' + unit]} °{unit.toUpperCase()}</h1>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <h1 className='p-2'>Maximum Windspeed 🍃:</h1>
                                </td>
                                <td>
                                    <h1 className='p-2'>{data.forecast.forecastday[0].day.maxwind_kph} kph</h1>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <div className='flex items-center justify-center p-2'>
                                        <h1>Sunrise </h1>
                                        <img className='h-8 w-8' src={require("./images/sunrise.png")} />
                                        <h1>:</h1>
                                    </div>
                                </td>
                                <td>
                                    <h1 className='p-2'>{data.forecast.forecastday[0].day.uv}</h1>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <div className='flex items-center justify-center p-2'>
                                        <h1>Sunset </h1>
                                        <img className='h-8 w-8' src={require("./images/sunset.png")} />
                                        <h1>:</h1>
                                    </div>
                                </td>
                                <td>
                                    <h1 className='p-2'>{data.forecast.forecastday[0].astro.sunset}</h1>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <div className='flex items-center justify-center p-2'>
                                        <h1>Humidity </h1>
                                        <img className='h-8 w-8' src={require("./images/humidity.png")} />
                                        <h1>:</h1>
                                    </div>
                                </td>
                                <td>
                                    <h1 className='p-2'>{data.forecast.forecastday[0].day.avghumidity}%</h1>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <h1 className='p-2'>Precipitation ☔:</h1>
                                </td>
                                <td>
                                    <h1 className='p-2'>{data.forecast.forecastday[0].day.totalprecip_mm} mm</h1>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <div className='flex items-center justify-center p-2'>
                                        <h1>UV Index </h1>
                                        <img className='h-8 w-8' src={require("./images/radiation.png")} />
                                        <h1>:</h1>
                                    </div>
                                </td>
                                <td>
                                    <h1 className='p-2'>{data.forecast.forecastday[0].day.uv}</h1>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            )
}

export default Card