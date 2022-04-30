export const WeatherDay = ({min, max, weatherType, weatherIcon, dayOfWeek}) => {
    return(
        <>
            {dayOfWeek}
            <img
                alt={weatherType}
                src={`https://developer.accuweather.com/sites/default/files/${weatherIcon}-s.png`}
            />
            
            <div>Temp: {min} / {max}</div>
        </>

    )

}