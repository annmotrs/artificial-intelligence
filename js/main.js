const menu = document.querySelector('.nav__list');
const buttonMenu = document.querySelector('.icon-menu');

//Открытие и закрытие меню в мобильной версии
buttonMenu.addEventListener('click', function(event){
  menu.classList.toggle('nav__list--active');
  event.target.classList.toggle('fa-bars');
  event.target.classList.toggle('fa-times');
  if(document.documentElement.style.overflow === 'auto' || document.documentElement.style.overflow === '' )
    document.documentElement.style.overflow = 'hidden';
  else {
    document.documentElement.style.overflow = 'auto';
  }  
}); 

//Слайдер
var swiper = new Swiper(".cards", {
  slidesPerView: 3,
  spaceBetween: 30,
  autoplay: true,
  grabCursor: 'true',
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 30,
    },
    784: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    980: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },
});

let accordion = document.querySelectorAll('.accordion');

//открытие и закрытие аккордеона 
accordion.forEach(el => {
  el.addEventListener('click', function(event){
    let heading = event.target.closest('.accordion__heading');
    let content = el.querySelector('.accordion__content');
    if(el.classList.contains('accordion--active') && heading){
      el.classList.remove('accordion--active')
      content.style.height = '0px'; 
    }
    else if(!event.target.closest('.accordion__content')) {
      accordion.forEach(subEl => {
        subEl.classList.remove('accordion--active');
        subEl.querySelector('.accordion__content').style.height = '0px'; 
      });
      el.classList.add('accordion--active');
      content.style.height = `${content.scrollHeight + 30}px`; 
    }
  });
});

let tabs = document.querySelectorAll('.tabs__toggle');
let tabsContents = document.querySelectorAll('.tabs__content');
let tabsSelect = document.querySelector('.tabs__select');

//Скрытие и открытие аккордеонов идущих пятыми и больше
tabsContents.forEach(content => {
  let accordions = content.querySelectorAll('.accordion');
  let tabsbutton = content.querySelector('.tabs__button');

  if(accordions.length > 4) {

    tabsbutton.classList.add('tabs__button--active');

    for(let i = 4; i < accordions.length; i++) {
      accordions[i].classList.add('accordion--hide');
    }

    tabsbutton.addEventListener('click', function(){
      let parent = tabsbutton.closest('.tabs__content');
      let currentAccordions = parent.querySelectorAll('.accordion');
      currentAccordions.forEach(el => {
        if(el.classList.contains('accordion--hide')){
          el.classList.remove('accordion--hide');
        }
      });  
      tabsbutton.classList.remove('tabs__button--active');    
    });
  }

});

//Переключение таба
tabs.forEach((tab, index) => {
  tab.addEventListener('click', function() {
    tabsContents.forEach(content => content.classList.remove('tabs__content--active'));
    tabs.forEach(tab => tab.classList.remove('tabs__toggle--active'));
    tab.classList.add('tabs__toggle--active');
    tabsContents[index].classList.add('tabs__content--active');
    tabsSelect.value = index;
  });
});

tabsSelect.addEventListener('change', function(){
  tabs.forEach(tab => tab.classList.remove('tabs__toggle--active'));
  tabs[+tabsSelect.value].classList.add('tabs__toggle--active');
  tabsContents.forEach(content => content.classList.remove('tabs__content--active'));
  tabsContents[+tabsSelect.value].classList.add('tabs__content--active');
});

//Открытие и закрытие списка в футере в мобильной версии
let columns = document.querySelectorAll('.footer__column');
let links = document.querySelector('.footer__column-links');

columns.forEach(column => {
  column.addEventListener('click', function(){
    column.classList.toggle('footer__column--active');
  });
});

//Получаем элементы для взаимодействия с модальным окном
let popupLogin = document.querySelector('#popup-login');
let linkSignUp = document.querySelector('.popup-login__link-sign-up');
let formSignIn = document.querySelector('#form-sign-in');
let formSignUp = document.querySelector('#form-sign-up');
let buttonOpenPopup = document.querySelector('.nav__button');
let buttonClosePopup = document.querySelector('.popup-login__icon-close-box');
let buttonSignIn = document.querySelector('.button-sign-in');
let buttonSignUp = document.querySelector('.button-sign-up');

//Переключение формы входа на форму регистрации 
linkSignUp.addEventListener('click', function(event){
  event.preventDefault();
  formSignIn.classList.remove('popup-login__form--active');
  formSignUp.classList.add('popup-login__form--active');
  document.querySelector('.popup-login__title').textContent = "Sign Up";
});

//Закрытие модального окна по нажатию на крестик в нем
buttonClosePopup.addEventListener('click', function(){
  closePopup();
});  

//Открытие модального окна, и возврат его к начальному состоянию, если было совершено переключение форм 
buttonOpenPopup.addEventListener('click', function(){
  popupLogin.classList.add('popup--active');
  disableScroll();
  if(formSignUp.classList.contains('popup-login__form--active')) {
    formSignUp.classList.remove('popup-login__form--active');
    formSignIn.classList.add('popup-login__form--active');
    document.querySelector('.popup-login__title').textContent = "Sign In";    
  }
});  

//Отключение скролла на сайте
function disableScroll() { 
  let pagePosition = window.scrollY;
  document.body.classList.add('disable-scroll');
  document.body.dataset.position = pagePosition;
  document.body.style.top = -pagePosition + 'px';
}

 //Включение скролла на сайте
function enableScroll() { 
  let pagePosition = parseInt(document.body.dataset.position, 10);
  document.body.style.top = 'auto';
  document.body.classList.remove('disable-scroll');
  window.scroll({top: pagePosition, left: 0});
  document.body.removeAttribute('data-position');
}

//Проверка формы перед отправкой, отменяем автоматическую отправку формы, закрываем модальное окно и очищаем форму
buttonSignIn.addEventListener('click', function(event) {
  let isFormValid = formSignIn.checkValidity();
  if(!isFormValid) {
    formSignIn.reportValidity();
  }
  else {
    event.preventDefault();
    closePopup();
    formSignIn.reset();
  }
});   

buttonSignUp.addEventListener('click', function(event) {
  let isFormValid = formSignUp.checkValidity();
  if(!isFormValid) {
    formSignUp.reportValidity();
  }
  else {
    event.preventDefault();
    closePopup();
    formSignUp.reset();
  }
});   

document.addEventListener('click', event => {
  //Закрытие модального окна при клике в область вне него
  if(popupLogin.classList.contains('popup--active')) {
    const withinBoundaries = event.composedPath().includes(document.querySelector('.popup-login')) || event.composedPath().includes(buttonOpenPopup);
    if(!withinBoundaries) {
      closePopup();
    }
  }
  //Закрытие открытого меню при клике на пункт меню
  if(menu.classList.contains('nav__list--active')) {
    if(event.composedPath().includes(event.target.closest('.nav__link'))) {
      menu.classList.remove('nav__list--active');
      buttonMenu.classList.add('fa-bars');
      buttonMenu.classList.remove('fa-times');
      document.documentElement.style.overflow = 'auto';
    }    
  }
});

function closePopup() {
  popupLogin.classList.remove('popup--active');
  enableScroll();
}

//Изменение тем сайта, применение выбранной темы при загрузке сайта
let buttonTheme = document.querySelector('.footer__mode');
let currentTheme = JSON.parse(localStorage.getItem('theme'));
let body = document.body;

document.addEventListener('DOMContentLoaded', () => {if(currentTheme === "light") {setTheme(currentTheme)}});

buttonTheme.addEventListener('click', () => {

  if(body.getAttribute('data-theme') === 'light') {
    localStorage.setItem('theme', JSON.stringify('dark')); 
    setTheme('dark');
  }
  else {
    localStorage.setItem('theme', JSON.stringify('light')); 
    setTheme('light');
  }

});

function setTheme(name) {
  buttonTheme.innerHTML = name === 'light' ? '<i class="fa fa-moon"></i> Dark Mode' : '<i class="fa fa-sun"></i> Light Mode';
  body.setAttribute('data-theme', name);  
}

//Добавление анимации при скролле
AOS.init({
  once: true
}); 