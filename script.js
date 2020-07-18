$(document).ready(function() {
    let searchBtn = $(".search-btn");

    $(searchBtn).on("click", function() {
        // Recent Searches
        let list = $(".list-group");
        let city = $("#search-input").val();
        let recentSearch = $(`<li class='list-group-item'>${city}</li>`)

        list.append(recentSearch)
        
        let apiKey = "e18164696c4ada0b555895d5a320bc08";
        let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    
        // First AJAX call to get current weather data
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            let currentCityDiv = $("#current-city");

            // City name
            let cityName = response.name;
            let today = moment();
            let h2Name = $(".city-name").text(cityName + today.format(" (M/D/YYYY)"));

            currentCityDiv.append(h2Name);

            // Icon
            // let displayIcon = $("<img id='wicon' src='' alt='Weather icon'>");
            // let icon = a.weather[0].icon;
            // let iconURL = "http://openweathermap.org/img/w/" + icon + ".png";

            // $('#wicon').attr('src', iconURL);
            // h2Name.append(displayIcon);
            
            // Temperature
            let tempK = response.main.temp;
            let tempF = ((tempK - 273.15) * 1.8) + 32;
            let pTemp = $("<p class='todays-weather'>").text("Temperature: " + tempF.toFixed(2) + " °F");

            currentCityDiv.append(pTemp);

            // Humidity
            let humidity = response.main.humidity;
            let pHumid = $("<p class='todays-weather'>").text("Humidity: " + humidity + "%");

            currentCityDiv.append(pHumid);

            // Wind Speed
            let wind = response.wind.speed;
            let pWind = $("<p class='todays-weather'>").text("Wind Speed: " + wind + " MPH");

            currentCityDiv.append(pWind);

            // Second AJAX call to get the UV Index
            let latitude = response.coord.lat;
            let longitude = response.coord.lon;
            let uvURL = `http://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${latitude}&lon=${longitude}`

            $.ajax({
                url: uvURL,
                method: "GET"
            }).then(function(response) {
                let currentCityDiv = $("#current-city");
                let uvIndex = response.value
                let pUv = $("<p class='todays-weather'>").text("UV Index: " + uvIndex);
    
                currentCityDiv.append(pUv);
            });

            // 5-Day Forcast
            let dayOneDiv = $("#dayOne");
            let plusOne = moment(today).add(1, 'days');
            let m1 = plusOne.format("M");
            let d1 = plusOne.format("D");
            let y1 = plusOne.format("YYYY");

            dayOneDiv.append(m1 + "/" + d1 + "/" + y1);

            let dayTwoDiv = $("#dayTwo");
            let plusTwo = moment(today).add(2, 'days');
            let m2 = plusTwo.format("M");
            let d2 = plusTwo.format("D");
            let y2 = plusTwo.format("YYYY");

            dayTwoDiv.append(m2 + "/" + d2 + "/" + y2);

            let dayThreeDiv = $("#dayThree");
            let plusThree = moment(today).add(3, 'days');
            let m3 = plusThree.format("M");
            let d3 = plusThree.format("D");
            let y3 = plusThree.format("YYYY");

            dayThreeDiv.append(m3 + "/" + d3 + "/" + y3);

            let dayFourDiv = $("#dayFour");
            let plusFour = moment(today).add(4, 'days');
            let m4 = plusFour.format("M");
            let d4 = plusFour.format("D");
            let y4 = plusFour.format("YYYY");

            dayFourDiv.append(m4 + "/" + d4 + "/" + y4);

            let dayFiveDiv = $("#dayFive");
            let plusFive = moment(today).add(5, 'days');
            let m5 = plusFive.format("M");
            let d5 = plusFive.format("D");
            let y5 = plusFive.format("YYYY");

            dayFiveDiv.append(m5 + "/" + d5 + "/" + y5);
        });

        
    });
    


});