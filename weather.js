let weather = {
  apiKey: "",
  fetchWeather: (place) => {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        place +
        "&units=imperial&appid=" +
        weather.apiKey
    )
      .then((res) => res.json())
      .then((data) => weather.displayWeather(data))
  },
  displayWeather: (data) => {
    const { name } = data
    const { icon, description } = data.weather[0]
    const { temp, humidity, temp_min, temp_max, feels_like } = data.main
    const { speed } = data.wind
    const { lon, lat } = data.coord
    document.querySelector(".city").innerText = name
    document.querySelector(".temp").innerText = temp + "°F"
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + "@2x.png"
    document.querySelector(".feel").innerText =
      "Feels Like: " + feels_like + "°F"
    document.querySelector(".min").innerText = "Min: " + temp_min + "°F"
    document.querySelector(".max").innerText = "Max: " + temp_max + "°F"
    document.querySelector(".desc").innerText = description
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%"
    document.querySelector(".wind").innerText = "Wind Speed: " + speed + "MPH"
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')"
  },
  searchData: () => {
    weather.fetchWeather(document.querySelector(".searchBar").value)
  },
}
const clickButton = document.querySelector(".button")
clickButton.addEventListener("click", () => {
  weather.searchData()
})
