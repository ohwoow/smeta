window.addEventListener('load', function () {
  // PreLoader

  const mask = document.querySelector('.mask')

  mask.classList.add('hide')

  setTimeout(() => {
    mask.remove()
  }, 600)
})


document.addEventListener('DOMContentLoaded', () => {
  // * "modal-questions" in development
  const modalBody = document.querySelector('.modal-body');
  const modalBtnNext = document.querySelector('.modal__btn-next');
  const modalBtnPrev = document.querySelector('.modal__btn-prev');



  const question = [{
    html: `
        <span class="modal__question-count">Вопрос 2.</span>
        <div class="modal__question">Какие дополнительные документы требуются?</div>

        <form action="#" method="POST" class="modal-form">
            <label class="modal-form__label">
                <input type="radio" name="input-radio" class="modal-form__radio">
                <span class="modal-form__text">Никаких</span>
            </label>
            <label class="modal-form__label">
                <input type="radio" name="input-radio" class="modal-form__radio">
                <span class="modal-form__text">Акт по форме КС-2</span>
            </label>
            <label class="modal-form__label">
                <input type="radio" name="input-radio" class="modal-form__radio">
                <span class="modal-form__text">Конъюнктурный анализ цен</span>
            </label>
        </form>
        `
  }, ]

  question.forEach((item, index) => {


    modalBtnNext.addEventListener('click', function (e) {
      modalBody.innerHTML = item.html;
    })
    if (index == 0) {
      modalBtnPrev.setAttribute('disabled', 'disabled')
    } else {
      modalBtnPrev.removeAttribute('disabled')
    }
  })

  // * validation input

  const consulationInput = document.querySelector('.consulation-phone__input');
  const consulationBtn = document.querySelector('.consulation-phone__btn');
  const error = document.querySelector('.error');


  consulationBtn.addEventListener('click', event => {
    let value = consulationInput.value.trim()

    if (value === '') {
      error.style.display = 'block'
      return
    } else {
      error.style.display = 'none'
      consulationInput.value = ''
      alert('Заявка отправлена!')
    }

  })


  // * MODAL

  const modalOverlay = document.querySelector('.modal-overlay'),
    btnOpenModal = document.querySelectorAll('.open-modal'),
    modalClose = document.querySelector('.modal__close'),
    body = document.querySelector('body'),
    fixBlock = document.querySelectorAll('.fix-block');

  const documentWidth = document.documentElement.clientWidth;
  const windowWidth = window.innerWidth;

  const paddingOffset = windowWidth - documentWidth + 'px';




  // * FIXED HEADER and ACTIVE NAV LINK

  const header = document.querySelector('.header');
  const intro = document.querySelector('.intro');


  window.addEventListener('scroll', (e) => {

    const scrollTop = this.scrollY;

    const introHeight = intro.clientHeight - 10;

    if (introHeight < scrollTop) {
      header.classList.add('fixed')
    } else {
      header.classList.remove('fixed')
    }

  });


  function disableScroll() {
    body.classList.add('no-scroll')
    body.style.paddingRight = paddingOffset

    fixBlock.forEach(el => el.style.paddingRight = paddingOffset)
  }

  function enableScroll(params) {
    body.classList.remove('no-scroll')
    body.style.paddingRight = ''
    fixBlock.forEach(el => el.style.paddingRight = '')
  }


  function openModal() {
    disableScroll()
    modalOverlay.classList.toggle('open');
    if (header.classList.contains('fixed')) {
      header.style.display = "none";
    }
  }

  function closeModal() {
    enableScroll()
    modalOverlay.classList.remove('open');
    header.style.display = "block";
  }



  btnOpenModal.forEach(btn => {
    btn.addEventListener('click', openModal);
  })

  modalClose.addEventListener('click', closeModal);

  modalOverlay.addEventListener('click', (e) => {
    if (e.target.dataset.close) {
      closeModal()
    }
  })





  //скрипт плавной прокрутки

  const linkNav = document.querySelectorAll('a[href^="#"]'), //выбираем все ссылки к якорю на странице
    V = 0.5; // скорость, может иметь дробное значение через точку (чем меньше значение - тем больше скорость)
  for (let i = 0; i < linkNav.length; i++) {
    linkNav[i].addEventListener('click', function (e) { //по клику на ссылку
      e.preventDefault(); //отменяем стандартное поведение
      const w = window.pageYOffset, // производим прокруту
        hash = this.href.replace(/[^#]*(.*)/, '$1'); // к id элемента, к которому нужно перейти
      t = document.querySelector(hash).getBoundingClientRect().top, // отступ от окна браузера до id
        start = null;
      requestAnimationFrame(step); // подробнее про функцию анимации [developer.mozilla.org]
      function step(time) {
        if (start === null) start = time;
        const progress = time - start,
          r = (t < 0 ? Math.max(w - progress / V, w + t) : Math.min(w + progress / V, w + t));
        window.scrollTo(0, r);
        if (r != w + t) {
          requestAnimationFrame(step);
        } else {
          location.hash = hash; // URL с хэшем
        }
      }
    }, false);
  }
















  // * SLIDER

  const portfolioSlider = document.querySelector('.swiper-container')


  let slider = new Swiper(portfolioSlider, {
    slidesPerView: 1,
    spaceBetween: 21,

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    breakpoints: {
      1040: {
        slidesPerView: 2,
      }
    }
  })
})