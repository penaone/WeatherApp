$(document).ready(function () {

    $('#search-button').click(function () {
        

        var city = $("#city").val();
        window.localStorage.setItem('input', JSON.stringify(city));
        window.localStorage.getItem('city');

        

        if (city != '') {
            //    function weatherinfo(city) {
            //    var key = '97e4fcc98ad340027b7c5a1171215ffc';
            fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city  + "&appid=97e4fcc98ad340027b7c5a1171215ffc" + "&units=imperial")
                .then(function (res) {
                return res.json()
                }) // convert data to JSON
                .then(async function (data) {
                    console.log(data);
                    var lat = data.coord.lat;
                    var lon = data.coord.lon;
                    var second_data = await secondFetch(lat,lon);
                    console.log("Second_data")
                    console.log(second_data)
                    display(data, second_data);
                    forecast(second_data);
                    

                    
                    


                })
                .catch(function (error) {
                    console.log(error);
                    
                });


           async function secondFetch(lat,lon){
               

               //make a uvi variable.
               //fetch uvi data from api.
               //set uvi variable equal to uvi from response
               //return the uvi
                var response =  await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=97e4fcc98ad340027b7c5a1171215ffc&units=imperial`)
                return await response.json();
                    
                
            }                     


        } else {
            $("#error").html("Field cannot be empty")
        }
    });
});

function display(data, second_data) {
    console.log("display data")
    console.log(data)
    var displayEl=document.querySelector("#display");
    var title=document.createElement("h2");
    title.textContent="Current Conditions for " + data.name
    title.setAttribute("class","card-title");
    var card=document.createElement("div")
    card.setAttribute("class","card");
    $(".icon").html("<img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png' alt='Icon depicting current weather.'>");
   
    var temp =document.createElement("p");
    temp.setAttribute("class","card-text");
    temp.textContent= "Temperature: " + data.main.temp + " degrees"
    


    var humidity =document.createElement("p");
    humidity.setAttribute("class","card-text");
    humidity.textContent= "Humidity: " + data.main.humidity + "%"


    var speed =document.createElement("p");
    speed.setAttribute("class","card-text");
    speed.textContent= "Wind Speed: " + data.wind.speed + " mph"

    var uvi =document.createElement("p");
    uvi.setAttribute("class","card-text");
    uvi.textContent= "UV Index: " + second_data.current.uvi
   

    
  
    card.appendChild(title)
    card.appendChild(temp)
    card.appendChild(humidity)
    card.appendChild(speed)
    card.appendChild(uvi)
    displayEl.appendChild(card)
    uviColor();

     function uviColor(){
        var uviValue =  second_data.current.uvi;
     if (uviValue < 3) {
         uvi.textContent.style.background-color; '#00FFFF';
     }
     else if (uviValue >=3 && uviValue <8){
        uvi.textContent.style.background-color; '#FF4500';
     }
    else if (uviValue >= 8){
        uvi.textContent.style.background-color; '#FF0000';
    }
}
}

function forecast(second_data) {
    var forecastListElem= document.querySelector("#listForecast")
    console.log("------>", second_data)
    // loop second_data.daily
for(i=0; i<5; i++){
    //console.log(second_data.daily[i])
    var forecastEl=document.querySelector("#forecast");
    
    var card=document.createElement("div")
    card.setAttribute("class","card");
    $(".icon[i]").html("<img src='http://openweathermap.org/img/w/" + second_data.daily[i].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
  
   var date =document.createElement("p");
   date.setAttribute("class","card-text");
   date.textContent= "Forecast " + moment.unix(second_data.daily[i].dt).format("MMM, Do")

   var icon =document.createElement("p");
    icon.setAttribute("class","card-image-top");
    icon.img= second_data.daily[i].weather[0].icon
   
   
    var temp =document.createElement("p");
    temp.setAttribute("class","card-text");
    temp.textContent= "Temp: " + second_data.daily[i].temp.day  


    var humidity =document.createElement("p");
    humidity.setAttribute("class","card-text");
    humidity.textContent= "Humidity: " + second_data.daily[i].humidity

    var speed =document.createElement("p");
    speed.setAttribute("class","card-text");
    speed.textContent= "Wind: " + second_data.daily[i].wind_speed

    card.appendChild(icon)
    card.appendChild(date)
    card.appendChild(temp)
    card.appendChild(humidity)
    card.appendChild(speed)
    console.log(card)
    forecastListElem.appendChild(card)

    
    // end the loop
}
}






