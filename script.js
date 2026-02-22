const apiKey = "c6bbafadde0063088dc5f2c8086af6ce";
const getWeather = document.getElementById("weather");
const cityName = document.getElementById("city");
const output1 = document.getElementById("output1");
const output2 = document.getElementById("output2");
const output3 = document.getElementById("output3");
const output4 = document.getElementById("output4");
const output5 = document.getElementById("output5");

const about = document.getElementById("about");
const modal = document.getElementById("modal");
const close = document.getElementById("close");

about.addEventListener("click", () => {
    modal.classList.add("active");
})

close.addEventListener("click", () => {
    modal.classList.remove("active");
})

getWeather.addEventListener("click", async() => {
    const city = cityName.value;

    if(city){
        try{
            const weatherData = await weather(city);
            displayWeather(weatherData);
        }
        catch(error){
            window.alert(error.message);
        }
    }
    else{
        window.alert("Enter City");
    }
})

async function weather(city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiUrl);

    if(!response.ok){
        throw new Error("could not fetch weather data");
    }

    return await response.json();
}

function displayWeather(weather){
    const {name: city, 
           main: {temp, humidity}, 
           weather: [{description, id}]} = weather;

    output1.textContent = `city: ${city}`;
    output2.textContent = `Temp: ${(temp - 273.15).toFixed(1)} °C`;
    output3.textContent = `Humidity: ${humidity}`;
    output4.textContent = description;
    output5.textContent = `Weather: ${emoji(id)}`;
}

function emoji(id){
    switch(true){
        case (id >= 200 && id < 300):
            return "🌩️";
        case (id >= 300 && id < 600):
            return "🌧️";
        case (id >= 600 && id < 700):
            return "❄️";
        case (id >= 700 && id < 810):
            return "☀️";
    }
}