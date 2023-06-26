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

          <div className='text-xl flex'>
            <div className='w-1/2'>
              <h1 className='p-2'>Local Time ⏰:</h1>
              <div className='flex items-center justify-center p-2'>
                <h1>Maximum Temperature </h1>
                <img className='h-8 w-8' src={require("./images/high_temp.png")} />
                <h1>:</h1>
              </div>
              <div className='flex items-center justify-center p-2'>
                <h1>Minimum Temperature </h1>
                <img className='h-8 w-8' src={require("./images/low_temp.png")} />
                <h1>:</h1>
              </div>
              <h1 className='p-2'>Maximum Windspeed 🍃:</h1>
              <div className='flex items-center justify-center p-2'>
                <h1>UV Index </h1>
                <img className='h-8 w-8' src={require("./images/radiation.png")} />
                <h1>:</h1>
              </div>
              <div className='flex items-center justify-center p-2'>
                <h1>Sunrise </h1>
                <img className='h-8 w-8' src={require("./images/sunrise.png")} />
                <h1>:</h1>
              </div>
              <div className='flex items-center justify-center p-2'>
                <h1>Sunset </h1>
                <img className='h-8 w-8' src={require("./images/sunset.png")} />
                <h1>:</h1>
              </div>
              <div className='flex items-center justify-center p-2'>
                <h1>Humidity </h1>
                <img className='h-8 w-8' src={require("./images/humidity.png")} />
                <h1>:</h1>
              </div>
              <h1 className='p-2'>Precipitation ☔:</h1>
            </div>

            <div className='w-1/2'>
              <h1 className='p-2'>{data.location.localtime}</h1>
              <h1 className='p-2'>{data.forecast.forecastday[0].day['maxtemp_' + unit]} °{unit.toUpperCase()}</h1>
              <h1 className='p-2'>{data.forecast.forecastday[0].day['mintemp_' + unit]} °{unit.toUpperCase()}</h1>
              <h1 className='p-2'>{data.forecast.forecastday[0].day.maxwind_kph} kph</h1>
              <h1 className='p-2'>{data.forecast.forecastday[0].day.uv}</h1>
              <h1 className='p-2'>{data.forecast.forecastday[0].astro.sunrise}</h1>
              <h1 className='p-2'>{data.forecast.forecastday[0].astro.sunset}</h1>
              <h1 className='p-2'>{data.forecast.forecastday[0].day.avghumidity}%</h1>
              <h1 className='p-2'>{data.forecast.forecastday[0].day.totalprecip_mm} mm</h1>
            </div>
          </div>
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
    <div className='flex w-fit items-center'>
      <h1 className='m-2 text-xl'>°C</h1>
      <div onClick={handleClick} className='shadow-custom bg-black   h-10 w-20 rounded-3xl p-1'>
        <div id="btn-key" className='rounded-full h-8 w-8 bg-slate-100 float-right'></div>
      </div>
      <h1 className='m-2 text-xl'>°F</h1>
    </div>
  )
}


{/* <div className='flex ref justify-between mt-3'>
          <h1>Local Time: 2023-06-26 08:15</h1>
          <h1>Maximum Temperature: 25 *C</h1>
          <h1>Minimum Temperature: 13 *C</h1>
        </div>

        <div className='flex ref justify-between mt-3'>
          <h1>Maximum Windspeed: 23 kmph</h1>
          <h1>Minimum windspeed: 13 kmph</h1>
          <h1>Humidity: 23</h1>
        </div>

        <div className='flex ref justify-between mt-3'>
          <h1>Sunrise: 6:00 AM</h1>
          <h1>Sunset: 6:00 AM</h1>
          <h1>Precipitation: 23%</h1>
        </div> */}

// return (
//   <div className='flex flex-col items-center'>
//     <NavBar />
//     <Home />
//   </div>
// );


function NavBar() {
  return (
    <div className='flex p-2 w-screen justify-around'>
      <a href='/'><h1 className='text-xl'>Home</h1></a>
      <a href='/'><h1 className='text-xl'>Stats</h1></a>
      <a href='/'><h1 className='text-xl'>About</h1></a>
    </div>
  )
}

function Home() {
  return (
    <div className='ref h-screen w-screen flex'>
      <Fixtures />
      <Table />
    </div>
  )
}

function Fixtures() {
  return (
    <div className='ref h-screen w-8/12'>

    </div>
  )
}

function Table() {
  return (
    <div className='ref'>

    </div>
  )
}

export default App;
