const apiKey = 'a9903b38861b9f78d8566f0054e08068'; // Replace with your OpenWeatherMap API key

const cityList = [
  "Delhi", "Mumbai", "Bangalore", "Hyderabad", "Chennai", "Kolkata",
  "Pune", "Ahmedabad", "Jaipur", "Lucknow", "London", "New York", "Paris", "Tokyo"
];

function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  if (!city) {
    document.getElementById('result').innerText = 'Please enter a city name.';
    return;
  }
  fetchWeatherByCity(city);
}

function fetchWeatherByCity(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.cod === '404') {
        document.getElementById('result').innerText = 'City not found.';
      } else {
        displayWeather(data);
      }
    })
    .catch(() => {
      document.getElementById('result').innerText = 'Error fetching data.';
    });
}

function getLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
      fetch(url)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(() => {
          document.getElementById('result').innerText = 'Unable to fetch location weather.';
        });
    }, () => {
      document.getElementById('result').innerText = 'Location access denied.';
    });
  } else {
    document.getElementById('result').innerText = 'Geolocation not supported.';
  }
}

function displayWeather(data) {
  const temp = data.main.temp;
  const city = data.name;
  const weather = data.weather[0].main;
  const desc = data.weather[0].description;
  const iconCode = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  document.getElementById('result').innerHTML = `
    <strong>${city}</strong><br>
    <img src="${iconUrl}" alt="${desc}"><br>
    <span style="font-size: 20px;">${temp}°C</span><br>
    ${weather} (${desc})
  `;
}

function showSuggestions() {
  const input = document.getElementById('cityInput').value.toLowerCase();
  const suggestions = document.getElementById('suggestions');
  suggestions.innerHTML = '';

  if (input.length === 0) return;

  const matches = cityList.filter(city => city.toLowerCase().startsWith(input));

  matches.forEach(city => {
    const li = document.createElement('li');
    li.textContent = city;
    li.onclick = () => {
      document.getElementById('cityInput').value = city;
      suggestions.innerHTML = '';
    };
    suggestions.appendChild(li);
  });
}

function toggleMode() {
  const body = document.body;
  body.classList.toggle('dark');
  const label = document.getElementById('modeLabel');
  label.textContent = body.classList.contains('dark') ? 'Dark Mode' : 'Light Mode';
}