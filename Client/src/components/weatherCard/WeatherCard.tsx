import WeatherType from '../../types/weather/WeatherType'
import WeatherDay from '../weatherDay/WeatherDay';
import "./weatherCard.scss"

interface WeatherCardProps {
  weather: WeatherType;
}

function WeatherCard({ weather }: WeatherCardProps) {

  return (
    <div className="container">
      <div key={weather.city.id} className="weatherCard">
        <div className="weatherCardBox">
          <h1>{weather.city.name}</h1>
          <p>Country: {weather.city.country}</p>
          {weather.list.map((day) => {
            return <WeatherDay key={day.dt} day={day} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default WeatherCard