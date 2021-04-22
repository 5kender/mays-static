// core version + navigation, pagination modules:
import Swiper, { Navigation, Pagination, Mousewheel } from 'swiper'
import MobileDetect from 'mobile-detect'

const md = new MobileDetect(window.navigator.userAgent)
const isMobile = !!(md.phone() || md.tablet())

// configure Swiper to use modules
Swiper.use([Navigation, Pagination, Mousewheel])

let isDocumentReady = false

window.addEventListener('load', (e) => {
  isDocumentReady = true
})

document.addEventListener('DOMContentLoaded', function () {
  // eslint-disable-next-line
  new Swiper('.swiper-container', {
    direction: 'vertical',
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    mousewheel: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    }
  })

  // eslint-disable-next-line
  new Swiper('.swiper-video-container', {
    watchState: true,
    preventInteractionOnTransition: true,
    loop: true,
    mousewheel: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: 'true'
    },
    on: {
      slideChangeTransitionStart: () => {
        if (isDocumentReady && !isMobile) {
          const activevideo = document.querySelector('.swiper-slide-active .module-banner-video')

          activevideo && activevideo.play()
        }
      },
      slideChangeTransitionEnd: () => {
        if (isDocumentReady && !isMobile) {
          const nextvideo = document.querySelector('.swiper-slide-next .module-banner-video')
          const prevvideo = document.querySelector('.swiper-slide-prev .module-banner-video')

          if (prevvideo || nextvideo) {
            prevvideo && prevvideo.pause()
            nextvideo && nextvideo.pause()
          }
        }
      }
    }
  })
})
