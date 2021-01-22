import * as model from './model';
import view from './view';

const loadLocation = async function (position) {
  try {
    const { latitude } = position.coords;
    const { longitude } = position.coords;

    // Load location weather
    await model.loadWeather([latitude, longitude]);

    // Render weather data
    view.render(model.weather.data);
  } catch (err) {
    console.error(err);
    view.renderMessage(err.message);
  }
};

const controlGetLocationWeather = function () {
  view.renderSpinner();

  // Get device location
  if (navigator.geolocation) {
    // If location collected invoke async function, else render message
    navigator.geolocation.getCurrentPosition(loadLocation, () => {
      view.renderMessage();
    });
  }
};

const controlSearchWeather = async function () {
  try {
    view.renderSpinner();
    // Get query from search input
    const query = view.getQuery();
    if (!query) return;

    // Load weather based on search query
    await model.loadWeather(query);

    // Render weather data
    view.render(model.weather.data);
  } catch (err) {
    console.error(err);
    view.renderMessage(err.message);
  }
};

const controlConvert = function (unit) {
  model.convertUnit(unit);
  view.render(model.weather.data);
};

const init = function () {
  view.addHandlerRender(controlGetLocationWeather);
  view.addHandlerSearch(controlSearchWeather);
  view.addHandlerConvert(controlConvert);
};

export default init();
