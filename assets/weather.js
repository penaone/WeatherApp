$(document).ready(function(){

    $('#search-button').click(function(){

        var city = $("#city").val();

        if(city != ''){

       
            $.ajax({

               url: 'https://api.openweathermap.org/data/2.5/weather?q=' + city + "&units=imperial" + "&appid=97e4fcc98ad340027b7c5a1171215ffc",
                type: "GET",
                dataType: "jsonp",
                success: function(data){
                console.log(data);
                }

            });
        }else{
            $("#error").html("Field cannot be empty")
        }
        });
    });
