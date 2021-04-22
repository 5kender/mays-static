import gsap from 'gsap'

window.addEventListener('DOMContentLoaded', (event) => {
  const html = document.documentElement
  const body = document.body
  const enableSmoothScroll = document.getElementById('scroll-container')

  gsap.config({
    nullTargetWarn: false
  })

  const scroller = {
    target: document.querySelector('#scroll-container'),
    ease: 0.05, // <= scroll speed
    endY: 0,
    y: 0,
    resizeRequest: 1,
    scrollRequest: 0
  }

  let requestId = null

  gsap.set(scroller.target, {
    rotation: 0.01,
    force3D: true
  })

  window.addEventListener('load', onLoad)

  function onLoad () {
    if (enableSmoothScroll) {
      updateScroller()
      window.focus()
      window.addEventListener('resize', onResize)
      document.addEventListener('scroll', onScroll)
    }
  }

  function updateScroller () {
    const resized = scroller.resizeRequest > 0

    if (resized) {
      const height = scroller.target.clientHeight
      body.style.height = height + 'px'
      scroller.resizeRequest = 0
    }

    const scrollY = window.pageYOffset || html.scrollTop || body.scrollTop || 0

    scroller.endY = scrollY
    scroller.y += (scrollY - scroller.y) * scroller.ease

    if (Math.abs(scrollY - scroller.y) < 0.05 || resized) {
      scroller.y = scrollY
      scroller.scrollRequest = 0
    }

    gsap.set(scroller.target, {
      y: -scroller.y
    })

    requestId = scroller.scrollRequest > 0 ? requestAnimationFrame(updateScroller) : null
  }

  function onScroll () {
    scroller.scrollRequest++
    if (!requestId) {
      requestId = requestAnimationFrame(updateScroller)
    }
  }

  function onResize () {
    scroller.resizeRequest++
    if (!requestId) {
      requestId = requestAnimationFrame(updateScroller)
    }
  }
})
