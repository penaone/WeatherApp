$(document).ready(function () {
    //     resetForms();
    // });
    //     function resetForms() {
    //         document.forms['container'].reset();
    
    console.log('loaded')
    $('#search-button').click(function () {
        var city = $("#city").val();
        if (city != '') {
            
            fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + "&appid=97e4fcc98ad340027b7c5a1171215ffc" + "&units=imperial")
                .then(function (res) {
                    return res.json()
                }) // convert data to JSON
                .then(async function (data) {
                    //console.log(data);
                    var lat = data.coord.lat;
                    var lon = data.coord.lon;
                    var second_data = await secondFetch(lat, lon);
                    console.log("second_data")
                     console.log(second_data)
                    display(data, second_data);
                    forecast(second_data);
                    uviColor(second_data);
                    
                })
                .catch(function (error) {
                    // console.log(error);
                });
            async function secondFetch(lat, lon) {
                //fetch uvi data from api.
                //return the uvi
                var response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=97e4fcc98ad340027b7c5a1171215ffc&units=imperial`)
                return await response.json();
            }
        } else {
            $("#error").html("Field cannot be empty")
        
        }
    });
});
    function display(data, second_data) {
    console.log("here it is");
    var displayEl = $("#display");
    console.log('display is:', displayEl)
    displayEl.empty()
    var title = document.createElement("h2");
    title.textContent = "Current Conditions for " + data.name
    title.setAttribute("class", "card-title");
    var card = document.createElement("div")
    card.setAttribute("class", "card");
    $(".icon").html("<img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png' alt='Icon depicting current weather.'>");
    var temp = document.createElement("p");
    temp.setAttribute("class", "card-text");
    temp.textContent = "Temperature: " + data.main.temp + " degrees"
    var humidity = document.createElement("p");
    humidity.setAttribute("class", "card-text");
    humidity.textContent = "Humidity: " + data.main.humidity + "%"
    var speed = document.createElement("p");
    speed.setAttribute("class", "card-text");
    speed.textContent = "Wind Speed: " + data.wind.speed + " mph"
    var uvi = document.createElement("p");
    uvi.setAttribute("class", "card-textuv");
    uvi.textContent = "UV Index: " + second_data.current.uvi
    card.appendChild(title)
    card.appendChild(temp)
    card.appendChild(humidity)
    card.appendChild(speed)
    card.appendChild(uvi)
    console.log('your card is: ', card)
    $("#display").append(card)    
}
    var uviColor = function(second_data) {
    var uviValue = second_data.current.uvi;
    console.log(uviValue)
    if (uviValue < 3) {
        document.querySelector(".card-textuv").style.color = "cyan";
    } else if (uviValue >= 8) {
        document.querySelector(".card-textuv").style.color = "red";
    } else {
        document.querySelector(".card-textuv").style.color = "goldenrod";
    }
}
    var forecast =  function(second_data) {
    var forecastListElem = $("#listForecast")
    console.log(forecastListElem)
    forecastListElem.empty()        
    for (var i = 0; i < 5; i++) {
        console.log('in for loop')
        var card = document.createElement("div")
        card.setAttribute("class", "card");
        $(".iconf[i]").html("<img src='http://openweathermap.org/img/w/" + second_data.daily[i].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
        var date = document.createElement("p");
        date.setAttribute("class", "card-text");
        date.textContent = "Forecast " + moment.unix(second_data.daily[i].dt).format("MMM, Do")
        var icon = document.createElement("p");
        icon.setAttribute("class", "card-image-top");
        //icon.img= second_data.daily[i].weather[0].icon
        var temp = document.createElement("p");
        temp.setAttribute("class", "card-text");
        temp.textContent = "Temp: " + second_data.daily[i].temp.day
        var humidity = document.createElement("p");
        humidity.setAttribute("class", "card-text");
        humidity.textContent = "Humidity: " + second_data.daily[i].humidity
        var speed = document.createElement("p");
        speed.setAttribute("class", "card-text");
        speed.textContent = "Wind: " + second_data.daily[i].wind_speed
        card.appendChild(icon)
        card.appendChild(date)
        card.appendChild(temp)
        card.appendChild(humidity)
        card.appendChild(speed)
        $("#listForecast").append(card)
    }
}
