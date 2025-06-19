async function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  const resultDiv = document.getElementById('result');

  if (!city) {
    resultDiv.innerHTML = "Please enter a city name.";
    return;
  }

  const apiKey = 'a9903b38861b9f78d8566f0054e08068'; // 🔁 Replace with your real OpenWeatherMap API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === 200) {
      resultDiv.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
        <p><strong>Weather:</strong> ${data.weather[0].description}</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
      `;
    } else {
      resultDiv.innerHTML = `<p>${data.message}</p>`;
    }
  } catch (error) {
    resultDiv.innerHTML = "Error fetching data. Please try again later.";
  }
}
function changeBackground(weather) {
  const body = document.body;
  if (weather.includes('rain')) {
    body.style.backgroundImage = "url('rainy.jpg')";
  } else if (weather.includes('cloud')) {
    body.style.backgroundImage = "url('cloudy.jpg')";
  } else if (weather.includes('clear')) {
    body.style.backgroundImage = "url('sunny.jpg')";
  } else {
    body.style.backgroundImage = "url('default.jpg')";
  }
}