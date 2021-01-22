class View {
  constructor() {
    this._parentElement = document.querySelector(".glass__result");
    this._searchBar = document.querySelector(".glass__search-bar");
    this._smallCircle = document.querySelector(".circle--small");
    this._message = "What's the weather like today? ☁";
  }

  getQuery() {
    const query = this._searchBar.querySelector(".glass__search-input").value;

    this._clearInput();
    return query;
  }

  _clearInput() {
    this._searchBar.querySelector(".glass__search-input").value = "";
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  render(data) {
    if (!data) return;

    const markup = `
    <div class="glass__weather">
      <span>Updated as of:</span>
      <p><span>${data.date}</span></p><br>
      <h2>${data.name}, ${data.country}</h2>
      <div class="glass__temperature">
          <img src="${
            data.iconSmall
          }" alt="weather icon" class="glass__weather-icon">
          <h1>${data.temp}<sup>°${data.unit === "metric" ? "C" : "F"}</sup></h1>
      </div>
      <p>${data.description}</p>
      <div class="glass__details">
          <p>Feels like: ${data.feelsLike} °${
      data.unit === "metric" ? "C" : "F"
    }</p>
          <p>Humidity: ${data.humidity}%</p>
          <p>Sunrise: ${data.sunrise}</p>
          <p>Sunset: ${data.sunset}</p>
      </div>
      <div class="glass__switch">
          <div class="glass__select celcius ${
            data.unit === "metric" ? "glass__select--active" : ""
          }" data-unit="metric">C</div>
          <div class="glass__select fahrenheit ${
            data.unit === "imperial" ? "glass__select--active" : ""
          }" data-unit="imperial">F</div>
      </div>
    </div>
    `;

    // this._bigCircle.style.backgroundImage = `url(${data.flag})`;
    this._smallCircle.style.backgroundImage = `url(${data.iconBig})`;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderSpinner() {
    const markup = `<div class="glass__loader"></div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderMessage(message = this._message) {
    const markup = `<span class="glass__text">${message}</span>`;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }

  addHandlerSearch(handler) {
    this._searchBar.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }

  addHandlerConvert(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".glass__select");
      if (!btn || btn.classList.contains("glass__select--active")) return;

      handler(btn.dataset.unit);
    });
  }
}

export default new View();
