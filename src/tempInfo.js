const getTempInfo= async(location) =>{
    const locationInfo = location;
    try{
        const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Benin&appid=da55a677205c556d6c26145698c431fd`) 
        const locationData= await response.json();
        const tempInKelvin= parseFloat(locationData.main.temp);
        const tempInCelcius = tempInKelvin - 273.15;
        const tempInFarenheit = (tempInCelcius * 1.8) + 32
        console.log("kelvin: ", tempInKelvin.toFixed(2));
        console.log("celcius: ",tempInCelcius.toFixed(2));
        console.log("fareheit: ",tempInFarenheit.toFixed(2));
    }catch(err){
        console.log(err);
    }
}
  
export default getTempInfo();