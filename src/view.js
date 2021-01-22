class View {
  constructor() {
    this.parentElement = document.querySelector('.glass__result');
    this.searchBar = document.querySelector('.glass__search-bar');
    this.smallCircle = document.querySelector('.circle--small');
    this.message = "What's the weather like today? ☁";
  }

  getQuery() {
    const query = this.searchBar.querySelector('.glass__search-input').value;

    this.clearInput();
    return query;
  }

  clearInput() {
    this.searchBar.querySelector('.glass__search-input').value = '';
  }

  clear() {
    this.parentElement.innerHTML = '';
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
          <h1>${data.temp}<sup>°${data.unit === 'metric' ? 'C' : 'F'}</sup></h1>
      </div>
      <p>${data.description}</p>
      <div class="glass__details">
          <p>Feels like: ${data.feelsLike} °${
  data.unit === 'metric' ? 'C' : 'F'
}</p>
          <p>Humidity: ${data.humidity}%</p>
          <p>Sunrise: ${data.sunrise}</p>
          <p>Sunset: ${data.sunset}</p>
      </div>
      <div class="glass__switch">
          <div class="glass__select celcius ${
  data.unit === 'metric' ? 'glass__select--active' : ''
}" data-unit="metric">C</div>
          <div class="glass__select fahrenheit ${
  data.unit === 'imperial' ? 'glass__select--active' : ''
}" data-unit="imperial">F</div>
      </div>
    </div>
    `;
    this.smallCircle.style.backgroundImage = `url(${data.iconBig})`;

    this.clear();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderSpinner() {
    const markup = '<div class="glass__loader"></div>';

    this.clear();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this.message) {
    const markup = `<span class="glass__text">${message}</span>`;

    this.clear();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }


  addHandlerSearch(handler) {
    this.searchBar.addEventListener('submit', (e) => {
      e.preventDefault();
      handler();
    });
  }

  addHandlerConvert(handler) {
    this.parentElement.addEventListener('click', (e) => {
      const btn = e.target.closest('.glass__select');
      if (!btn || btn.classList.contains('glass__select--active')) return;

      handler(btn.dataset.unit);
    });
  }
}


const addHandlerRender = (handler) => {
  window.addEventListener('load', handler);
};
export default new View();
export {
  addHandlerRender,
};