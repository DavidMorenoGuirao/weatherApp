import { useEffect, useState } from "react";
import { WeatherDay } from "../WeatherDay/WeatherDay";
import styles from './styles.module.css';
import {apiKey} from '../constants';
import { LocationSearch } from "../LocationSearch/LocationSearch";
import img from '../assets/defaultBg2.jpg'



export const App = () => {
  // const locationKey = "96942_PC";
  //Nos llevamos la apiKey y la ponemos en archivo constants.
  // const apiKey = process.env.API_KEY;  

  const [locationKey, setLocationKey] = useState(''); 

  const[weatherInfo, setWeatherInfo] = useState();

  const [location, setLocation] = useState('');  
  
  const daysOfWeek = [
    'Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'      
  ];

  const monthsOfYear = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'       
  ];

  //La siguiente funcion es para convertir la id de los iconos de la API a dos cifras (necesitamos que el 2, sea 02, por ejemplo)
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
    

    console.log(daysOfWeek[new Date().getDay()]);

    
    //Para obtener la informacion de la API, tenemos que hacer una peticion a la API.
    if(locationKey){
      fetch(
        `http://dataservice.accuweather.com/forecasts/v1/daily/5day/locationKey=${locationKey}?apikey=${apiKey}`
      )   
       
      .then(res => res.json())      
      .then(res => {        
        setWeatherInfo(res.DailyForecasts
        .map(df => {  
          console.log(`Esto es : ${monthsOfYear}`);
          console.log(`Esto es df: ${df.Date}`);             
          return {
                                     
            min: df.Temperature.Minimum.Value,
            max: df.Temperature.Maximum.Value,            
            weatherType: df.Day.IconPhrase,
            //aqui vamos a usar la funcion padNum para que nos devuelva dos cifras
            weatherIcon: padNum(df.Day.Icon),
            dayOfWeek: daysOfWeek[new Date(df.Date).getDay()],
            monthOfYear: monthsOfYear[(df.Date.slice(5,7))],
            date: df.Date.slice(0,10)  
            // img: img            
          }                       
        }))        
      }); 
    }       
  }, [locationKey]);  //aqui le decimos que solo se ejecute   cuando cambie locationKey  

  return (
    <div className={styles.father} style={{backgroundImage: `url(${img})`}}>

      <div className={styles.finalDate}>

        <div>
        {daysOfWeek[new Date().getDay()]} {new Date().getDate()} de {monthsOfYear[new Date().getMonth()] } - {[new Date().getFullYear()]}
        </div>

        <div>
          {new Date().getHours()}:{new Date().getMinutes()}
        </div>

      </div>

      <LocationSearch
      onCityFound={cityInfo => {    
        console.log(cityInfo);    
        setLocationKey(cityInfo.key);        
        setLocation(`${cityInfo.name}, ${cityInfo.country}`);
        // ${cityInfo.state}
      }}
      />       
      <div className={styles.cityInfoBg}>
        <h1 className={styles.cityInfo}>{location}</h1>
      </div>
                

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

