import React, {useState} from 'react';
import axios from 'axios';
import './App.css';

function App() {
const [data,setData]=useState({});
const [location,setLocation]=useState('');
const url=`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=9c0d66bdd910e189aed944e94ecac554`;

const searchLocation=(event)=>{
  if(event.key==='Enter'){
  axios.get(url).then((response)=>{
    setData(response.data)
    console.log(response.data)
  })
}
}
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
            <p>Ghaziabad , IN</p>
          </div>
          <div className='temp'>
            <h1>12&deg;C</h1>
          </div>
          <div className='desc'>
            <p>Partly Cloudy</p>
          </div>
        </div>
        <div className='bottom'>
          <div className='feels'>
            <p className='bold'>12&deg;C</p>
            <p>Feels Like</p>
          </div>
          <div className='humidity'>
            <p className='bold'>94%</p>
            <p>Humidity</p>
          </div>
          <div className='wind'>
            <p className='bold'>1 km/h</p>
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
