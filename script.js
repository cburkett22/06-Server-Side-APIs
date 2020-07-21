$(document).ready(function() {
    let searchBtn = $(".search-btn");

    $(searchBtn).on("click", function() {
        forecastDates();

        // Recent Searches
        let list = $(".list-group");
        let city = $("#search-input").val().trim();
        let firstLetter = city.charAt(0).toUpperCase()
        let string = city.slice(1);
        let recentSearch = $(`<li class='list-group-item'>${firstLetter + string}</li>`);

        list.append(recentSearch);

        $(recentSearch).on("click", function() {
            alert("I've been clicked!");
        });

        // 5-Day Forecast
        function forecastDates() {
            $("#dayOne").text(moment().add(1, "day").format("MM/D/YY"));
            $("#dayTwo").text(moment().add(2, "day").format("MM/D/YY"));
            $("#dayThree").text(moment().add(3, "day").format("MM/D/YY"));
            $("#dayFour").text(moment().add(4, "day").format("MM/D/YY"));
            $("#dayFive").text(moment().add(5, "day").format("MM/D/YY"));
        }

        // First AJAX call to get current weather data
        let apiKey = "e18164696c4ada0b555895d5a320bc08";
        let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            let currentCityDiv = $("#current-city");

            // City name
            let cityName = response.name;
            let today = moment();
            let h2Name = $(".city-name").text(cityName + today.format(" (M/D/YYYY)"));

            currentCityDiv.html(h2Name);

            // // Icon
            // let iconDiv = $(".city-name");
            // let icon = response.weather[0].icon;
            // let iconURL = `<img src="http://openweathermap.org/img/w/${icon}.png" alt="weather icon">`;

            // iconDiv.html(iconURL);
            
            // // Temperature
            // let tempK = response.main.temp;
            // let tempF = ((tempK - 273.15) * 1.8) + 32;
            // let pTemp = $("<p class='todays-weather'>").text("Temperature: " + tempF.toFixed(2) + " °F");

            // currentCityDiv.html(pTemp);

            // // Humidity
            // let humidity = response.main.humidity;
            // let pHumid = $("<p class='todays-weather'>").text("Humidity: " + humidity + "%");

            // currentCityDiv.html(pHumid);

            // // Wind Speed
            // let wind = response.wind.speed;
            // let pWind = $("<p class='todays-weather'>").text("Wind Speed: " + wind + " MPH");

            // currentCityDiv.html(pWind);

            // AJAX calls to get the UV Index and future weather
            let lat = response.coord.lat;
            let lon = response.coord.lon;
            let oneCallURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=&appid=${apiKey}`;

            $.ajax({
                url: oneCallURL,
                method: "GET"
            }).then(function(response) {
                let currentCityDiv = $("#current-city");
                let uvIndex = response.current.uvi;
                let pUv = $("<p class='todays-weather'>").text("UV Index: " + uvIndex);
    
                currentCityDiv.append(pUv);

                // Append the future weather conditions here

                // Day One
                let dayOneIcon = response.daily[1].weather[0].icon;
                let iconOneURL = `<img src="http://openweathermap.org/img/w/${dayOneIcon}.png" alt="weather icon">`;

                $("#dayOne").append(iconOneURL);

                let dayOneTemp = response.daily[1].temp.day;
                let oneF = ((dayOneTemp - 273.15) * 1.8) + 32;
                let pTempOne = $("<p class='forecast-info'>").text(oneF.toFixed(2) + " °F");

                $("#dayOne").append(pTempOne);

                let dayOneHumid = response.daily[1].humidity;
                let pHumidOne = $("<p class='forecast-info'>").text("Humidity: " + dayOneHumid + "%");

                $("#dayOne").append(pHumidOne);

                // Day Two
                let dayTwoIcon = response.daily[2].weather[0].icon;
                let iconTwoURL = `<img src="http://openweathermap.org/img/w/${dayTwoIcon}.png" alt="weather icon">`;

                $("#dayTwo").append(iconTwoURL);

                let dayTwoTemp = response.daily[2].temp.day;
                let TwoF = ((dayTwoTemp - 273.15) * 1.8) + 32;
                let pTempTwo = $("<p class='forecast-info'>").text(TwoF.toFixed(2) + " °F");

                $("#dayTwo").append(pTempTwo);

                let dayTwoHumid = response.daily[2].humidity;
                let pHumidTwo = $("<p class='forecast-info'>").text("Humidity: " + dayTwoHumid + "%");

                $("#dayTwo").append(pHumidTwo);

                // Day Three
                let dayThreeIcon = response.daily[3].weather[0].icon;
                let iconThreeURL = `<img src="http://openweathermap.org/img/w/${dayThreeIcon}.png" alt="weather icon">`;

                $("#dayThree").append(iconThreeURL);

                let dayThreeTemp = response.daily[3].temp.day;
                let ThreeF = ((dayThreeTemp - 273.15) * 1.8) + 32;
                let pTempThree = $("<p class='forecast-info'>").text(ThreeF.toFixed(2) + " °F");

                $("#dayThree").append(pTempThree);

                let dayThreeHumid = response.daily[3].humidity;
                let pHumidThree = $("<p class='forecast-info'>").text("Humidity: " + dayThreeHumid + "%");

                $("#dayThree").append(pHumidThree);

                // Day Four
                let dayFourIcon = response.daily[4].weather[0].icon;
                let iconFourURL = `<img src="http://openweathermap.org/img/w/${dayFourIcon}.png" alt="weather icon">`;

                $("#dayFour").append(iconFourURL);

                let dayFourTemp = response.daily[4].temp.day;
                let FourF = ((dayFourTemp - 273.15) * 1.8) + 32;
                let pTempFour = $("<p class='forecast-info'>").text(FourF.toFixed(2) + " °F");

                $("#dayFour").append(pTempFour);

                let dayFourHumid = response.daily[4].humidity;
                let pHumidFour = $("<p class='forecast-info'>").text("Humidity: " + dayFourHumid + "%");

                $("#dayFour").append(pHumidFour);

                // Day Five
                let dayFiveIcon = response.daily[5].weather[0].icon;
                let iconFiveURL = `<img src="http://openweathermap.org/img/w/${dayFiveIcon}.png" alt="weather icon">`;

                $("#dayFive").append(iconFiveURL);

                let dayFiveTemp = response.daily[5].temp.day;
                let FiveF = ((dayFiveTemp - 273.15) * 1.8) + 32;
                let pTempFive = $("<p class='forecast-info'>").text(FiveF.toFixed(2) + " °F");

                $("#dayFive").append(pTempFive);

                let dayFiveHumid = response.daily[5].humidity;
                let pHumidFive = $("<p class='forecast-info'>").text("Humidity: " + dayFiveHumid + "%");

                $("#dayFive").append(pHumidFive);
            });

        });
    });
});