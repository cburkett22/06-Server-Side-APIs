$(document).ready(function() {
    let searchBtn = $(".search-btn");
    let previousCity = JSON.parse(localStorage.getItem("weather"));
    console.log(previousCity);

    $(searchBtn).on("click", renderWeather)
    function renderWeather(town){
        forecastDates();

        // Recent Searches
        let city = $("#search-input").val().trim() || town;
        let firstLetter = city.charAt(0).toUpperCase();
        let string = city.slice(1);
        let recentSearch = $(`<li id="${city}" class='list-group-item'>${firstLetter + string}</li>`);
        previousCity = city;

            $(".list-group").append(recentSearch);

        // Not able to click on recent search and populate data
        $(recentSearch).on("click", function() {
            let cityId = $(this).attr("id");
            let city = cityId;
            renderWeather(city);
        });

        // 5-Day Forecast
        function forecastDates() {
            $("#date1").text(moment().add(1, "day").format("MM/D/YY"));
            $("#date2").text(moment().add(2, "day").format("MM/D/YY"));
            $("#date3").text(moment().add(3, "day").format("MM/D/YY"));
            $("#date4").text(moment().add(4, "day").format("MM/D/YY"));
            $("#date5").text(moment().add(5, "day").format("MM/D/YY"));
        }

        // First AJAX call to get current weather data
        let apiKey = "e18164696c4ada0b555895d5a320bc08";
        let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            // City name & date
            let cityName = response.name;
            let date = moment();

                $(".city-name").text(cityName + date.format(" (M/D/YYYY)"));

            // Icon
            let icon = response.weather[0].icon;
            let iconURL = `http://openweathermap.org/img/w/${icon}.png`;
            
                $("#icon1").attr("src", iconURL);

            // Temperature
            let tempK = response.main.temp;
            let tempF = ((tempK - 273.15) * 1.8) + 32;

                $(".temp").text("Temperature: " + tempF.toFixed(2) + " °F");

            // Humidity
            let humidity = response.main.humidity;

                $(".humid").text("Humidity: " + humidity + "%");

            // Wind Speed
            let wind = response.wind.speed;

                $(".wind-speed").text("Wind Speed: " + wind + " MPH");

            // AJAX calls to get the UV Index and future weather
            let lat = response.coord.lat;
            let lon = response.coord.lon;
            let oneCallURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=&appid=${apiKey}`;

            $.ajax({
                url: oneCallURL,
                method: "GET"
            }).then(function(response) {
                let uvIndex = response.current.uvi;
    
                $(".uv").text("UV Index: " + uvIndex);

                // Day One
                let day1Icon = response.daily[1].weather[0].icon;
                let icon1URL = `http://openweathermap.org/img/w/${day1Icon}.png`;

                    $("#icon2").attr("src", icon1URL);

                let day1Temp = response.daily[1].temp.day;
                let oneF = ((day1Temp - 273.15) * 1.8) + 32;

                    $(".temp1").text(oneF.toFixed(2) + " °F");

                let day1Humid = response.daily[1].humidity;

                    $(".humid1").text("Humidity: " + day1Humid + "%");

                // Day Two
                let day2Icon = response.daily[2].weather[0].icon;
                let icon2URL = `http://openweathermap.org/img/w/${day2Icon}.png`;

                    $("#icon3").attr("src", icon2URL);

                let day2Temp = response.daily[2].temp.day;
                let twoF = ((day2Temp - 273.15) * 1.8) + 32;

                    $(".temp2").text(twoF.toFixed(2) + " °F");

                let day2Humid = response.daily[2].humidity;

                    $(".humid2").text("Humidity: " + day2Humid + "%");

                // Day Three
                let day3Icon = response.daily[3].weather[0].icon;
                let icon3URL = `http://openweathermap.org/img/w/${day3Icon}.png`;

                    $("#icon4").attr("src", icon3URL);

                let day3Temp = response.daily[3].temp.day;
                let threeF = ((day3Temp - 273.15) * 1.8) + 32;

                    $(".temp3").text(threeF.toFixed(2) + " °F");

                let day3Humid = response.daily[3].humidity;

                    $(".humid3").text("Humidity: " + day3Humid + "%");

                // Day Four
                let day4Icon = response.daily[4].weather[0].icon;
                let icon4URL = `http://openweathermap.org/img/w/${day4Icon}.png`;

                    $("#icon5").attr("src", icon4URL);

                let day4Temp = response.daily[4].temp.day;
                let fourF = ((day4Temp - 273.15) * 1.8) + 32;

                    $(".temp4").text(fourF.toFixed(2) + " °F");

                let day4Humid = response.daily[4].humidity;

                    $(".humid4").text("Humidity: " + day4Humid + "%");

                // Day Five
                let day5Icon = response.daily[5].weather[0].icon;
                let icon5URL = `http://openweathermap.org/img/w/${day5Icon}.png`;

                    $("#icon6").attr("src", icon5URL);

                let day5Temp = response.daily[5].temp.day;
                let fiveF = ((day5Temp - 273.15) * 1.8) + 32;

                    $(".temp5").text(fiveF.toFixed(2) + " °F");

                let day5Humid = response.daily[5].humidity;

                    $(".humid5").text("Humidity: " + day5Humid + "%");

                // Local Storage
                let cityStats = {
                    name: cityName,
                    currentIcon: iconURL,
                    currentTemp: tempF
                };

                localStorage.setItem("weather", JSON.stringify(cityStats));

            });

        });
    };
    renderWeather(previousCity.name);
    console.log(previousCity.name);
});