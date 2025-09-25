'use strict';

const modalWindow = document.querySelector('.modal-window');
const overlay = document.querySelector('.overlay');
const btnCloseModalWindow = document.querySelector('.btn--close-modal-window');
const btnsOpenModalWindow = document.querySelectorAll(
  '.btn--show-modal-window'
);
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const tabs = document.querySelectorAll('.operations__tab');
// console.log(tabs);
const tabConteiner = document.querySelector('.operations__tab-container');
// console.log(tabConteiner);
const tabContens = document.querySelectorAll('.operations__content');
// console.log(tabContens);
const nav = document.querySelector('.nav');

///////////////////////////////////////
// Modal window

const openModalWindow = function () {
  modalWindow.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModalWindow = function () {
  modalWindow.classList.add('hidden');
  overlay.classList.add('hidden');
};

// for (let i = 0; i < btnsOpenModalWindow.length; i++)
//   btnsOpenModalWindow[i].addEventListener('click', openModalWindow);

btnCloseModalWindow.addEventListener('click', closeModalWindow);
overlay.addEventListener('click', closeModalWindow);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modalWindow.classList.contains('hidden')) {
    closeModalWindow();
  }
});

//Прокручивание страницы

btnScrollTo.addEventListener('click', function (e) {
  const section1Coords = section1.getBoundingClientRect();
  console.log(section1Coords);
  // console.log(e.target.getBoundingClientRect());
  // console.log(
  //   'Текущее прокручивание: x, y',
  //   window.pageXOffset,
  //   window.pageYOffset
  // );
  // console.log(
  //   'Ширина и высота viewport',
  //   document.documentElement.clientWidth,
  //   document.documentElement.clientHeight
  // );

  // window.scrollTo(
  //   section1Coords.left + window.pageXOffset,
  //   section1Coords.top + window.pageYOffset
  // );

  //// The old way

  // window.scrollTo({
  //   left: section1Coords.left + window.pageXOffset,
  //   top: section1Coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});

// Smooth page navigation
// document.querySelectorAll('.nav__link').forEach(function (htmlElement) {
//   htmlElement.addEventListener('click', function (e) {
//     e.preventDefault();
//     const href = this.getAttribute('href');
//     console.log(href);
//     document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// Делигирование событий
// 1. Добавляем event Listener для ОБЩЕГО родителя
// 2. Определить target элемент

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // Определяем target элемент
  // console.log(e.target);
  if (e.target.classList.contains('nav__link')) {
    const href = e.target.getAttribute('href');
    // console.log(href);
    document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
  }
});

// Вкладки
tabConteiner.addEventListener('click', function (e) {
  // const clickButton = e.target.parentElement;
  const clickButton = e.target.closest('.operations__tab');
  // console.log(clickButton);
  // Guard clause - пункт охраны
  if (!clickButton) return;

  // Активная вкладка
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  clickButton.classList.add('operations__tab--active');

  // Активный контент
  tabContens.forEach(content =>
    content.classList.remove('operations__content--active')
  );

  document
    .querySelector(`.operations__content--${clickButton.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Анимация потускнения навигационной панели

// const navLinksHoverAnimation = function (e, opacity) {
//   if (e.target.classList.contains('nav__link')) {
//     const linkOver = e.target;

//     const siblingLinks = linkOver
//       .closest('.nav__links')
//       .querySelectorAll('.nav__link');
//     const logo = linkOver.closest('.nav').querySelector('img');
//     const logoText = linkOver.closest('.nav').querySelector('.nav__text');

//     siblingLinks.forEach(el => {
//       if (el !== linkOver) el.style.opacity = opacity;
//     });

//     logo.style.opacity = opacity;
//     logoText.style.opacity = opacity;
//   }
// };

// nav.addEventListener('mouseover', function (e) {
//   navLinksHoverAnimation(e, 0.4);
//   // console.log('hello');
// });

// nav.addEventListener('mouseout', function (e) {
//   navLinksHoverAnimation(e, 1);
// });

// Работа с аргументами при помощи bind() / this

const navLinksHoverAnimation = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const linkOver = e.target;

    const siblingLinks = linkOver
      .closest('.nav__links')
      .querySelectorAll('.nav__link');
    const logo = linkOver.closest('.nav').querySelector('img');
    const logoText = linkOver.closest('.nav').querySelector('.nav__text');

    siblingLinks.forEach(el => {
      if (el !== linkOver) el.style.opacity = this;
    });

    logo.style.opacity = this;
    logoText.style.opacity = this;
  }
};

nav.addEventListener('mouseover', navLinksHoverAnimation.bind(0.4));

nav.addEventListener('mouseout', navLinksHoverAnimation.bind(1));

// Sticky navigation

// const section1Coords = section1.getBoundingClientRect();
// console.log(section1Coords);

// window.addEventListener('scroll', function (e) {
//   if (window.scrollY > section1Coords.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
//   // console.log(window.scrollY);
// });

// Sticky navigation - Intersection Observer API
// const observerCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };
// const observerOptions = { root: null, threshold: [0, 0.2] };
// const observer = new IntersectionObserver(observerCallback, observerOptions);
// observer.observe(section1);

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const getStickyNav = function (entries) {
  const entry = entries[0];
  // console.log(entry);
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(getStickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

//  Появление частей сайта

const allSections = document.querySelectorAll('.section');

const appearanceSection = function (entries, observer) {
  const entry = entries[0];
  // console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(appearanceSection, {
  root: null,
  threshold: 0.2,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

// Имплементация lazy loading для изображений

const lazyImages = document.querySelectorAll('img[data-src]');
console.log(lazyImages);

const loadImages = function (entries, observer) {
  const entry = entries[0];
  console.log(entry);
  if (!entry.isIntersecting) return;

  // Меняем изображение на изображение с высоким разрешением

  entry.target.src = entry.target.dataset.src;
  // entry.target.classList.remove('lazy-img');
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const lazyImagesObserver = new IntersectionObserver(loadImages, {
  root: null,
  threshold: 0.7,
});

lazyImages.forEach(image => lazyImagesObserver.observe(image));

// Создание слайдера

const slides = document.querySelectorAll('.slide');

const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');

let currentSlide = 0;
const slidesNumber = slides.length;

// const slider = document.querySelector('.slider');
// slider.style.transform = 'scale(0.4) trnanslateX(1500px)';
// slider.style.overflow = 'visible';

const createDots = function () {
  slides.forEach(function (_, index) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${index}"></button>`
    );
  });
};
createDots();
const activateCurrentDot = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};
activateCurrentDot(0);

const moveToSlide = function (slide) {
  slides.forEach(
    (s, index) =>
      (s.style.transform = `translateX(${(index - currentSlide) * 100}%)`)
  );
};

moveToSlide(0);
// slides.forEach(
//   (slide, index) => (slide.style.transform = `translateX(${index * 100}%)`)
//   // 1-0%, 2-100%, 3-200%, 4-300%
// );
const nextSlide = function () {
  if (currentSlide === slidesNumber - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  moveToSlide(currentSlide);
  activateCurrentDot(currentSlide);
};

const previousSlide = function () {
  if (currentSlide === 0) {
    currentSlide = slidesNumber - 1;
  } else {
    currentSlide--;
  }
  moveToSlide(currentSlide);
  activateCurrentDot(currentSlide);
};

btnRight.addEventListener(
  'click',
  nextSlide
  // 1- -100%, 2-0%, 3-100%, 4-200%
);

btnLeft.addEventListener(
  'click',
  previousSlide

  // 1- -100%, 2-0%, 3-100%, 4-200%
);

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowRight') nextSlide();
  if (e.key === 'ArrowLeft') previousSlide();
});

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const slide = e.target.dataset.slide;
    console.log(slide);
    moveToSlide(slide);
    console.log('hello');
    activateCurrentDot(slide);
  }
});
