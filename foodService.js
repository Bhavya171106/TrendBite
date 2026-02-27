const db = require('../db');

const buildWhere = (location) => {
  if (!location) {
    return { clause: '', params: [] };
  }
  return { clause: 'WHERE location = ?', params: [location] };
};

exports.getTrendingFoods = async (location) => {
  const { clause, params } = buildWhere(location);
  const sql = `
    SELECT food, COUNT(*) AS count
    FROM food_posts
    ${clause}
    GROUP BY food
    ORDER BY count DESC
    LIMIT 10
  `;
  const [rows] = await db.execute(sql, params);
  return rows;
};

exports.getWeekendDemand = async (location) => {
  const base = buildWhere(location);
  const clause = base.clause
    ? `${base.clause} AND day IN ('Saturday', 'Sunday')`
    : "WHERE day IN ('Saturday', 'Sunday')";

  const sql = `
    SELECT day, COUNT(*) AS demandCount
    FROM food_posts
    ${clause}
    GROUP BY day
    ORDER BY demandCount DESC
  `;
  const [rows] = await db.execute(sql, base.params);

  const totalWeekendPosts = rows.reduce((sum, row) => sum + Number(row.demandCount), 0);

  return {
    breakdown: rows,
    totalWeekendPosts,
    weekendMultiplier: totalWeekendPosts > 0 ? 1.35 : 1,
  };
};

exports.getLocationBasedTrends = async (location) => {
  const { clause, params } = buildWhere(location);
  const sql = `
    SELECT location, food, COUNT(*) AS count
    FROM food_posts
    ${clause}
    GROUP BY location, food
    ORDER BY location, count DESC
  `;
  const [rows] = await db.execute(sql, params);
  return rows;
};

exports.getAvailableLocations = async () => {
  const sql = `
    SELECT
      location,
      COUNT(*) AS totalPosts,
      SUM(CASE WHEN timestamp >= DATE_SUB(NOW(), INTERVAL 7 DAY) THEN 1 ELSE 0 END) AS last7DaysPosts
    FROM food_posts
    GROUP BY location
    ORDER BY last7DaysPosts DESC, totalPosts DESC, location ASC
  `;
  const [rows] = await db.execute(sql);
  return rows;
};

exports.getGrowthPercentage = async (location) => {
  const where = location ? 'WHERE location = ?' : '';
  const params = location ? [location, location] : [];

  const sql = `
    SELECT
      (SELECT COUNT(*) FROM food_posts ${where} AND timestamp >= DATE_SUB(NOW(), INTERVAL 7 DAY)) AS last7Days,
      (SELECT COUNT(*) FROM food_posts ${where} AND timestamp >= DATE_SUB(NOW(), INTERVAL 14 DAY)
        AND timestamp < DATE_SUB(NOW(), INTERVAL 7 DAY)) AS previous7Days
  `;

  const fixedSql = location
    ? sql
    : `
      SELECT
        (SELECT COUNT(*) FROM food_posts WHERE timestamp >= DATE_SUB(NOW(), INTERVAL 7 DAY)) AS last7Days,
        (SELECT COUNT(*) FROM food_posts WHERE timestamp >= DATE_SUB(NOW(), INTERVAL 14 DAY)
          AND timestamp < DATE_SUB(NOW(), INTERVAL 7 DAY)) AS previous7Days
    `;

  const [rows] = await db.execute(fixedSql, params);
  const { last7Days, previous7Days } = rows[0] || { last7Days: 0, previous7Days: 0 };

  if (!previous7Days && last7Days) return 100;
  if (!previous7Days && !last7Days) return 0;

  const growth = ((last7Days - previous7Days) / previous7Days) * 100;
  return Number(growth.toFixed(2));
};

exports.predictRevenueBoost = ({ trendingFoods, weekendDemand }) => {
  const topFoodCount = trendingFoods.length ? Number(trendingFoods[0].count) : 0;
  const trendScore = topFoodCount * 10;
  const weekendMultiplier = weekendDemand.weekendMultiplier || 1;
  const priceEstimate = 12;

  const projectedValue = trendScore * weekendMultiplier * priceEstimate;
  const projectedRevenueIncreasePercent = Math.min(250, Number((projectedValue / 100).toFixed(2)));

  return {
    trendScore,
    weekendMultiplier,
    priceEstimate,
    projectedRevenueIncreasePercent,
  };
};
