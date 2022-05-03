export const WeatherDay = ({min, max, weatherType, weatherIcon, dayOfWeek }) => {
    const celsiusMinTemp = ((min-32) * 5/9).toFixed(0);
    const celsiusMaxTemp = ((max-32) * 5/9).toFixed(0);

    // console.log(weatherIcon);

    return(
        <>
            {dayOfWeek}            
            
            <img
                alt={weatherType}
                src={`https://developer.accuweather.com/sites/default/files/${weatherIcon}-s.png`}
            />            
            <div>{celsiusMinTemp} ºC/ {celsiusMaxTemp} ºC</div>          
        </>

    )

}