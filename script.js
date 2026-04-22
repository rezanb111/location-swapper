// ---------- ساعت تسک‌بار ----------
function updateClock() {
    const clock = document.getElementById('clock');
    const now = new Date();
    const h = now.getHours().toString().padStart(2, '0');
    const m = now.getMinutes().toString().padStart(2, '0');
    clock.textContent = `${h}:${m}`;
}
setInterval(updateClock, 1000);
updateClock();

// ---------- لیست لوکیشن‌ها (واقعی + تکمیل تا ۲۰۰) ----------
const baseLocations = [
    "Germany - Frankfurt",
    "Germany - Berlin",
    "Germany - Munich",
    "Germany - Hamburg",
    "Netherlands - Amsterdam",
    "France - Paris",
    "France - Marseille",
    "France - Lyon",
    "United Kingdom - London",
    "United Kingdom - Manchester",
    "United Kingdom - Glasgow",
    "United Kingdom - Birmingham",
    "Switzerland - Zurich",
    "Switzerland - Geneva",
    "Austria - Vienna",
    "Italy - Milan",
    "Italy - Rome",
    "Italy - Naples",
    "Spain - Madrid",
    "Spain - Barcelona",
    "Spain - Valencia",
    "Portugal - Lisbon",
    "Portugal - Porto",
    "Belgium - Brussels",
    "Sweden - Stockholm",
    "Norway - Oslo",
    "Denmark - Copenhagen",
    "Finland - Helsinki",
    "Poland - Warsaw",
    "Czech Republic - Prague",
    "Hungary - Budapest",
    "Russia - Moscow",
    "Russia - St. Petersburg",
    "Turkey - Istanbul",
    "Turkey - Ankara",
    "Greece - Athens",
    "Romania - Bucharest",
    "Bulgaria - Sofia",
    "Serbia - Belgrade",
    "Croatia - Zagreb",
    "USA - New York",
    "USA - Los Angeles",
    "USA - San Francisco",
    "USA - Chicago",
    "USA - Miami",
    "USA - Dallas",
    "USA - Seattle",
    "USA - Atlanta",
    "USA - Washington DC",
    "Canada - Toronto",
    "Canada - Montreal",
    "Canada - Vancouver",
    "Canada - Calgary",
    "Mexico - Mexico City",
    "Brazil - São Paulo",
    "Brazil - Rio de Janeiro",
    "Argentina - Buenos Aires",
    "Chile - Santiago",
    "Colombia - Bogotá",
    "Peru - Lima",
    "UAE - Dubai",
    "UAE - Abu Dhabi",
    "Qatar - Doha",
    "Saudi Arabia - Riyadh",
    "Saudi Arabia - Jeddah",
    "Israel - Tel Aviv",
    "South Africa - Johannesburg",
    "South Africa - Cape Town",
    "India - Mumbai",
    "India - Delhi",
    "India - Bangalore",
    "India - Chennai",
    "Pakistan - Karachi",
    "Pakistan - Lahore",
    "Iran - Tehran",
    "Iran - Mashhad",
    "Iran - Isfahan",
    "Iran - Shiraz",
    "China - Beijing",
    "China - Shanghai",
    "China - Guangzhou",
    "Hong Kong - Central",
    "Japan - Tokyo",
    "Japan - Osaka",
    "Japan - Nagoya",
    "South Korea - Seoul",
    "South Korea - Busan",
    "Singapore - Singapore",
    "Malaysia - Kuala Lumpur",
    "Thailand - Bangkok",
    "Vietnam - Hanoi",
    "Vietnam - Ho Chi Minh City",
    "Indonesia - Jakarta",
    "Philippines - Manila",
    "Australia - Sydney",
    "Australia - Melbourne",
    "Australia - Brisbane",
    "New Zealand - Auckland"
];

// تکمیل تا ۲۰۰ لوکیشن با نودهای بهینه‌سازی‌شده
const locations = [];
baseLocations.forEach(loc => locations.push(loc));

let idx = 1;
while (locations.length < 200) {
    const base = baseLocations[(idx - 1) % baseLocations.length];
    locations.push(`${base} - Optimized Node ${idx}`);
    idx++;
}

const locationSelect = document.getElementById('locationSelect');
const vpnStatus = document.getElementById('vpnStatus');
const connectBtn = document.getElementById('connectBtn');
const vpnSpinner = document.getElementById('vpnSpinner');

let vpnConnected = false;

// پر کردن دراپ‌داون لوکیشن‌ها
locations.forEach(loc => {
    const option = document.createElement('option');
    option.value = loc;
    option.textContent = loc;
    locationSelect.appendChild(option);
});

// ---------- وی‌پی‌ان ----------
function openVpn() {
    const win = document.getElementById('vpnWindow');
    win.style.display = 'block';
    bringToFront(win);
}

function closeVpn() {
    const win = document.getElementById('vpnWindow');
    win.style.display = 'none';
    vpnConnected = false;
    vpnStatus.textContent = 'Disconnected';
    connectBtn.textContent = 'Connect';
    connectBtn.disabled = false;
    vpnSpinner.style.display = 'none';
}

function toggleVpn() {
    if (!vpnConnected) {
        vpnStatus.textContent = 'Connecting...';
        connectBtn.disabled = true;
        connectBtn.textContent = 'Connecting...';
        vpnSpinner.style.display = 'inline-block';

        setTimeout(() => {
            vpnConnected = true;
            const selected = locationSelect.value;
            vpnStatus.textContent = `Connected (${selected})`;
            connectBtn.disabled = false;
            connectBtn.textContent = 'Disconnect';
            vpnSpinner.style.display = 'none';
        }, 1800);
    } else {
        vpnConnected = false;
        vpnStatus.textContent = 'Disconnected';
        connectBtn.textContent = 'Connect';
        vpnSpinner.style.display = 'none';
    }
}

// ---------- مرورگر ----------
function openBrowser(type) {
    const browserWindow = document.getElementById('browserWindow');
    const browserTitle = document.getElementById('browserTitle');

    browserTitle.textContent = type.toUpperCase();
    browserWindow.style.display = 'block';
    bringToFront(browserWindow);
}

function closeBrowser() {
    const browserWindow = document.getElementById('browserWindow');
    browserWindow.style.display = 'none';
}

function loadPage() {
    const urlInput = document.getElementById('urlInput');
    const frame = document.getElementById('browserFrame');
    let url = urlInput.value.trim();

    if (!url) return;

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
    }

    frame.src = url;
}

// ---------- درگ کردن پنجره‌ها ----------
let dragData = {
    isDragging: false,
    offsetX: 0,
    offsetY: 0,
    targetId: null
};

function startDrag(e, windowId) {
    const win = document.getElementById(windowId);
    dragData.isDragging = true;
    dragData.targetId = windowId;

    const rect = win.getBoundingClientRect();
    dragData.offsetX = e.clientX - rect.left;
    dragData.offsetY = e.clientY - rect.top;

    bringToFront(win);
}

document.addEventListener('mousemove', (e) => {
    if (!dragData.isDragging || !dragData.targetId) return;
    const win = document.getElementById(dragData.targetId);

    let newLeft = e.clientX - dragData.offsetX;
    let newTop = e.clientY - dragData.offsetY;

    const desktopRect = document.getElementById('desktop').getBoundingClientRect();

    // محدود کردن داخل دسکتاپ
    const maxLeft = desktopRect.width - win.offsetWidth;
    const maxTop = desktopRect.height - win.offsetHeight - 40; // بالای تسک‌بار

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

// ---------- فوکوس و مینیمایز ----------
let topZ = 10;

function bringToFront(win) {
    topZ += 1;
    win.style.zIndex = topZ;

    document.querySelectorAll('.window').forEach(w => w.classList.remove('active'));
    win.classList.add('active');
}

function minimizeWindow(id) {
    const win = document.getElementById(id);
    win.style.display = 'none';
}
