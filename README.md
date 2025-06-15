# 🌦️ WeatherWise

**WeatherWise** is a Node.js and Express-based weather forecast web application that displays current weather and next-day forecasts for cities around the world. It integrates the OpenWeatherMap API and features responsive UI using EJS templating and Bootstrap.

---

## 🚀 Features

- 🔍 Search for any city's weather  
- 📅 See current weather and tomorrow's forecast at 12:00 PM  
- 🌍 Forecast page for popular global cities  

---

## 🛠 Tech Stack

- **Node.js**  
- **Express.js**  
- **EJS (Embedded JavaScript Templating)**  
- **Bootstrap 4**  
- **OpenWeatherMap API**  

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/weatherwise.git
cd weatherwise
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the app

```bash
node index.js
```

### 4. Visit

```
http://localhost:3000
```

---

## 🔑 Get an API Key from OpenWeatherMap

1. Go to [https://openweathermap.org/api](https://openweathermap.org/api)  
2. Sign up for a free account  
3. After verifying your email, go to your dashboard  
4. Copy your **API key** (usually under the "API keys" section)  

---

## 🔧 Add Your API Key

Open `index.js` and replace the placeholder value with your real API key:

```js
const apiKey = "your_openweathermap_api_key_here";
```
