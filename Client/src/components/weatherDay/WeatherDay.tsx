interface WeatherDayProps {
    weather: any
    index: number,
    daysAWeek: string[],
}



function WeatherDay({ weather , index , daysAWeek }: WeatherDayProps) {
    return (
        <div className="shadow-inner shadow-slate-500 gap-y-2 flex flex-col p-5 rounded-2xl w-1/5">
            <p className="text-l">{daysAWeek[index]} temperature: {weather.main.temp}°C</p>
            <p className="text-5xl">Feels like: {weather.main.feels_like}°C</p>
            <p className="text-l">Humidity: {weather.main.humidity}RH</p>
            <p className="text-l">Description: {weather.weather[0].description}</p>
            <img className="w-fit m-auto" src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt={weather.weather[0].description}  />
        </div>
    );
}

export default WeatherDay