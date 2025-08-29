// DOM Elements
const citySearch = document.getElementById("city-search");
const cityItems = document.querySelectorAll(".city-item");
const cityName = document.querySelector(".city-name");
const currentTemp = document.querySelector(".current-temp");
const weatherDesc = document.querySelector(".weather-desc");
const weatherIcon = document.querySelector(".weather-icon");
const dateTime = document.querySelector(".date-time");
const feelsLike = document.querySelector(
  ".detail-card:nth-child(1) .detail-value"
);
const humidity = document.querySelector(
  ".detail-card:nth-child(2) .detail-value"
);
const windSpeed = document.querySelector(
  ".detail-card:nth-child(3) .detail-value"
);
const pressure = document.querySelector(
  ".detail-card:nth-child(4) .detail-value"
);

// Mock weather data for Indian cities
const weatherData = {
  Kolkata: {
    temp: 32,
    feelsLike: 35,
    humidity: 65,
    windSpeed: 12,
    pressure: 1013,
    condition: "Sunny",
  },
  Mumbai: {
    temp: 30,
    feelsLike: 34,
    humidity: 75,
    windSpeed: 15,
    pressure: 1010,
    condition: "Partly Cloudy",
  },
  Delhi: {
    temp: 36,
    feelsLike: 39,
    humidity: 45,
    windSpeed: 10,
    pressure: 1008,
    condition: "Haze",
  },
  Bengaluru: {
    temp: 28,
    feelsLike: 30,
    humidity: 70,
    windSpeed: 8,
    pressure: 1012,
    condition: "Cloudy",
  },
  Chennai: {
    temp: 34,
    feelsLike: 38,
    humidity: 68,
    windSpeed: 14,
    pressure: 1011,
    condition: "Sunny",
  },
  Hyderabad: {
    temp: 33,
    feelsLike: 36,
    humidity: 60,
    windSpeed: 11,
    pressure: 1010,
    condition: "Sunny",
  },
  Ahmedabad: {
    temp: 37,
    feelsLike: 40,
    humidity: 50,
    windSpeed: 13,
    pressure: 1009,
    condition: "Sunny",
  },
  Pune: {
    temp: 29,
    feelsLike: 32,
    humidity: 72,
    windSpeed: 9,
    pressure: 1012,
    condition: "Partly Cloudy",
  },
  Jaipur: {
    temp: 38,
    feelsLike: 41,
    humidity: 42,
    windSpeed: 12,
    pressure: 1008,
    condition: "Sunny",
  },
  Lucknow: {
    temp: 35,
    feelsLike: 38,
    humidity: 55,
    windSpeed: 10,
    pressure: 1009,
    condition: "Sunny",
  },
};

// Update weather information
function updateWeather(city) {
  const data = weatherData[city];

  cityName.textContent = city;
  currentTemp.textContent = `${data.temp}°C`;
  weatherDesc.textContent = data.condition;
  feelsLike.textContent = `${data.feelsLike}°C`;
  humidity.textContent = `${data.humidity}%`;
  windSpeed.textContent = `${data.windSpeed} km/h`;
  pressure.textContent = `${data.pressure} hPa`;

  // Update weather icon based on condition
  updateWeatherIcon(data.condition);

  // Update active city in list
  cityItems.forEach((item) => {
    if (item.dataset.city === city) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });

  // Update date and time
  updateDateTime();
}

// Update weather icon based on condition
function updateWeatherIcon(condition) {
  weatherIcon.innerHTML = "";
  const icon = document.createElement("i");

  if (condition.includes("Sunny")) {
    icon.className = "fas fa-sun";
  } else if (condition.includes("Cloud")) {
    icon.className = "fas fa-cloud";
  } else if (condition.includes("Rain")) {
    icon.className = "fas fa-cloud-rain";
  } else if (condition.includes("Haze") || condition.includes("Fog")) {
    icon.className = "fas fa-smog";
  } else {
    icon.className = "fas fa-cloud-sun";
  }

  weatherIcon.appendChild(icon);
}

// Update date and time
function updateDateTime() {
  const now = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const date = now.toLocaleDateString("en-IN", options);
  const time = now.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  dateTime.textContent = `${date} | ${time}`;
}

// Initialize with Kolkata weather
updateWeather("Kolkata");

// Add event listeners to city items
cityItems.forEach((item) => {
  item.addEventListener("click", () => {
    const city = item.dataset.city;
    updateWeather(city);
  });
});

// Add event listener to search input
citySearch.addEventListener("input", () => {
  const searchText = citySearch.value.toLowerCase();

  cityItems.forEach((item) => {
    const city = item.dataset.city.toLowerCase();
    if (city.includes(searchText)) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
});

// Update time every minute
setInterval(updateDateTime, 60000);
