import MobileDetect from 'mobile-detect';

(function () {
  const md = new MobileDetect(window.navigator.userAgent)
  const isMobile = !!(md.phone())

  window.addEventListener('load', (e) => {
    if (!isMobile) {
      const videos = document.querySelectorAll('video')

      videos.forEach((video, index) => {
        video.setAttribute('src', video.getAttribute('data-src'))
        video.play()
      })
    }
  })
})()
