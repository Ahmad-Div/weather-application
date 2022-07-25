const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.listen(3000, function () {
  console.log("Ahmad Software Server started!");
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  let city = req.body.city;
  console.log(city);
  https.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0e049a7a064b0dfc580abdad35dad21f&units=metric`,
    function (response) {
      console.log(response.statusCode);
      response.on("data", function (data) {
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const weatherDescription = weatherData.weather[0].description;
        const countryName = weatherData.name;
        const weatherImage = weatherData.weather[0].icon;
        console.log(weatherData);
        console.log(weatherImage);
        console.log(countryName);
        console.log(temp);
        console.log(weatherDescription);
        res.send(
          `<h1>The weather in
              ${countryName}
               is
              ${temp}
               degrees Celcius,
               The weather is currently ${weatherDescription}
              </h1>
              <hr>
              <img src="http://openweathermap.org/img/wn/${weatherImage}@2x.png">
              `
        );
      });
    }
  );
});
