import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import {
  BsCloudsFill,
  BsCloudSnowFill,
  BsFillCloudSunFill,
  BsFillCloudLightningRainFill,
  BsFillCloudFog2Fill,
  BsFillCloudHaze2Fill,
} from "react-icons/bs";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=9c0d66bdd910e189aed944e94ecac554`;
  const defurl = `https://api.openweathermap.org/data/2.5/weather?q=New Delhi&appid=9c0d66bdd910e189aed944e94ecac554`;
  const searchLocation = (event) => {
    if (!event) return;
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
        //console.log(response.data)
      })
      .catch((err) => {
        alert("Please enter a valid location");
      });
    setLocation("");
  };

  useEffect(() => {
    axios.get(defurl).then((response) => {
      setData(response.data);
      console.log(response.data);
    });
  }, [defurl]);

  const search2 = () => {
    searchLocation(location);
  };
  const search1 = (event) => {
    if (event.key === "Enter") {
      searchLocation(location);
    }
  };

  const Cloud = (event) => {
    switch (event.toLowerCase()) {
      case "snow":
        return <BsCloudSnowFill />;
      case "rain":
        return <BsFillCloudLightningRainFill />;
      case "fog":
        return <BsFillCloudFog2Fill />;
      case "clear":
        return <BsFillCloudSunFill />;
      case "clouds":
        return <BsCloudsFill />;
      case "haze":
        return <BsFillCloudHaze2Fill />;
      case "mist":
        return <BsFillCloudHaze2Fill />;
      default:
        return <BsCloudsFill />;
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={search1}
          type="text"
          placeholder="Enter Location"
        />
        <button type="button" className="click" onClick={search2}>
          Search
        </button>
      </div>
      <div className="container">
        <div className="top">
          <div className="top-content">
            <div className="location">
              <p>
                {data.name} {data.sys ? <p> , {data.sys.country}</p> : null}
              </p>
            </div>
            <div className="temp">
              {data.main ? (
                <h1>{(data.main.temp - 273).toFixed(2)}&deg;C</h1>
              ) : null}
            </div>
            <div className="desc">
              {data.weather ? <p>{data.weather[0].main}</p> : null}
            </div>
          </div>
          {data.weather ? (
            <div className="icon">{Cloud(data.weather[0].main)}</div>
          ) : null}
        </div>
        {data.name === undefined ? null : (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">
                  {(data.main.feels_like - 273).toFixed(2)}&deg;C
                </p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="bold">
                  {(data.wind.speed * 3.6).toFixed(2)} Km/h
                </p>
              ) : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
