const fs = require('fs');

const foods = [
  ['Cheesecake', 'cheese', 'honey'],
  ['Biryani', 'rice', 'spice'],
  ['Tacos', 'corn', 'chili'],
  ['Pasta', 'tomato', 'basil'],
  ['Burger', 'beef', 'onion'],
  ['Sushi', 'rice', 'seaweed'],
  ['Pizza', 'cheese', 'oregano'],
  ['Momos', 'flour', 'chili'],
];
const locations = ['Hyderabad', 'Bangalore', 'Mumbai', 'Delhi'];
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

let csv = 'food,ingredient1,ingredient2,day,location,timestamp\n';

for (let i = 0; i < 200; i += 1) {
  const [food, ingredient1, ingredient2] = foods[Math.floor(Math.random() * foods.length)];
  const day = days[Math.floor(Math.random() * days.length)];
  const location = locations[Math.floor(Math.random() * locations.length)];
  const timestamp = new Date(Date.now() - Math.floor(Math.random() * 14) * 86400000).toISOString();
  csv += `${food},${ingredient1},${ingredient2},${day},${location},${timestamp}\n`;
}

fs.writeFileSync('sample-food-data.csv', csv, 'ascii');
console.log('Generated sample-food-data.csv');
