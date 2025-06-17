async function getWeather() {
  const city = document.getElementById("cityInput").value;
  console.log("Getting weather for:", city);
  const apiKey = "YOUR-API-TOKEN"; //get your free api token from openweathermap.org 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  const weatherDiv = document.getElementById("weatherResult");

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === 200) {
      const condition = data.weather[0].main.toLowerCase();
      console.log("Weather condition:", condition);
      weatherDiv.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Icon">
        <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
        <p><strong>Condition:</strong> ${data.weather[0].main}</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Wind:</strong> ${data.wind.speed} m/s</p>
      `;
    } else {
      weatherDiv.innerHTML = `<p>City not found!</p>`;
    }
  } catch (error) {
    weatherDiv.innerHTML = `<p>Error fetching data.</p>`;
    console.error("Error:", error);
  }
}
