    //GEOLOCATION and WEATHER API//
    if ("geolocation" in navigator) {
        console.log("yes")
        const newLocal = "imageicon";
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log(position.coords.latitude, position.coords.longitude);
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            
            var url = "https://api.weatherbit.io/v2.0/current?lat=" + lat + "&lon=" +lon + "&key=b043c499b7974ee8bc0761e9a5f173b1"
            function weatherBalloon() {
                fetch(url)
                    .then(function (resp) { return resp.json() }) // Convert data to json
                    .then(function (data) {
                        console.log(data)
                        // today's date
                        var today = new Date();
                        var yy = today.getFullYear();
                        var dd = today.getDate();
                        var mm = today.getMonth() + 1; 
                        var hh = today.getHours();
                        var min = today.getMinutes();
                        if (min < 10) {
                            min = "0"+ min
                        }
                        var day = today.getDay();
                        var dayname = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
                        var monthname = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
                        var date = dayname[day] + " " + monthname[mm-1] + " " + dd + " " + yy + " " + hh + ":" + min;
                        console.log(date)

                        //get date from API
                        var city = data.data[0].city_name;
                        var state = data.data[0].state_code;
                        var weather = data.data[0].weather.description;
                        var icon = Number(data.data[0].weather.code);
                        var precip = data.data[0].precip;
                        var temp = Number(data.data[0].temp) * 1.8 + 32;
                        var wind = Number(data.data[0].wind_spd) * 2.23694;
                        
                        //set icon
                        var imageicon
                        if (icon == 800) {
                            imageicon = "/img/800.svg"
                        } else if (icon == 802 || icon == 803 || icon == 801) {
                            imageicon = "img/802.svg"
                        } else if (icon = 804) {
                            imageicon = "img/801.svg"
                        } else if (icon > 700) {
                            imageicon = "img/700.svg"
                        } else if (icon > 600) {
                            imageicon = "img/600.svg"
                        } else if (icon > 500) {
                            imageicon = "img/500.svg"
                        } else if (icon > 300) {
                            imageicon = "img/300.svg"
                        } else {
                            imageicon = "img/200.svg"
                        } 
                        
                        //add data to HTML
                        document.getElementById("city").innerHTML = city + ", " + state
                        document.getElementById("date").innerHTML = date;
                        document.getElementById("precip").innerHTML = precip + "%";
                        document.getElementById("wind").innerHTML = Math.round(wind) + "ml/h"
                        document.getElementById("temp").innerHTML = Math.round(temp);
                        document.getElementById("description").innerHTML = weather;
                        document.getElementById("weather-icon").setAttribute("xlink:href", imageicon);
                    })
                    .catch(function () {
                        console.log("catch")
                    });
            };
            weatherBalloon()

        });

    } else {
        console.log("no data")
    }
    





