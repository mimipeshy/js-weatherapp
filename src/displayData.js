import * as model from './model';
import view, { addHandlerRender } from './view';

async function loadLocation(position) {
  try {
    const { latitude } = position.coords;
    const { longitude } = position.coords;

    // Load location weather
    await model.loadWeather([latitude, longitude]);

    // Render weather data
    view.render(model.weather.data);
  } catch (err) {
    view.renderMessage(err.message);
  }
}

const controlGetLocationWeather = () => {
  view.renderSpinner();

  // Get device location
  if (navigator.geolocation) {
  // If location collected invoke async function, else render message
    navigator.geolocation.getCurrentPosition(loadLocation, () => {
      view.renderMessage();
    });
  }
};


async function controlSearchWeather() {
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
    view.renderMessage(err.message);
  }
}

const controlConvert = (unit) => {
  model.convertUnit(unit);
  view.render(model.weather.data);
};

const init = () => {
  addHandlerRender(controlGetLocationWeather);
  view.addHandlerSearch(controlSearchWeather);
  view.addHandlerConvert(controlConvert);
};

export default init();
