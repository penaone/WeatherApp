$(document).ready(function () {

    $('#search-button').click(function () {
        

        var city = $("#city").val();
        

        if (city != '') {
            //    function weatherinfo(city) {
            //    var key = '97e4fcc98ad340027b7c5a1171215ffc';
            fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city  + "&appid=97e4fcc98ad340027b7c5a1171215ffc" + "&units=imperial")
                .then(function (res) {
                return res.json()
                }) // convert data to JSON
                .then(function (data) {
                    console.log(data);
                    var lat = data.coord.lat;
                    var lon = data.coord.lon;
                    secondFetch(lat,lon);
                    display(data);
                    
                    
                    


                })
                .catch(function (error) {
                    console.log(error);
                    
                });


           function secondFetch(lat,lon){
               fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=97e4fcc98ad340027b7c5a1171215ffc`)
                .then(function (res) {
                return res.json()
                }) // convert data to JSON
                .then(function (data) {
                    console.log(data);
                   
                    
                })
                .catch(function () {
                    

                });
            }

            // window.onload = function() {
           


        } else {
            $("#error").html("Field cannot be empty")
        }
    });
});

function display(data) {
    var displayEl=document.querySelector("#display");
    var title=document.createElement("h2");
    title.textContent="Current Conditions for " + data.name
    title.setAttribute("class","card-title");
    var card=document.createElement("div")
    card.setAttribute("class","card");

    var temp =document.createElement("p");
    temp.setAttribute("class","card-text");
    temp.textContent= "Temperature:" + data.main.temp 
    


    var humidity =document.createElement("p");
    humidity.setAttribute("class","card-text");
    humidity.textContent= "Humidity:" + data.main.humidity


    var speed =document.createElement("p");
    speed.setAttribute("class","card-text");
    speed.textContent= "Wind Speed:" + data.wind.speed

    var uvi =document.createElement("p");
    uvi.setAttribute("class","card-text");
    uvi.textContent= "UV Index:" + data.uvi

    card.appendChild(title)
    card.appendChild(temp)
    card.appendChild(humidity)
    card.appendChild(speed)
    card.appendChild(uvi)
    displayEl.appendChild(card)



    // var newHtml =  "<h2>Current Conditions for " + data.name + ", " + "</h2>" +
    //     "<h3><strong>Temperature</strong>: " + data.main.temp + "</h3>" +
    //     "<h3><strong>Humidity</strong>: " + data.main.humidity + "</h3>" +
    //     "<h3><strong>Wind Speed</strong>: " + data.wind.speed + "</h3>";
    //"<h3><strong>UV Index</strong>: "+ data.current.uvi + "</h3>";
    
}