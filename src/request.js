const key = 'da55a677205c556d6c26145698c431fd';
const requestCity = async (city) => {
    const baseURL = 'http://api.openweathermap.org/data/2.5/weather'
    const query = `?q=${city}&appid=${key}`;

    //make fetch call (promise call)
    const response = await fetch(baseURL + query);
    //promise data
    const data = await response.json();
    return data;

}
