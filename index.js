// Satium - index.js (Fixed YouTube + proper UV proxy)

function handleNav(event, target) {
    document.querySelectorAll('#navbar li').forEach(li => li.classList.remove('active'));
    
    if (target === 'home') {
        event.currentTarget.classList.add('active');
    } 
    else if (target === 'games.html') {
        window.location.href = 'games.html';
    } 
    else if (target === 'youtube') {
        proxyGo('https://www.youtube.com');
        document.querySelector('li[data-target="home"]').classList.add('active');
    } 
    else if (target === 'tabconfig') {
        if (typeof settings === 'function') settings();
        document.querySelector('li[data-target="home"]').classList.add('active');
    } 
    else if (target === 'updates') {
        if (typeof updates === 'function') updates();
        document.querySelector('li[data-target="home"]').classList.add('active');
    }
}

// Particles
const pJS = (tag_id) => {
    const canvas = document.createElement('canvas');
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    document.getElementById(tag_id).appendChild(canvas);
    const ctx = canvas.getContext('2d');
    let w, h, particles = [];

    const init = () => {
        w = canvas.width = canvas.offsetWidth;
        h = canvas.height = canvas.offsetHeight;
        particles = [];
        for (let i = 0; i < 60; i++) {
            const shade = Math.floor(Math.random() * 60) + 40;
            particles.push({
                x: Math.random() * w, y: Math.random() * h,
                vx: Math.random() * 0.6 + 0.3,
                vy: Math.random() * 0.6 + 0.3,
                radius: Math.random() * 1.8 + 0.8,
                color: `rgb(${shade},${shade},${shade})`
            });
        }
    };

    const draw = () => {
        ctx.clearRect(0, 0, w, h);
        particles.forEach(p => {
            p.x += p.vx; p.y += p.vy;
            if (p.x > w) p.x = 0;
            if (p.y > h) p.y = 0;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();
        });
        requestAnimationFrame(draw);
    };

    window.addEventListener('resize', init);
    init(); draw();
};

// Main Proxy Function (Uses your uv/ folder)
function proxyGo(url) {
    if (typeof __uv$config !== "undefined" && __uv$config.prefix) {
        const encoded = __uv$config.encodeUrl(url);
        location.href = __uv$config.prefix + encoded;
    } else {
        console.warn("UV not loaded properly - opening directly");
        window.open(url, '_blank');
    }
}

function closeNotice() {
    document.getElementById('noticeBox').classList.add('hidden');
}

window.onload = () => {
    pJS('particles-js');

    const splashes = ["monochrome", "clean & fast", "satium", "encrypted", "minimal", "ultraviolet"];
    document.getElementById('splash').textContent = splashes[Math.floor(Math.random() * splashes.length)];

    // Search bar
    document.getElementById("homesearch").addEventListener("keydown", e => {
        if (e.key === "Enter") {
            let q = e.target.value.trim();
            if (q) {
                if (q.includes('.')) proxyGo(q);
                else proxyGo(`https://www.google.com/search?q=${encodeURIComponent(q)}`);
            }
        }
    });

    // Sidebar animation
    ['section1nav', 'section2nav', 'section3nav'].forEach((id, i) => {
        setTimeout(() => {
            const el = document.getElementById(id);
            if (el) el.style.left = "0";
        }, 100 + (i * 100));
    });

    // Show notice
    setTimeout(() => {
        const notice = document.getElementById('noticeBox');
        if (notice) notice.classList.remove('hidden');
    }, 900);
};
