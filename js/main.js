// ---------- إظهار الباسوورد بالضغط، وإخفاؤه بالإفلات (للحقلين) ----------
document.querySelectorAll('.eye').forEach((eyeBtn) => {
  const input = document.getElementById(eyeBtn.dataset.target);

  function show() {
    input.type = 'text';
    eyeBtn.classList.add('active');
  }
  function hide() {
    input.type = 'password';
    eyeBtn.classList.remove('active');
  }

  eyeBtn.addEventListener('pointerdown', (e) => { e.preventDefault(); show(); });
  ['pointerup', 'pointerleave', 'pointercancel'].forEach((ev) =>
    eyeBtn.addEventListener(ev, hide)
  );
});

// ---------- لون تاريخ الميلاد لما يكون فاضي ----------
const birthInput = document.getElementById('birthDate');

function updateDateColor() {
  birthInput.classList.toggle('empty', !birthInput.value);
}
birthInput.addEventListener('change', updateDateColor);
updateDateColor();

// ---------- الفورم ----------
document.getElementById('registerForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const fullName = document.getElementById('fullName').value.trim();
  const email = document.getElementById('email').value.trim();
  const gender = document.getElementById('gender').value;
  const birthDate = birthInput.value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (!fullName || !email || !gender || !birthDate || !password || !confirmPassword) {
    alert('الرجاء تعبئة جميع الحقول');
    return;
  }

  // الاسم لازم يكون 4 كلمات
  if (fullName.split(/\s+/).length < 4) {
    alert('الرجاء إدخال الاسم رباعي');
    return;
  }

  // شكل الإيميل
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert('الرجاء إدخال بريد الكتروني صحيح');
    return;
  }

  if (password.length < 8) {
    alert('كلمة المرور لازم تكون 8 أحرف على الأقل');
    return;
  }

  if (password !== confirmPassword) {
    alert('كلمة المرور وتأكيدها غير متطابقين');
    return;
  }

  console.log('Register:', { fullName, email, gender, birthDate });
  alert('تم إنشاء الحساب بنجاح 🎉');
});

// ---------- Auto-sliding Carousel (نفس اللوجن) ----------
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const INTERVAL = 4000;
let current = 0;
let timer;

function goTo(index) {
  slides[current].classList.remove('active');
  dots[current].classList.remove('active');
  current = (index + slides.length) % slides.length;
  slides[current].classList.add('active');
  dots[current].classList.add('active');
}

function startAuto() {
  clearInterval(timer);
  timer = setInterval(() => goTo(current + 1), INTERVAL);
}

if (slides.length) {
  dots.forEach((dot, i) =>
    dot.addEventListener('click', () => {
      goTo(i);
      startAuto();
    })
  );
  startAuto();
}