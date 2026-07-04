const API_URL = "https://megalodon-backend-u1w2.onrender.com";

const logsBox = document.getElementById("logs");
const searchInput = document.getElementById("search");

let allLogs = [];

async function loadStats() {
  const res = await fetch(`${API_URL}/stats`);
  const stats = await res.json();

  document.getElementById("total").textContent = stats.total || 0;
  document.getElementById("peaklights").textContent = stats.peaklights || 0;
  document.getElementById("highlights").textContent = stats.highlights || 0;
  document.getElementById("midlights").textContent = stats.midlights || 0;
  document.getElementById("lowlights").textContent = stats.lowlights || 0;
  document.getElementById("steals").textContent = stats.steals || 0;
}

async function loadLogs() {
  const res = await fetch(`${API_URL}/recent`);
  const data = await res.json();

  allLogs = data.findings || [];
  renderLogs();
}

function renderLogs() {
  const q = searchInput.value.toLowerCase();

  const filtered = allLogs.filter(log =>
    String(log.name || "").toLowerCase().includes(q)
  );

  logsBox.innerHTML = filtered.map(log => `
    <div class="log">
      <strong>${log.name}</strong><br>
      <span>${log.value} / ${log.tier}</span><br>
      <small>JobId: ${log.jobId || "aucun"}</small>
    </div>
  `).join("");
}

searchInput.addEventListener("input", renderLogs);

async function refresh() {
  await loadStats();
  await loadLogs();
}

refresh();
setInterval(refresh, 5000);
