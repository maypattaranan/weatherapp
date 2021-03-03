const api = {
  key: "d5ba9f2693943e9925890cc40b9f742a",
  base: "https://api.openweathermap.org/data/2.5/",
};

const city = document.querySelector(".app-box .city");
const date = document.querySelector(".app-box .date");
const temp = document.querySelector(".app-box .temp");
const weatherEl = document.querySelector(".app-box .weather");
const highlow = document.querySelector(".app-box .highlow");

const searchBox = document.querySelector(".search-box");
searchBox.addEventListener("keypress", setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    // 13 = return or enter key
    getResults(searchBox.value);
  }
}

async function getResults(query) {
  const response = await fetch(
    `${api.base}weather?q=${query}&units=metric&APPID=${api.key}`
  );
  const data = await response.json();
  console.log("Data", data);

  if (response.ok) {
    displayResults(data);
  } else {
    city.textContent = `The city ${query} was not found - ${data.cod}`;
    date.textContent = "";
    temp.innerHTML = "";
    weatherEl.textContent = "";
    highlow.textContent = "";
  }
}

function displayResults(weather) {
  console.log("displayResults - weather", weather);

  city.textContent = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();

  date.textContent = dateBuilder(now);

  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

  weatherEl.textContent = weather.weather[0].main;

  highlow.textContent = `H: ${Math.round(
    weather.main.temp_min
  )}°C / L: ${Math.round(weather.main.temp_max)}°C `;
}

function dateBuilder(d) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[d.getDay()];
  let date = d.getDay();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
