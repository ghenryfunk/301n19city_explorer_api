'use strict';

// Bring in our dependencies
const express = require('express');
const cors = require('cors');
const { response, request } = require('express');

require('dotenv').config();

// Declare our port for our server to listen on
const PORT = process.env.PORT || 3000;

// Instanciate express
const app = express();

// Use cors (cross origin resource sharing)
app.use(cors());

// Get routes
app.get('/', (request, response) => {
  response.send('Hello World');
});

app.get('/location', (request, response) => {
  let city = request.query.city;
  // simulate getting the data from a database or API, using a flat file
  let data = require('./data/location.json')[0];
  let location = new Location(data, city);
  response.send(location);
});

app.get('/restaurants', (request, response) => {
  let data = require('./data/restaurants.json');
  let restaurantArray = [];
  data.nearby_restaurants.forEach(value => {
    let restaurant = new Restaurant(value);
    restaurantArray.push(restaurant);
  });

  response.send(restaurantArray);
});

// Create a constructor to tailor our incoming raw data

function Location(obj, query) {
  this.lat = obj.lat;
  this.lon = obj.lon;
  this.search_query = query;
  this.location = obj.display_name;
}

function Restaurant(obj) {
  this.url = obj.url;
  this.name = obj.name;
  this.rating = obj.user_rating.aggregate_rating;
  this.cost = obj.price_range;
  this.image_url = obj.thumb;

}

// Start our server! Tell it what port to listen on
app.listen(PORT, () => {
  console.log(`Server is now listening on port ${PORT}`);
});