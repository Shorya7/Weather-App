import React, {useState,useEffect} from 'react';
import axios from 'axios';
import './App.css';

function App() {
const [data,setData]=useState({});
const [location,setLocation]=useState('');
const url=`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=9c0d66bdd910e189aed944e94ecac554`;
const defurl=`https://api.openweathermap.org/data/2.5/weather?q=New Delhi&appid=9c0d66bdd910e189aed944e94ecac554`;
const searchLocation=(event)=>{
  if(event.key==='Enter'){
  axios.get(url).then((response)=>{
    setData(response.data)
    console.log(response.data)
  })
  .catch((err)=>{
    alert("Please enter a valid location")
  })
  setLocation('')
}
}
useEffect(() => {
  axios.get(defurl).then((response)=>{
    setData(response.data)
    console.log(response.data)
  })
},[defurl])

  return (
    <div className="app">
      <div className='search'>
        <input value={location} onChange={event=>setLocation(event.target.value)}
        onKeyPress={searchLocation}
        type="text"
        placeholder='Enter Location'/>
      </div>
      <div className='container'>
        <div className='top'>
          <div className='location'>
            <p>{data.name} {data.sys?<p> , {data.sys.country}</p>:null}</p>
          </div>
          <div className='temp'>
            {data.main?<h1>{(data.main.temp-273).toFixed(2)}&deg;C</h1>:null}
          </div>
          <div className='desc'>
            {data.weather?<p>{data.weather[0].main}</p>:null}
            {/* {data.weather?<img src="https://cdn-icons-png.flaticon.com/512/1146/1146869.png" alt='cloud'></img>:null} */}
          </div>
        </div>
        {data.name===undefined?null:
        <div className='bottom'>
          <div className='feels'>
          {data.main?<p className='bold'>{(data.main.feels_like-273).toFixed(2)}&deg;C</p>:null}
            <p>Feels Like</p>
          </div>
          <div className='humidity'>
          {data.main?<p className='bold'>{data.main.humidity}%</p>:null}
            <p>Humidity</p>
          </div>
          <div className='wind'>
          {data.wind?<p className='bold'>{data.wind.speed} Km/h</p>:null}
            <p>Wind Speed</p>
          </div>
        </div>
}
      </div>
    </div>
  );
}

export default App;
