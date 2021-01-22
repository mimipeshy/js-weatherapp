import { KEY, API_URL, UNIT, REST_COUNTRY_URL } from "./config";
import { AJAX } from "./helper";

export const weather = {
  data: {},
};

const convertTime = function (timestamp, format = "short") {
  const options =
    format === "full"
      ? { dateStyle: "full", timeStyle: "short" }
      : { timeStyle: "short" };
  const date = new Date(timestamp * 1000);
  const time = new Intl.DateTimeFormat(navigator.language, options).format(
    date
  );

  return time;
};

export const convertUnit = function (unit) {
  if (unit === "imperial") {
    weather.data.temp = Math.round((weather.data.temp * 9) / 5 + 32);
    weather.data.feelsLike = Math.round((weather.data.feelsLike * 9) / 5 + 32);
    weather.data.unit = "imperial";
  }

  if (unit === "metric") {
    weather.data.temp = Math.round(((weather.data.temp - 32) * 5) / 9);
    weather.data.feelsLike = Math.round(
      ((weather.data.feelsLike - 32) * 5) / 9
    );
    weather.data.unit = "metric";
  }
};

export const loadWeather = async function (loc) {
  const parameter = Array.isArray(loc)
    ? `lat=${loc[0]}&lon=${loc[1]}`
    : `q=${loc}`;

  try {
    const data = await AJAX(
      `${API_URL}${parameter}&units=${UNIT}&appid=${KEY}`
    );

    weather.data = {
      name: data.name,
      country: data.sys.country,
      temp: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      sunrise: convertTime(data.sys.sunrise),
      sunset: convertTime(data.sys.sunset),
      date: convertTime(data.dt, "full"),
      iconSmall: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
      description:
        data.weather[0].description[0].toUpperCase() +
        data.weather[0].description.slice(1),
      unit: UNIT,
    };

    const data2 = await AJAX(`${REST_COUNTRY_URL}${weather.data.country}`);

    weather.data.flag = data2[0].flag;
  } catch (err) {
    throw err;
  }
};
