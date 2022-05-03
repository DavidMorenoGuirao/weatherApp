import { useState } from "react";
import {apiKey} from '../constants';
import styles from './styles.module.css';


export const LocationSearch = ({onCityFound}) => {
    //Para buscar codigos postales, hay que conseguir la key de ese codigo postal.
    const [zipCode, setZipCode] = useState('');     
    
    const getLocation = (zip) => {    
        const url = `http://dataservice.accuweather.com/locations/v1/postalcodes/search?apikey=${apiKey}&q=${zip}`;
        
        fetch(url)
            .then(res => res.json())
            .then(res => res.find(l => l.Country.ID === "ES"))
            .then(res => {
                onCityFound({
                    name: res.LocalizedName,
                    key: res.Key,
                    state: res.AdministrativeArea.ID,
                    country: res.Country.ID                    
                })
                setZipCode('');
            });        
    }

    return (
        <div className={styles.main}>
            <input 
            vaule={zipCode} 
            onChange={e => setZipCode(e.target.value)} type="text" 
            placeholder="Codigo postal..."
            />
            <button onClick ={() => getLocation(zipCode)}>Buscar</button>
        </div>
    )
};