// ====== Mobile nav toggle ======
const burger = document.querySelector('.burger');
const nav = document.querySelector('header nav');
if (burger && nav) {
  burger.addEventListener('click', () => nav.classList.toggle('open'));
}

// ====== Language switch (FA | EN) ======
const langSwitch = document.getElementById('langSwitch');
let currentLang = 'fa';

function applyLang(){
  document.documentElement.lang = currentLang === 'fa' ? 'fa' : 'en';
  document.documentElement.dir  = currentLang === 'fa' ? 'rtl' : 'ltr';
  document.querySelectorAll('.lang-text').forEach(el => {
    if (el.dataset && el.dataset[currentLang] != null) el.textContent = el.dataset[currentLang];
  });
}
if (langSwitch) {
  langSwitch.addEventListener('click', () => {
    currentLang = (currentLang === 'fa') ? 'en' : 'fa';
    applyLang();
  });
}
applyLang();

// ====== Reveal cards on scroll ======
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('show'); });
}, { threshold: .12 });
document.querySelectorAll('.card').forEach(c => io.observe(c));

// ====== Button ripple effect ======
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function(e){
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
    ripple.style.top  = (e.clientY - rect.top  - size/2) + 'px';
    this.appendChild(ripple);
    setTimeout(()=> ripple.remove(), 600);
  });
});

// ====== Logo per-letter glow loop ======
const logoEl = document.getElementById('logo'); // <div id="logo" class="logo">Rahasa</div>
if (logoEl){
  const txt = logoEl.textContent.trim();
  logoEl.innerHTML = [...txt].map(ch => `<span class="logo-ch">${ch}</span>`).join('');
  const chars = logoEl.querySelectorAll('.logo-ch');
  let idx = 0;
  setInterval(() => {
    chars.forEach((c,i) => c.classList.toggle('on', i === idx));
    idx = (idx + 1) % chars.length;
  }, 350); // سرعت تغییر حروف
}

// ====== Lead form submit (mailto to your email) ======
const form = document.getElementById('leadForm');
if (form){
  form.addEventListener('submit', e=>{
    e.preventDefault();
    const data = new FormData(form);
    const subject = encodeURIComponent('Rahasa lead - ' + (data.get('service') || ''));
    const body = encodeURIComponent(
      'Name: ' + (data.get('name')||'') + '\n' +
      'Email: ' + (data.get('email')||'') + '\n' +
      'Service: ' + (data.get('service')||'') + '\n' +
      'Message: ' + (data.get('message')||'')
    );
    window.location.href = 'mailto:rahasa.agency@outlook.com?subject=' + subject + '&body=' + body;
  });
}
