(function () {
  const ua = window.navigator.userAgent
  const trident = ua.indexOf('Trident/')

  if (trident > 0) {
    document.getElementsByClassName('img-cover-container').forEach(function (element) {
      const img = element.querySelectorAll('img')
      const imgUrl = img[0].src
      if (imgUrl) {
        element.style.backgroundImage = 'url(' + imgUrl + ')'
        element.classList.add('custom-object-fit')
      }
    })
  } else {
    document.getElementsByClassName('img-cover-container').forEach(function (element) {
      // console.log('not ie11');
      element.classList.add('object-fit')
    })
  }
})()
