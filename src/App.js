import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import axios from 'axios';
const api ={
    key:"5a89469ef8332e8714bc30ef58c9cb13",
    base:"http://api.openweathermap.org/data/2.5/weather"
}


function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather]= useState({});

  const searchWeather = evt => {
    if (evt.key ==="Enter"){
      axios.get(`${api.base}?q=${query}&APPID=${api.key}&units=metric`)
      .then(res => {
        setWeather(res.data);
        setQuery(res.query);
        console.log(res);
      });
      
    }
  }
  const dateFinder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

    let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    let day = days[d.getDay()];
    let date =d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 15) ?
    'App warm': 'App'): 'App'}>
        <main>
          <div class ="search">
            <input type="text" class="search_bar" placeholder="Search" onChange={e => setQuery(e.target.value)} 
            value={query} onKeyPress={searchWeather}/>
          </div>
          {(typeof weather.main != "undefined") ? (
          <div>
            <div class="location">
              <div class="area">{weather.name},{weather.sys.country}</div>
              <div class ="date">{dateFinder(new Date())}</div>
            </div>
            <div class = "weather">
              <div class ="tempurature">
                  {Math.round(weather.main.temp)}°c
              </div>
              <div class = "weatherCondition">{weather.weather[0].main}</div>
            </div>
          </div>
          ) : ('')}
        </main>
    </div>
  );
}

export default App;
