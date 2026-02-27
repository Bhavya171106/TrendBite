const foodService = require('./foodService');

const foods = [
  ['Cheesecake', 'cheese', 'honey'],
  ['Biryani', 'rice', 'spice'],
  ['Tacos', 'corn', 'chili'],
  ['Pasta', 'tomato', 'basil'],
  ['Burger', 'beef', 'onion'],
  ['Sushi', 'rice', 'seaweed'],
  ['Pizza', 'cheese', 'oregano'],
  ['Momos', 'flour', 'chili'],
  ['Falafel Bowl', 'chickpea', 'tahini'],
  ['Paneer Wrap', 'paneer', 'mint'],
];

const locations = [
  'Hyderabad',
  'Bangalore',
  'Mumbai',
  'Delhi',
  'Chennai',
  'Pune',
  'Kolkata',
  'Ahmedabad',
];

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

exports.seedLiveData = async (rowsPerLocation = 18) => {
  const rows = [];
  const now = Date.now();

  for (const location of locations) {
    for (let i = 0; i < rowsPerLocation; i += 1) {
      const [food, ingredient1, ingredient2] = foods[Math.floor(Math.random() * foods.length)];
      const day = days[Math.floor(Math.random() * days.length)];
      const ageDays = Math.floor(Math.random() * 14);
      const timestamp = new Date(now - ageDays * 24 * 60 * 60 * 1000).toISOString();

      rows.push({ food, ingredient1, ingredient2, day, location, timestamp });
    }
  }

  const inserted = await foodService.bulkInsertFoodPosts(rows);
  return {
    insertedRows: inserted,
    locationsSeeded: locations.length,
    rowsPerLocation,
  };
};
