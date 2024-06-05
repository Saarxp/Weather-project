import WeatherType from "../../types/weather/WeatherType";
import WeatherDay from "../weatherDay/WeatherDay";
// import "./weatherCard.scss"

interface WeatherCardProps {
  weather: WeatherType;
}

const WeekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function WeatherCard({ weather }: WeatherCardProps) {
  const dayInAWeek = new Date().getDay();

  const forecastDays = WeekDays.slice(dayInAWeek, WeekDays.length).concat(
    WeekDays.slice(0, dayInAWeek)
  );
  

  return (
    <div className="container w-full h-4/5 text-center text-white">
      <div key={weather.city.id} className="">
        <div className="flex flex-col">
          <div className="flex justify-center align-center gap-x-2">
            <h1 className="text-xl">{weather.city.name}</h1>,
            <p className="text-xl">Country: {weather.city.country}</p>
          </div>
          <div className="grid lg:grid-rows-my lg:grid-cols-my gap-5 mt-5 ">
            {weather.list.map((weather, index) => {
              console.log("weather",weather);
              
              return (
                <WeatherDay
                  key={weather.dt}
                  weather={weather}
                  index={index}
                  daysAWeek={forecastDays}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
