gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {

  /**
   * Инициализация Lenis
   */
  const lenis = new Lenis({
    anchors: {
      offset: -60,
    }
  });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 500);
  });
  gsap.ticker.lagSmoothing(0);

  /**
   * Расчёт ширины скроллбара старницы и добавление отступа в body при октрытии попапов
   */
  function getScrollbarWidth() {
    const div = document.createElement('div');

    div.style.overflowY = 'scroll';
    div.style.width = '100px';
    div.style.height = '100px';
    div.style.visibility = 'hidden';

    document.body.appendChild(div);

    const scrollbarWidth = div.offsetWidth - div.clientWidth;

    document.body.removeChild(div);

    return scrollbarWidth;
  }

  /**
   * Управляет поведением меню-бургера.
   */
  function burgerNav() {
    const burgerBtn = document.querySelector('.burger-btn');
    const burgerMenu = document.querySelector('.burger-menu');
    const burgerClose = document.querySelector('.burger-close');
    const overlay = document.querySelector('.burger-overlay');
    const header = document.getElementById('header');
    const elements = document.querySelectorAll('.burger-menu__list a');

    /**
     * Переключает видимость меню.
     */
    const toggleMenu = () => {
      const isOpened = burgerBtn.classList.toggle('burger-btn--opened');
      const isHeaderOpened = header.classList.toggle('opened');
      burgerMenu.classList.toggle('burger-menu--opened', isOpened, isHeaderOpened);

      lenis.stop();
    };

    /**
     * Закрывает меню.
     */
    const closeMenu = () => {
      header.classList.remove('opened');
      burgerBtn.classList.remove('burger-btn--opened');
      burgerMenu.classList.remove('burger-menu--opened');
      lenis.start();
    };

    // Открытие/закрытие меню по клику на бургер
    burgerBtn.addEventListener('click', toggleMenu);

    // Закрытие меню по клику на кнопку закрытия или на overlay
    [burgerClose, overlay].forEach((element) => element.addEventListener('click', closeMenu));

    // Закрытие меню при клике вне области меню и бургера
    document.addEventListener('click', (event) => {
      if (!burgerMenu.contains(event.target) && !burgerBtn.contains(event.target)) {
        closeMenu();
      }
    });

    // Закрытие меню при нажатии на кнопку "Esc"
    window.addEventListener('keydown', (e) => {
      if (e.key === "Escape") {
        closeMenu();
      }
    });

    elements.forEach((element) => element.addEventListener('click', closeMenu));
  }
  burgerNav();

  /**
   * Управляет поведением меню-контакта.
   */
  function contactNav() {
    const contactBtn = document.querySelector('.contact-btn');
    const contactMenu = document.querySelector('.contact-menu');
    const contactClose = document.querySelector('.contact-close');
    const overlay = document.querySelector('.contact-overlay');
    const header = document.getElementById('header');
    const elements = document.querySelectorAll('.contact-menu__list a');

    /**
     * Переключает видимость меню.
     */
    const toggleMenu = () => {
      const isOpened = contactBtn.classList.toggle('contact-btn--opened');
      const isHeaderOpened = header.classList.toggle('opened');
      contactMenu.classList.toggle('contact-menu--opened', isOpened, isHeaderOpened);

      lenis.stop();
    };

    /**
     * Закрывает меню.
     */
    const closeMenu = () => {
      header.classList.remove('opened');
      contactBtn.classList.remove('contact-btn--opened');
      contactMenu.classList.remove('contact-menu--opened');
      lenis.start();
    };

    // Открытие/закрытие меню по клику на бургер
    contactBtn.addEventListener('click', toggleMenu);

    // Закрытие меню по клику на кнопку закрытия или на overlay
    [contactClose, overlay].forEach((element) => element.addEventListener('click', closeMenu));

    // Закрытие меню при клике вне области меню и бургера
    document.addEventListener('click', (event) => {
      if (!contactMenu.contains(event.target) && !contactBtn.contains(event.target)) {
        closeMenu();
      }
    });

    // Закрытие меню при нажатии на кнопку "Esc"
    window.addEventListener('keydown', (e) => {
      if (e.key === "Escape") {
        closeMenu();
      }
    });

    elements.forEach((element) => element.addEventListener('click', closeMenu));
  }
  contactNav();

  function accordionFunc() {
    if (document.querySelector('.accordion-parent')) {
      document.querySelectorAll('.accordion-parent').forEach((accordionContainer) => {

        var accordionHead = accordionContainer.querySelectorAll('.accordion'),
          accordionActiveClass = 'accordion-active',
          accordionActive = accordionContainer.getElementsByClassName(accordionActiveClass);

        Array.from(accordionHead).forEach(function (accordionItem, i, accordionHead) {
          accordionItem.addEventListener('click', function (e) {
            e.stopPropagation();

            if (accordionActive.length > 0 && accordionActive[0] !== this) {
              accordionActive[0].classList.remove(accordionActiveClass);
            }
            this.classList.toggle(accordionActiveClass);

            window.addEventListener('keydown', (e) => {
              if (e.key === "Escape") {
                accordionItem.classList.remove(accordionActiveClass)
              }
            });

            document.addEventListener('click', (e) => {
              const withinBoundaries = e.composedPath().includes(accordionItem);

              if (!withinBoundaries) {
                accordionItem.classList.remove(accordionActiveClass);
              }
            })
          });
        });
      });
    }
  }
  accordionFunc();

  const reviewSlider = new Swiper(".review__slider", {
    slidesPerGroup: 1,
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    speed: 600,
    mousewheel: {
      forceToAxis: true,
    },
    navigation: {
      nextEl: ".review__slider-btn--next",
      prevEl: ".review__slider-btn--prev",
    },
    pagination: {
      el: ".swiper-pagination",
    },
    breakpoints: {
      991: {
        slidesPerView: 1,
        spaceBetween: 60,
      },
    },
  });

  const gallerySlider = new Swiper(".gallery__slider", {
    slidesPerGroup: 1,
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    speed: 600,
    mousewheel: {
      forceToAxis: true,
    },
    navigation: {
      nextEl: ".gallery__slider-btn--next",
      prevEl: ".gallery__slider-btn--prev",
    },
    pagination: {
      el: ".swiper-pagination",
    },
    breakpoints: {
      769: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 60,
      },
    },
  });

  if (document.querySelector('.uniForm')) {
    const mailPath = './mail.php';

    document.querySelectorAll('.uniForm').forEach((el) => {
      el.addEventListener('submit', function (event) {
        event.preventDefault();
        el.classList.remove('_failed');

        let error = formValidate(el);

        if (error === 0) {
          let th = this,
            params = new FormData(this),
            request = new XMLHttpRequest();

          request.open('POST', mailPath, true);
          request.send(params);

          request.onreadystatechange = function () {
            if (this.readyState === 4) {
              if (this.status === 200) {
                setTimeout(function () {
                  th.reset();
                }, 1000);
                el.classList.add('_success');
                setTimeout(() => {
                  el.classList.remove('_success');
                }, 5000);
              } else {
                el.classList.add('_failed');
              }
            }
          };
        }
      });
    });

    function formValidate(form) {
      let error = 0;
      let formReq = form.querySelectorAll('._req');

      for (let index = 0; index < formReq.length; index++) {
        const input = formReq[index];
        formRemoveError(input);

        if (input.getAttribute('type') === 'checkbox' && input.checked === false) {
          formAddError(input);
          error++;
        } else if (input.classList.contains('_email')) {
          if (emailTest(input)) {
            formAddError(input);
            error++;
          }
        } else {
          if (input.value === '') {
            formAddError(input);
            error++;
          }
        }
      }
      return error;
    }
    function formAddError(input) {
      input.classList.add('_error');
    }
    function formRemoveError(input) {
      input.classList.remove('_error');
    }
    function emailTest(input) {
      return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }
  }

  /**
   * Установка dropdown
   */
  const dropdownJs = document.querySelector('.dropdown--js');
  if (dropdownJs) {
    let dropdowns = document.querySelectorAll('.dropdown--js');
    dropdowns.forEach(dropdown => {

      function updateSelected() {
        let selectedValue = dropdown.querySelector('.dropdown__value');
        let selectedOption = dropdown.querySelector('.dropdown__radio:checked');
        let selectedLabel = selectedOption.parentElement.querySelector('.dropdown__label');
        let text = selectedLabel.textContent;
        let selectedDropdown = dropdown.querySelector('.dropdown__selected--js');
        selectedDropdown.querySelector('span').textContent = text;
        selectedValue.dataset.value = text;

        if (selectedValue.dataset.value.length != 0) {
          dropdown.classList.add('check');
        } else {
          dropdown.classList.remove('check');
        }
      }

      function toggleClass(el, className, add) {
        let addClass = add;
        if (typeof addClass === 'undefined') {
          addClass = !el.classList.contains(className);
        }
        if (addClass) {
          el.classList.add(className);
        } else {
          el.classList.remove(className);
        }
      }

      let radios = dropdown.querySelectorAll('.dropdown__radio');
      let root = dropdown;

      for (let i = 0; i < radios.length; ++i) {
        let radio = radios[i];
        radio.addEventListener('change', function () {
          updateSelected();
        });
        radio.addEventListener('click', function () {
          toggleClass(root, 'is-active', false);
        });
      }

      let selectedLabel = dropdown.querySelector('.dropdown__selected--js');
      selectedLabel.addEventListener('click', function () {
        toggleClass(root, 'is-active');
      });

      document.addEventListener('click', (event) => {
        if (!dropdown.querySelector('.dropdown__container').contains(event.target) && !dropdown.querySelector('.dropdown__selected').contains(event.target)) {
          toggleClass(root, 'is-active', false);
        }
      });

      // updateSelected();
    });
  }

  /**
 * Инициализация Fancybox
 */
  if (document.querySelector('.fancybox')) {
    Fancybox.bind('[data-fancybox="gallery"]', {
      // Your custom options
    });
  }

});