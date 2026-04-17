// ═══════════════════════════════════════════════
// Переключатель тем
// ═══════════════════════════════════════════════
const savedTheme = localStorage.getItem('theme') || 'gold';
applyTheme(savedTheme);

document.querySelectorAll('.theme-dot').forEach(btn => {
  btn.addEventListener('click', () => applyTheme(btn.dataset.t));
});

function applyTheme(t) {
  document.documentElement.dataset.theme = t;
  localStorage.setItem('theme', t);
  document.querySelectorAll('.theme-dot').forEach(b => {
    b.classList.toggle('active', b.dataset.t === t);
  });
}

// ═══════════════════════════════════════════════
// Scroll reveal
// ═══════════════════════════════════════════════
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.section').forEach(s => observer.observe(s));

// ═══════════════════════════════════════════════
// Gallery lightbox
// ═══════════════════════════════════════════════
function openLightbox(el) {
  const src = el.querySelector('img').src;
  document.getElementById('lightboxImg').src = src;
  document.getElementById('lightbox').classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

// ═══════════════════════════════════════════════
// Candle
// ═══════════════════════════════════════════════
let candleLit = false;
let candleCount = parseInt(localStorage.getItem('candleCount') || '0');
document.getElementById('candleCount').textContent = candleCount;

function toggleCandle() {
  candleLit = !candleLit;
  const candle = document.getElementById('candleEl');
  const btn = document.getElementById('candleBtn');
  if (candleLit) {
    candle.classList.add('lit');
    btn.textContent = 'Свеча горит';
    btn.classList.add('active');
    candleCount++;
    localStorage.setItem('candleCount', candleCount);
    document.getElementById('candleCount').textContent = candleCount;
  } else {
    candle.classList.remove('lit');
    btn.textContent = 'Зажечь свечу';
    btn.classList.remove('active');
  }
}

// ═══════════════════════════════════════════════
// QR Code
// ═══════════════════════════════════════════════
window.addEventListener('load', () => {
  const url = window.location.href;
  document.getElementById('qrUrl').textContent = url;

  new QRCode(document.getElementById('qrCode'), {
    text: url,
    width: 200,
    height: 200,
    colorDark: '#111111',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H
  });
});

function downloadQR() {
  const canvas = document.querySelector('#qrCode canvas');
  if (!canvas) { alert('QR-код ещё генерируется, подождите секунду'); return; }
  const link = document.createElement('a');
  link.download = 'qr-pamyat.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
}

function copyLink(btn) {
  navigator.clipboard.writeText(window.location.href).then(() => {
    const orig = btn.textContent;
    btn.textContent = 'Скопировано!';
    setTimeout(() => btn.textContent = orig, 2000);
  });
}

// ═══════════════════════════════════════════════
// Tribute form — заглушка (подключи n8n/Google Forms)
// ═══════════════════════════════════════════════
document.getElementById('tributeForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('.tribute-form__btn');
  btn.textContent = 'Отправлено! Спасибо.';
  btn.disabled = true;
  this.reset();
  // TODO: заменить на реальный webhook n8n
  // fetch('https://ВАШ_N8N_WEBHOOK', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(Object.fromEntries(new FormData(this)))
  // });
});
