import axios, { AxiosResponse } from 'axios';
import { FormEvent, useState } from 'react';
import WeatherCard from '../../components/weatherCard/WeatherCard';
import WeatherType from '../../types/weather/WeatherType';


function Weather() {
  const [weather, setWeather] = useState({} as WeatherType)
  const [city, setCity] = useState("")
  const [loading, setLoading] = useState(true);
  const token = sessionStorage.getItem("token");

  const apiKey = '514bff2fcc46aac1c095e80507563e80'

  const endpointUrl = 'https://api.openweathermap.org/data/2.5/forecast';
  const params = {
    appid: apiKey,
    q: city,
    cnt: 1,
    units: "metric"
  }


  async function fetchWeatherData(): Promise<void> {
    try {
      const response: AxiosResponse = await axios.get(endpointUrl, { params });
      setLoading(true);

      if (response.status === 200) {
        setWeather(response.data);
        return setLoading(false);

      } else {
        console.log("Could not fetch weather from server")
        alert("Could not fetch weather from server");
      }
    } catch (error) {
      console.log("Error while tried to fetch")
    }
  }

  function handleSearch(event:FormEvent<HTMLFormElement>) {
    event.preventDefault();
    fetchWeatherData();
  }

  return (
    <>
      {token ?
        <div className="pt-5">
          <h1 className='flex justify-center items-center text-2xl'>Search a city weather!</h1>
          <form className='flex justify-center items-center mt-10 mb-10' onSubmit={(ev) => handleSearch(ev)}>
            <input type="text" name='inputCity' onChange={(event) => setCity(event.target.value)} />
            <input type="submit" value="Search" className='justify-center rounded-md bg-indigo-600 px-3 py-1.5 font-semibold leading-6 text-white hover:bg-indigo-500 cursor-pointer' />
          </form>
          {loading === false &&
            <WeatherCard weather={weather} />}
        </div>
        : window.location.href = "/"}

    </>
  )
}

export default Weather