import { useEffect, useState } from "react";
import { WeatherDay } from "../WeatherDay/WeatherDay";
import styles from './styles.module.css';
import {apiKey, apiKey2} from '../constants';
import { LocationSearch } from "../LocationSearch/LocationSearch";


export const App = () => {

  // const locationKey = "96942_PC";

  //Nos llevamos la apiKey y la ponemos en archivo constants.
  // const apiKey = process.env.API_KEY;
  //const apiKey2 = "MaI9uAImZFQoa99GQIq1WqJXsISe02LZ"

  const [locationKey, setLocationKey] = useState('');

  //console.log(apiKey);

  const[weatherInfo, setWeatherInfo] = useState();
  const [location, setLocation] = useState('');

  


  //La siguiente funcion es para convertir la id de los iconosde la API a dos cifras (necesitamos que el 2, sea 02, por ejemplo)
  const padNum = (num) => {
    const stringNum = num + '';
    const stringLen = stringNum.length;

    if (stringLen === 1) {
      return `0${stringNum}`; //4 -> 04
    }
    else{
      return stringNum; //12 -> 12
    }
  }

  useEffect(() => {
    //Ahora vamos a mapear Date para poner los dias de la semana
    //lo metemos aqui porque solo lo usa este useEffect.
    const daysOfWeek = [
      'Domingo',
      'Lunes',
      'Martes',
      'Miercoles',
      'Jueves',
      'Viernes',
      'Sabado'
    ];

    if(locationKey){
      fetch(
        `http://dataservice.accuweather.com/forecasts/v1/daily/5day/locationKey=${locationKey}?apikey=${apiKey2}`
      )
      .then(res => res.json())
      .then(res => {    
        console.log(res);  
        setWeatherInfo(res.DailyForecasts
        .map(df => {
          return {        
            min: df.Temperature.Minimum.Value,
            max: df.Temperature.Maximum.Value,
            weatherType: df.Day.IconPhrase,
            //aqui vamos a usar la funcion padNum para que nos devuelva dos cifras
            weatherIcon: padNum(df.Day.Icon),
            dayOfWeek: daysOfWeek[new Date(df.Date).getDay()]
          }
        }))
      }); 
    }
       
  }, [locationKey]);

  return (
    <div>

      <LocationSearch
      onCityFound={cityInfo => {        
        setLocationKey(cityInfo.key);
        setLocation(cityInfo.name + ',' + cityInfo.state + ',' + cityInfo.country);
      }}
      />
      <h1 className={styles.cityInfo}>{location}</h1>

      <div className={styles.main}>

        
        
        {!!weatherInfo && weatherInfo.map((i, index) => (
          <div className={styles.day} key={index}>
            <WeatherDay
            min={i.min} 
            max={i.max} 
            weatherType={i.weatherType} 
            weatherIcon={i.weatherIcon}
            dayOfWeek={i.dayOfWeek}

            />
          </div>
        ))}
      </div>
    </div>);

}

