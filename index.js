

const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = `99f822b44f45ab586f72a3a9015a56d6`;


weatherForm.addEventListener("submit", async event => {
    
    event.preventDefault();



    getWeatherData();
    displayWeatherInfo();
    getWeatherEmoji();
    displayError();

})

async function getWeatherData(city) {
    city = cityInput.value;
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
    console.log(response)

    if(!response.ok){
        displayError();
        
    }
    const data = response.json();
    console.log(data)
    
}

function displayWeatherInfo(data){


}

function getWeatherEmoji(weatherId){

}

function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("erorrMessage");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
    
}