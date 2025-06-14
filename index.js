import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const app = express();
const port = 3000;
const apiKey = ""; //use your own API key by logging in the link given in the readme 

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.render("home.ejs", { error: null });
});

app.post("/weather", async (req, res) => {
  const city = req.body.city;
  const currentURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const [currentRes, forecastRes] = await Promise.all([
      axios.get(currentURL),
      axios.get(forecastURL),
    ]);

    const weather = {
      city: currentRes.data.name,
      temperature: currentRes.data.main.temp,
      description: currentRes.data.weather[0].description,
      icon: currentRes.data.weather[0].icon,
      humidity: currentRes.data.main.humidity,
      wind: currentRes.data.wind.speed,
    };

    const tomorrowForecast = forecastRes.data.list.find(forecast =>
      forecast.dt_txt.endsWith("12:00:00")
    );


    const forecast = {
      temperature: tomorrowForecast.main.temp,
      description: tomorrowForecast.weather[0].description,
      rainExpected: tomorrowForecast.weather[0].main.toLowerCase().includes("rain"),
    };

    res.render("weather.ejs", { weather, forecast });

  } catch (err) {
    res.render("home.ejs", {
      error: "Could not retrieve weather data. Please check the city name."
    });
  }
});

app.get("/forecast", async (req, res) => {
  const cities = ["New York", "London", "Tokyo", "Paris", "Dubai", "Sydney"];
  const apiCalls = cities.map(city =>
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
  );

  try {
    const responses = await Promise.all(apiCalls);

    const forecasts = responses.map(resp => ({
      name: resp.data.name,
      temp: resp.data.main.temp,
      description: resp.data.weather[0].description,
      icon: resp.data.weather[0].icon
    }));

    res.render("forecast.ejs", { forecasts });

  } catch (error) {
    res.send("Failed to load forecast data.");
  }
});


app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
