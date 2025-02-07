

const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = `99f822b44f45ab586f72a3a9015a56d6`;


weatherForm.addEventListener("submit", async event => {
    
    event.preventDefault();

    city = cityInput.value;

    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.log(error)
            errorDisplay(error)
        }
    }
    else{
        displayError("Please enter the city")
    }

})

async function getWeatherData(city) {
    
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiUrl);
    console.log(response)
    if(!response.ok){
        displayError("Error 400, Bad Request - city does not exist")
    }

    return await response.json();
    


    
}

function displayWeatherInfo(data){

    console.log(data)
    const {name: city,
            main: {temp, humidity},
            weather: [{description, id}]
    } = data;

    card.textContent = "";
    card.style.display = "flex";
    //Display City
    const cityDisplay = document.createElement("h1");
    cityDisplay.classList.add("cityDisplay")
    cityDisplay.textContent = city;
    card.appendChild(cityDisplay);

    //Display Temp
    const tempDisplay = document.createElement("p");
    tempDisplay.classList.add("tempDisplay")
    tempDisplay.textContent = `${(temp-273.15).toFixed(1)}°C`;
    card.append(tempDisplay);

    //Display Humidity
    const humidityDisplay = document.createElement("p");
    humidityDisplay.textContent = humidity;
    card.append(`Humidity: ${humidity}%`);

    //Display Weather
    const weatherIdDisplay = document.createElement("p");
    weatherIdDisplay.textContent = description;
    card.append(weatherIdDisplay);

    //Display Emoji
    const emojiDisplay = document.createElement("p");
    emojiDisplay.textContent = getWeatherEmoji(id);
    emojiDisplay.style.fontSize = "3.5rem"
    card.append(emojiDisplay)



}

function getWeatherEmoji(weatherId){

    switch(true){
        case (weatherId >= 200 || weatherId < 300):
            return "⛈️";
        case (weatherId >= 300 || weatherId < 400):
            return "🌦️";    
        case (weatherId >= 500 || weatherId < 600):
            return "🌧️";   
        case (weatherId >= 600 || weatherId < 700):
            return "🌨️";
        case (weatherId >= 700 || weatherId < 800):
            return "🌫️";  
        case (weatherId = 800):
            return "☀️";
        case (weatherId >800):
            return "☁️";     
    }
}

function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("erorrMessage");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
    
}