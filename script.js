// ساعت تسک‌بار
function updateClock() {
    const el = document.getElementById('clock');
    const now = new Date();
    const h = now.getHours().toString().padStart(2, '0');
    const m = now.getMinutes().toString().padStart(2, '0');
    el.textContent = `${h}:${m}`;
}
setInterval(updateClock, 1000);
updateClock();

// لوکیشن‌ها با پرچم
const baseLocations = [
    "🇩🇪 Germany - Frankfurt",
    "🇩🇪 Germany - Berlin",
    "🇳🇱 Netherlands - Amsterdam",
    "🇫🇷 France - Paris",
    "🇬🇧 UK - London",
    "🇬🇧 UK - Manchester",
    "🇨🇭 Switzerland - Zurich",
    "🇦🇹 Austria - Vienna",
    "🇮🇹 Italy - Milan",
    "🇪🇸 Spain - Madrid",
    "🇵🇹 Portugal - Lisbon",
    "🇧🇪 Belgium - Brussels",
    "🇸🇪 Sweden - Stockholm",
    "🇳🇴 Norway - Oslo",
    "🇩🇰 Denmark - Copenhagen",
    "🇫🇮 Finland - Helsinki",
    "🇵🇱 Poland - Warsaw",
    "🇨🇿 Czech - Prague",
    "🇭🇺 Hungary - Budapest",
    "🇷🇺 Russia - Moscow",
    "🇹🇷 Turkey - Istanbul",
    "🇬🇷 Greece - Athens",
    "🇷🇴 Romania - Bucharest",
    "🇷🇸 Serbia - Belgrade",
    "🇺🇸 USA - New York",
    "🇺🇸 USA - Los Angeles",
    "🇺🇸 USA - Chicago",
    "🇺🇸 USA - Miami",
    "🇺🇸 USA - Seattle",
    "🇨🇦 Canada - Toronto",
    "🇨🇦 Canada - Vancouver",
    "🇲🇽 Mexico - Mexico City",
    "🇧🇷 Brazil - São Paulo",
    "🇦🇷 Argentina - Buenos Aires",
    "🇨🇱 Chile - Santiago",
    "🇨🇴 Colombia - Bogotá",
    "🇵🇪 Peru - Lima",
    "🇦🇪 UAE - Dubai",
    "🇶🇦 Qatar - Doha",
    "🇸🇦 Saudi - Riyadh",
    "🇮🇱 Israel - Tel Aviv",
    "🇿🇦 South Africa - Johannesburg",
    "🇮🇳 India - Mumbai",
    "🇮🇳 India - Delhi",
    "🇵🇰 Pakistan - Karachi",
    "🇮🇷 Iran - Tehran",
    "🇮🇷 Iran - Mashhad",
    "🇨🇳 China - Beijing",
    "🇭🇰 Hong Kong - Central",
    "🇯🇵 Japan - Tokyo",
    "🇰🇷 Korea - Seoul",
    "🇸🇬 Singapore - Singapore",
    "🇲🇾 Malaysia - Kuala Lumpur",
    "🇹🇭 Thailand - Bangkok",
    "🇻🇳 Vietnam - Hanoi",
    "🇮🇩 Indonesia - Jakarta",
    "🇦🇺 Australia - Sydney",
    "🇳🇿 New Zealand - Auckland"
];

const locations = [];
baseLocations.forEach(l => locations.push(l));
let idx = 1;
while (locations.length < 200) {
    const base = baseLocations[(idx - 1) % baseLocations.length];
    locations.push(`${base} • Node ${idx}`);
    idx++;
}

const locationSelect = document.getElementById('locationSelect');
locations.forEach(loc => {
    const opt = document.createElement('option');
    opt.value = loc;
    opt.textContent = loc;
    locationSelect.appendChild(opt);
});

// VPN state
let vpnConnected = false;
const vpnStatus = document.getElementById('vpnStatus');
const connectBtn = document.getElementById('connectBtn');
const vpnWave = document.getElementById('vpnWave');
const pingValue = document.getElementById('pingValue');
const downValue = document.getElementById('downValue');
const upValue = document.getElementById('upValue');
const speedBar = document.getElementById('speedBar');

function toggleVpn() {
    if (!vpnConnected) {
        vpnStatus.textContent = 'Connecting...';
        connectBtn.disabled = true;
        connectBtn.textContent = 'Connecting...';
        vpnWave.classList.add('active');

        setTimeout(() => {
            vpnConnected = true;
            const selected = locationSelect.value;
            vpnStatus.textContent = `Connected (${selected})`;
            connectBtn.disabled = false;
            connectBtn.textContent = 'Disconnect';
        }, 1600);
    } else {
        vpnConnected = false;
        vpnStatus.textContent = 'Disconnected';
        connectBtn.textContent = 'Connect';
        vpnWave.classList.remove('active');
    }
}

function runSpeedTest() {
    if (!vpnConnected) {
        vpnStatus.textContent = 'Connect VPN first';
        return;
    }
    const ping = Math.floor(20 + Math.random() * 60);
    const down = (50 + Math.random() * 250).toFixed(1);
    const up = (10 + Math.random() * 80).toFixed(1);

    pingValue.textContent = `${ping} ms`;
    downValue.textContent = `${down} Mbps`;
    upValue.textContent = `${up} Mbps`;

    const percent = Math.min(100, (down / 300) * 100);
    speedBar.style.width = percent + '%';
}

// Proxy
function runProxyPing() {
    const val = Math.floor(30 + Math.random() * 120);
    document.getElementById('proxyPing').textContent = `${val} ms`;
}

// Browser
const frame = document.getElementById('browserFrame');
const urlInput = document.getElementById('urlInput');

function loadPage() {
    let url = urlInput.value.trim();
    if (!url) return;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
    }
    frame.src = url;
}
function browserBack() {
    frame.contentWindow.history.back();
}
function browserForward() {
    frame.contentWindow.history.forward();
}
function browserRefresh() {
    frame.contentWindow.location.reload();
}

// مدیریت پنجره‌ها
let topZ = 20;
function openWindow(id) {
    const win = document.getElementById(id);
    win.style.display = 'block';
    bringToFront(win);
}
function closeWindow(id) {
    const win = document.getElementById(id);
    win.style.display = 'none';
}
function minimizeWindow(id) {
    const win = document.getElementById(id);
    win.style.display = 'none';
}
function bringToFront(win) {
    topZ += 1;
    win.style.zIndex = topZ;
    document.querySelectorAll('.window').forEach(w => w.classList.remove('active'));
    win.classList.add('active');
}

// درگ پنجره‌ها
let dragData = {
    isDragging: false,
    offsetX: 0,
    offsetY: 0,
    targetId: null
};

function startDrag(e, id) {
    const win = document.getElementById(id);
    dragData.isDragging = true;
    dragData.targetId = id;
    const rect = win.getBoundingClientRect();
    dragData.offsetX = e.clientX - rect.left;
    dragData.offsetY = e.clientY - rect.top;
    bringToFront(win);
}

document.addEventListener('mousemove', (e) => {
    if (!dragData.isDragging || !dragData.targetId) return;
    const win = document.getElementById(dragData.targetId);
    const desktopRect = document.getElementById('desktop').getBoundingClientRect();

    let newLeft = e.clientX - dragData.offsetX;
    let newTop = e.clientY - dragData.offsetY;

    const maxLeft = desktopRect.width - win.offsetWidth;
    const maxTop = desktopRect.height - win.offsetHeight - 46;

    if (newLeft < 0) newLeft = 0;
    if (newTop < 0) newTop = 0;
    if (newLeft > maxLeft) newLeft = maxLeft;
    if (newTop > maxTop) newTop = maxTop;

    win.style.left = newLeft + 'px';
    win.style.top = newTop + 'px';
});

document.addEventListener('mouseup', () => {
    dragData.isDragging = false;
    dragData.targetId = null;
});
