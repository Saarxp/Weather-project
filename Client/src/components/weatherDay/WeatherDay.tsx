
interface WeatherDayProps {
    weather: any
    index: number,
    daysAWeek: string[],
}



function WeatherDay({ weather , index , daysAWeek }: WeatherDayProps) {

    return (
        <>
        {index === 0 ?
        <div className="shadow-inner shadow-slate-500 gap-y-2 flex flex-col p-5 rounded-2xl lg:row-start-1 lg:row-end-4 lg:col-start-1" >
            <p className="text-xl">{daysAWeek[index]} temperature: {weather.main.temp}°C</p>
            <p className="text-5xl">Feels like: {weather.main.feels_like}°C</p>
            <p className="text-l">Humidity: {weather.main.humidity}RH</p>
            <p className="text-l">Description: {weather.weather[0].description}</p>
            <img className="m-auto lg:w-40" src={`../../../public/weatherImages/${weather.weather[0].icon}.png`} alt={weather.weather[0].description}  />
        </div> :
            <div className="shadow-inner shadow-slate-500 flex flex-col rounded-2xl h-52" >
            <p className="text-2xl">{daysAWeek[index]} temperature: {weather.main.temp}°C</p>
            {/* <p className="text-5xl">Feels like: {weather.main.feels_like}°C</p>
            <p className="text-l">Humidity: {weather.main.humidity}RH</p>
            <p className="text-l">Description: {weather.weather[0].description}</p> */}
            <img className="lg:w-20 m-auto" src={`../../../public/weatherImages/${weather.weather[0].icon}.png`} alt={weather.weather[0].description}  />
            </div>}
        </>
    );

// "shadow-inner shadow-slate-500 gap-y-2 flex flex-col p-5 rounded-2xl"
}

export default WeatherDay