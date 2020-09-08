# WeatherApp

The weather App Challenge is a very commanding app.
I had to access the openweathermap.org api's and fetch the relevant weather data. I had to put that data into my page in the form of a current conditions call and a five day forecast call.
This was very challenging.

The calls were made appropriately. The biggest challenges for me included the local storage component that required me to set to local storage the cities that I had searched and then recall them to a dropdown list to be used in the future. 
I was able to do this but upon doing this it created an error that I was unable to solve. I have commented out the lines that work for one call, but give a null page on the second call. These are lines: 23-37.

** Alert**I have resubmitted albeit late after discovering the problem. The problem was that on the previous line 31 was a document.write that is not liked by google chrome. After removing this line of code and line 30 which now showed uneeded text, the Code works properly.

I also was unable to get the icons to come into my forecast cards.

All other requirements were met.

https://penaone.github.io/WeatherApp/

https://github.com/penaone/WeatherApp