const adjectivePool = ['Spicy', 'Smoky', 'Crispy', 'Tangy', 'Herbed', 'Zesty'];

// Mock AI recommendation engine based on top trending ingredient pairs.
exports.generateWeekendSpecials = ({ trendingFoods, location }) => {
  const specials = [];

  for (let i = 0; i < 3; i += 1) {
    const trend = trendingFoods[i] || trendingFoods[0];
    if (!trend) {
      specials.push({
        recommendedDish: 'Chef Surprise Platter',
        reason: 'No trend data yet, so a flexible crowd-pleaser is recommended.',
      });
      continue;
    }

    const adjective = adjectivePool[i % adjectivePool.length];
    const baseFood = trend.food;

    specials.push({
      recommendedDish: `${adjective} ${baseFood} Special`,
      reason: `${baseFood} is trending${location ? ` in ${location}` : ' locally'}, improving weekend conversion odds.`,
    });
  }

  return specials;
};
