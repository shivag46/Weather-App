import { BrowserRouter as Router, Route, Routes, Link, useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ReactLoading from "react-loading";

function App() {
  return (
    <Router>
      <div style={{ "fontFamily": "Belanosima" }} className='h-screen flex justify-center items-center bg-slate-300'>
        <Routes>
          <Route path='/' element={<SearchForm />}></Route>
          <Route path='/city/:id' element={<Card />}></Route>
        </Routes>
      </div>
    </Router>
  )
}

function SearchForm() {
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    let id = e.target.searchField.value
    if (id === '') {
      document.getElementById("searchFieldError").classList.remove("hidden")
      console.log("df")
    } else {
      navigate("city/" + id)
    }
  }

  return (
    <div className='w-100 bg-transparent p-10 h-fit md:card'>
      <h1 className='text-6xl m-5 text-center md:float-left'>The Weather App 🌦️</h1>
      <form onSubmit={handleSubmit} className='flex flex-col items-center mt-20 md:float-right w-5/6 p-2'>
        <label className='text-2xl'> Type in a city</label>
        <div className='card p-2 flex items-center h-20 mt-5'>
          <img className='h-8 w-8 mr-2 ml-2' src={require('./images/search.png')} />
          <input id="searchField" className='border-0 outline-0 bg-transparent text-3xl' />
        </div>
        <h1 id="searchFieldError" className='text-red-600 mt-3 hidden' style={{ "fontFamily": "serif" }}>This field is requird</h1>
        <div className='mt-5 card p-2 w-32 flex bg-teal-400'>
          <input type='submit' className='text-xl w-3/4' value="Find" />
          <img className='h-8 w-8 ml-2 bg-transparent' src={require('./images/go.gif')} />
        </div>
      </form>
    </div>
  )
}

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


export default App;
