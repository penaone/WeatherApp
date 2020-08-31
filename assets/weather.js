$(document).ready(function(){

    $('#search-button').click(function(){

        var city = $("#city").val();

        if(city != ''){

       
            $.ajax({

               url: 'https://api.openweathermap.org/data/2.5/weather?q=' + city + "&units=imperial" + "&appid=97e4fcc98ad340027b7c5a1171215ffc",
                type: "GET",
                dataType: "jsonp",
                success: function(data){
                var info = display(data);


                $("#display").html(info);
                $("#city").val('');
                }

            });
        }else{
            $("#error").html("Field cannot be empty")
        }
        });
    });
    function display(data){
        return "<h2>Current Conditions for " + data.name + ", " +"</h2>" +
               "<h3><strong>Temperature</strong>: "+ data.main.temp + "</h3>" +
               "<h3><strong>Humidity</strong>: "+ data.main.humidity + "</h3>" +
               "<h3><strong>Wind Speed</strong>: "+ data.wind.speed + "</h3>";
            //    "<h3><strong>UV Index</strong>: "

    }
