<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Hyper-Local Food Trend Agent</title>
  <link rel="stylesheet" href="styles.css" />
</head>
<body class="dashboard-page">
  <div class="bg-orb orb-1"></div>
  <div class="bg-orb orb-2"></div>
  <div class="bg-orb orb-3"></div>
  <main class="container">
    <header class="dash-hero">
      <div class="dash-copy">
        <h1>Hyper-Local Food Trend Agent</h1>
        <p>Live intelligence to optimize weekend menus and maximize revenue.</p>
        <div class="auth-bar">
          <span id="userLabel">Not logged in</span>
          <button id="logoutBtn" type="button">Logout</button>
        </div>
        <div class="filter-row">
          <label for="apiKeyInput">API Key</label>
          <input id="apiKeyInput" type="password" placeholder="Enter x-api-key" />
          <button id="saveApiKeyBtn">Save Key</button>
          <label for="locationSelect">Location</label>
          <select id="locationSelect">
            <option value="">All Locations</option>
          </select>
          <button id="applyFilterBtn">Apply</button>
        </div>
      </div>
      <div class="dash-art">
        <img src="/assets/trendbite-dashboard.png" alt="TrendBite dashboard visual" />
      </div>
    </header>

    <section class="grid">
      <article class="card card-trend">
        <h2>Top Trending Foods</h2>
        <ul id="trendingFoods"></ul>
      </article>

      <article class="card card-demand">
        <h2>Weekend Demand</h2>
        <div id="weekendDemand"></div>
      </article>

      <article class="card card-revenue">
        <h2>Predicted Revenue Boost</h2>
        <div id="revenueBoost"></div>
      </article>

      <article class="card card-ai">
        <h2>AI Suggested Dishes</h2>
        <ul id="aiSuggestions"></ul>
      </article>
    </section>

    <footer>
      <small id="lastUpdated">Last updated: -</small>
    </footer>
  </main>

  <script src="app.js"></script>
</body>
</html>
