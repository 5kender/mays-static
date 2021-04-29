/* eslint-disable */

import './js/bootstrap';
import './js/n-vh-unit';
//import './js/gsap';
//import './js/scroll-magic';
//import './js/animations';
//import './js/intersection-observer';
//import './js/mmenu';
//import './js/photoswipe';
//import './js/swiper';
//import './js/smooth-page-scroll';
//import './js/object-fit';
//import './js/video-autoplay';
//import './js/custom-select';

import $ from 'jquery';

global.$ = global.jQuery = $;

$(document).ready(() => {
  $('[data-toggle="popover"]').popover();
});


let cornElems = document.getElementsByClassName('like-btn');
cornElems.forEach(elem => {
  elem.addEventListener('click', function () {
    if (elem.classList.contains('unliked')) {
      elem.classList.remove('unliked');
      elem.classList.add('liked');
    } else if (elem.classList.contains('liked')) {
      elem.classList.remove('liked');
      elem.classList.add('unliked');
    }
  });
});
