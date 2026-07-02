/* ════════════ VATOS main.js ════════════ */

/* 같은 페이지 내 앵커(#id) 스무스 스크롤 — 멀티페이지 .html 링크엔 영향 없음 */
document.querySelectorAll('a[href^="#"]').forEach(function (a) {
  a.addEventListener('click', function (e) {
    var href = a.getAttribute('href');
    if (href === '#' || href.length < 2) return;
    var target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      var offset = 68; // header height
      var top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
      closeMobileNav();
    }
  });
});

/* 헤더 스크롤 시 배경 농도·그림자 조정 (라이트 테마) */
window.addEventListener('scroll', function () {
  var h = document.querySelector('header');
  if (!h) return;
  if (window.scrollY > 40) {
    h.style.background = 'rgba(255,255,255,0.98)';
    h.style.boxShadow = '0 4px 20px rgba(11,27,61,0.06)';
  } else {
    h.style.background = 'rgba(255,255,255,0.92)';
    h.style.boxShadow = 'none';
  }
});

/* 햄버거 / 모바일 내비게이션 */
var hamburgerBtn = document.getElementById('hamburgerBtn');
var mobileNav = document.getElementById('mobileNav');

function closeMobileNav() {
  if (!mobileNav || !hamburgerBtn) return;
  mobileNav.classList.remove('open');
  hamburgerBtn.classList.remove('active');
}

if (hamburgerBtn && mobileNav) {
  hamburgerBtn.addEventListener('click', function () {
    var isOpen = mobileNav.classList.toggle('open');
    hamburgerBtn.classList.toggle('active', isOpen);
  });
  document.addEventListener('click', function (e) {
    if (!hamburgerBtn.contains(e.target) && !mobileNav.contains(e.target)) {
      closeMobileNav();
    }
  });
}

/* ── 주소 복사 (careers / contact 찾아오시는 길) ── */
(function () {
  var buttons = document.querySelectorAll('.loc-copy-btn');
  if (!buttons.length) return;
  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var row = btn.closest('.loc-addr-row');
      if (!row) return;
      var addrEl = row.querySelector('.js-copy-addr');
      var toast = row.querySelector('.loc-copy-toast');
      var text = addrEl ? (addrEl.textContent || '').trim() : '';
      function showToast() {
        if (!toast) return;
        toast.classList.add('show');
        setTimeout(function () { toast.classList.remove('show'); }, 1800);
      }
      function fallbackCopy() {
        var ta = document.createElement('textarea');
        ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.focus(); ta.select();
        try { document.execCommand('copy'); showToast(); } catch (e) {}
        document.body.removeChild(ta);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(showToast).catch(fallbackCopy);
      } else {
        fallbackCopy();
      }
    });
  });
})();
