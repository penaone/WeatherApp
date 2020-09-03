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
                    
                    
                    


                })
                .catch(function (error) {
                    console.log(error);
                    
                });


           async function secondFetch(lat,lon){
               

               //make a uvi variable.
               //fetch uvi data from api.
               //set uvi variable equal to uvi from response
               //return the uvi
                var response =  await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=97e4fcc98ad340027b7c5a1171215ffc`)
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
   

    
    // uviColor();

    card.appendChild(title)
    card.appendChild(temp)
    card.appendChild(humidity)
    card.appendChild(speed)
    card.appendChild(uvi)
    displayEl.appendChild(card)



//      function uviColor(){
//         var uviValue =  second_data.current.uvi;
//      if (uviValue < 3) {
//          ("uvi.textContent").style.backgroundColor = '#00FFFF';
//      }
//      else if (uviValue >=3 && uviValue <8){
//         ("uvi.textContent").style.backgroundColor = '#FF4500';
//      }
//     else if (uviValue >= 8){
//         ("uvi.textContent").style.backgroundColor = '#FF0000';
//     }
// }
}

function forecast(data, second_data) {
    var forecastEl=document.querySelector("#forecast");
    var title=document.createElement("h4")
    title.textContent="Forecast for" + data.name
    title.setAttribute("class","card-title");
    var card=document.createElement("div")
    card.setAttribute("class","card");
    $(".icon").html("<img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png' alt='Icon depicting current weather.'>");
  
   var date =document.createElement("p");
   date.setAttribute("class","card-text");
   date.textContent= "Date:" + second_data.daily.dt
   
   
    var temp =document.createElement("p");
    temp.setAttribute("class","card-text");
    temp.textContent= "Temperature:" + second_data.daily.temp   


    var humidity =document.createElement("p");
    humidity.setAttribute("class","card-text");
    humidity.textContent= "Humidity:" + second_data.daily.humidity

    var speed =document.createElement("p");
    speed.setAttribute("class","card-text");
    speed.textContent= "Wind Speed:" + second_data.daily.wind.speed

    card.appendChild(date)
    card.appendChild(title)
    card.appendChild(temp)
    card.appendChild(humidity)
    card.appendChild(speed)
    forecastEl.appendChild(card)
}






