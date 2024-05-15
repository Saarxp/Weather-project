interface WeatherDayProps {
    day: any
}

function WeatherDay({ day }: WeatherDayProps) {
    return (
        <div className="weatherDay ">
            <p className="weatherTemp">Today's temperature: {day.main.temp}°C</p>
            <p>Feels like: {day.main.feels_like}°C</p>
            <p>Humidity: {day.main.humidity}RH</p>
            {day.weather.map((weather: any) => {
                return (
                    <div key={weather.id} className="weatherInfo">
                        <p className="text-base">Description: {weather.description}</p>
                        <img style={{width:"50px"}} src={`http://openweathermap.org/img/wn/${weather.icon}.png`} alt={weather.description} className="mt-1 w-6 h-16" />
                    </div>
                );
            })}

        </div>
    );
}

export default WeatherDay