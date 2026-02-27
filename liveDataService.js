const db = require('../db');

exports.insertFoodPost = async ({
  food,
  ingredient1,
  ingredient2,
  day,
  location,
  timestamp,
}) => {
  const sql = `
    INSERT INTO food_posts (food, ingredient1, ingredient2, day, location, timestamp)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const values = [
    food,
    ingredient1,
    ingredient2,
    day,
    location,
    timestamp ? new Date(timestamp) : new Date(),
  ];

  const [result] = await db.execute(sql, values);

  return {
    id: result.insertId,
    food,
    ingredient1,
    ingredient2,
    day,
    location,
    timestamp: values[5],
  };
};

exports.bulkInsertFoodPosts = async (rows) => {
  if (!rows.length) return 0;

  const sql = `
    INSERT INTO food_posts (food, ingredient1, ingredient2, day, location, timestamp)
    VALUES ?
  `;

  const values = rows
    .filter((row) => row.food && row.ingredient1 && row.ingredient2 && row.day && row.location)
    .map((row) => [
      row.food,
      row.ingredient1,
      row.ingredient2,
      row.day,
      row.location,
      row.timestamp ? new Date(row.timestamp) : new Date(),
    ]);

  if (!values.length) return 0;

  const [result] = await db.query(sql, [values]);
  return result.affectedRows || 0;
};
