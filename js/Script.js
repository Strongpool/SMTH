document.addEventListener('DOMContentLoaded', () => {

  document.querySelector('.logo-btn').addEventListener('click', () => {
    window.location.reload();   // ← перезагружает текущую страницу
  });

    const gallery = document.querySelector('.gallery');

  let targetScroll = 0;
  let isScrolling = false;

  if (gallery) {
    targetScroll = gallery.scrollLeft;

    gallery.addEventListener('wheel', (e) => {
      e.preventDefault();

      const maxScroll = gallery.scrollWidth - gallery.clientWidth;
      targetScroll += e.deltaY * 0.8;
      targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));

      if (!isScrolling) {
        smoothScroll();
      }
    }, { passive: false });
  }

  function smoothScroll() {
    isScrolling = true;

    const maxScroll = gallery.scrollWidth - gallery.clientWidth;
    targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));

    const diff = targetScroll - gallery.scrollLeft;
    gallery.scrollLeft += diff * 0.15;

    if (Math.abs(diff) > 0.5) {
      requestAnimationFrame(smoothScroll);
    } else {
      isScrolling = false;
    }
  }

  const btn = document.querySelector('.devlog-btn');
  const content = document.querySelector('.devlog-content');

  if (btn && content) {
    btn.addEventListener('click', () => {
      content.classList.toggle('open');

      if (content.classList.contains('open')) {
        btn.textContent = '📕 Свернуть девлог';
      } else {
        btn.textContent = '📓 Развернуть девлог';
      }
    });
  }

  // Боковое меню
  const menuBtn = document.querySelector('.menu-btn');
  const sidebar = document.getElementById('sidebar');
  const overlayBurger = document.getElementById('overlay');
  const closeBtn = document.querySelector('.close-btn');

  if (menuBtn && sidebar && overlayBurger) {
    menuBtn.addEventListener('click', () => {
      sidebar.classList.add('open');
      overlayBurger.classList.add('active');
    });

    closeBtn.addEventListener('click', () => {
      sidebar.classList.remove('open');
      overlayBurger.classList.remove('active');
    });

    overlayBurger.addEventListener('click', () => {
      sidebar.classList.remove('open');
      overlayBurger.classList.remove('active');
    });
  }

  // === АВТОРИЗАЦИЯ (МОДАЛКА) ===
  const authModal = document.querySelector('.auth-modal');
  const authBtn = document.querySelectorAll('.auth-btn');
  const authCloseBtn = document.querySelector('.auth-close');
  const tabBtns = document.querySelectorAll('.tab-btn');
  const forms = document.querySelectorAll('.auth-form');

  // Открытие модалки
  authBtn.forEach(btn =>{
    if (authBtn && authModal) {
    btn.addEventListener('click', () => {
      authModal.style.display = 'flex';
      sidebar.classList.remove('open');
      overlayBurger.classList.remove('active');
    });
  }
  })

  // Закрытие модалки
  function closeAuthModal() {
    if (authModal) {
      authModal.style.display = 'none';
      resetAuthTabs();
    }
  }

  // Закрытие по крестику
  if (authCloseBtn) {
    authCloseBtn.addEventListener('click', closeAuthModal);
  }

  // Закрытие по клику на тёмный фон
  if (authModal) {
    authModal.addEventListener('click', (e) => {
      if (e.target === authModal) {
        closeAuthModal();
      }
    });
  }

  // Сброс активного таба при закрытии
  function resetAuthTabs() {
    tabBtns.forEach(b => b.classList.remove('active'));
    forms.forEach(f => f.classList.remove('active'));

    // Делаем активной первую вкладку (Войти)
    if (tabBtns[0]) tabBtns[0].classList.add('active');
    if (forms[0]) forms[0].classList.add('active');
  }

  tabBtns.forEach(btn => { /* Перебираем каждую кнопку-вкладку (btn — это текущая кнопка в цикле) */
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active')); /* Отключаем активы кнопок лог/рег/ У всех кнопок-вкладок снимаем класс .active, чтобы только одна была подсвечена*/
      forms.forEach(f => f.classList.remove('active')); /* Отключаем активы форм лог/рег/ Перед показом нужной формы — прячем все остальные, снимая .active*/

      btn.classList.add('active'); /* А вот этой конкретной кнопке, на которую кликнули, добавляем класс .active */

      const targetForm = document.getElementById(btn.dataset.tab + '-form'); /* У каждой кнопки в HTML уже заранее прописано data-tab="login" или "register".
      Когда кликаю по кнопке → JS берёт то, что уже лежит в btn.dataset.tab.
      Добавляет к нему "-form" → получается "login-form".
      Ищет элемент с id="login-form".
      Если нашёл — добавляет ему класс .active → форма появляется. */
      if (targetForm) { /* Проверяем наличие нужной формы */
        targetForm.classList.add('active'); /* Показываем нужную форму под кнопкой, показ кнопки настроен выше */
      }
    });
  });

  // заглушка submit
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      alert('Форма отправлена (но бэкенда нет, лол)');
    });
  });
});