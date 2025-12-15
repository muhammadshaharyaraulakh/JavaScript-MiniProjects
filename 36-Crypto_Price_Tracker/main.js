const API = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&sparkline=false&price_change_percentage=24h";
async function loadCoins() {
    const res = await fetch(API);
    const coins = await res.json();
    const grid = document.getElementById("cryptoGrid");
    grid.innerHTML = "";
    coins.forEach(coin => {
        const change = coin.price_change_percentage_24h;
        const trend = change >= 0 ? "up" : "down";
        const percentClass = change >= 0 ? "positive" : "negative";
        const card = document.createElement("div");
        card.className = `card ${trend}`;
        card.innerHTML = `
    <div class="card-header">
        <img class="coin-image" src="${coin.image}">
            <div class="coin-name">
                <h3>${coin.name}</h3>
                <span>${coin.symbol.toUpperCase()}</span>
            </div>
    </div>
    <div class="card-footer">
        <div>
            <span class="label">Price</span>
            <div class="price">$${coin.current_price.toLocaleString()}</div>
        </div>
        <div>
            <span class="percent ${percentClass}">
                ${change >= 0 ? "+" : ""}${change.toFixed(6)}%
            </span>
        </div>
    </div>
    `;
        grid.appendChild(card);
    });
}
loadCoins();
setInterval(loadCoins, 60000);