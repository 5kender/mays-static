import gsap from 'gsap'
import SplitText from './SplitText'
import ScrollMagic from 'scrollmagic'
// import CustomEase from './CustomEase'
// import CustomEase from './CustomEase';
// CustomEase.create("hop", "M0,0.005 C0,0.005 0.056,0.445 0.175,0.445 0.294,0.445 0.332,0 0.332,0 0.332,0 0.414,1 0.671,1 0.991,1 1,0 1,0");
// ease: CustomEase.create("custom", "M0,0 C0.126,0.382 0.138,0.507 0.156,0.566 0.304,1.074 0.818,1.001 1,1 "}

(function () {
  const controller = new ScrollMagic.Controller()

  function debounce (func, wait, immediate) {
    var timeout
    return function () {
      var context = this; var args = arguments
      var later = function () {
        timeout = null
        if (!immediate) func.apply(context, args)
      }
      var callNow = immediate && !timeout
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
      if (callNow) func.apply(context, args)
    }
  };

  document.querySelectorAll('.animated-element').forEach((element, i) => {
    gsap.config({
      nullTargetWarn: false
    })

    const roundOff = progress => Math.round(progress * 100) / 100
    const fadeUpLines = element.querySelectorAll('.fade-up-lines')
    const fadeUpChars = element.querySelectorAll('.fade-up-chars')

    const fadeUpDownChars = element.querySelectorAll('.fade-up-down-chars')
    const fadeUpImg = element.querySelectorAll('.fade-up-img')
    const fadeDownImg = element.querySelectorAll('.fade-down-img')
    const fadeImg = element.querySelectorAll('.fade-img')
    const duration = 0
    const tl = gsap.timeline({ paused: true })

    if (fadeUpLines) {
      gsap.set(fadeUpLines, { 'box-sizing': 'border-box' })
      const mySplitText = new SplitText(fadeUpLines, { type: 'lines,words,chars' })
      mySplitText.split({ type: 'lines' })
      gsap.set(mySplitText.lines, { display: 'inline-block' })

      tl.staggerFrom(mySplitText.lines, 1.35, { opacity: 0, yPercent: 150, force3D: true, ease: 'power4.out' }, 0.15, '-=0.05')

      const resizeLines = debounce(function () {
        mySplitText.split({ type: 'lines' })
      }, 100)

      window.addEventListener('resize', resizeLines)
    }

    if (fadeUpChars) {
      const mySplitText = new SplitText(fadeUpChars, { type: 'lines,words,chars', linesClass: 'ts-line' })
      const chars = mySplitText.chars
      tl.staggerFromTo(chars, 0.5, { yPercent: 100 }, { yPercent: 0, ease: 'power4.out' }, 0.05, '-=0.05')

      const resizeLines = debounce(function () {
        mySplitText.split({ type: 'lines' })
      }, 100)

      window.addEventListener('resize', resizeLines)
    }

    if (fadeUpDownChars) {
      const mySplitText = new SplitText(fadeUpDownChars, { type: 'lines,words,chars', linesClass: 'ts-line' })
      const chars = mySplitText.chars
      const evenchars = []
      const oddchars = []

      for (let i = 0; i < chars.length; i++) {
        if (i % 2 === 0) {
          evenchars.push(chars[i])
        } else {
          oddchars.push(chars[i])
        }
      }

      tl.staggerFromTo(evenchars, 1, { yPercent: 200 }, { yPercent: 0, ease: 'power4.out' }, 0.02, '0')
      tl.staggerFromTo(oddchars, 1, { yPercent: -200 }, { yPercent: 0, ease: 'power4.out' }, 0.02, '0')

      const resizeLines = debounce(function () {
        mySplitText.split({ type: 'lines' })
      }, 100)

      window.addEventListener('resize', resizeLines)
    }

    if (fadeImg) {
      tl.fromTo(fadeImg, 3, { opacity: '0%' }, { opacity: '100%', ease: 'power4.out' }, 0)
    }

    if (fadeUpImg) {
      tl.fromTo(fadeUpImg, 3, { opacity: '0%', yPercent: 15 }, { opacity: '100%', yPercent: 0, ease: 'power4.out' }, 0)
    }

    if (fadeDownImg) {
      tl.fromTo(fadeDownImg, 3, { opacity: '0%', yPercent: -15 }, { opacity: '100%', yPercent: 0, ease: 'power4.out' }, 0)
    }

    new ScrollMagic.Scene({
      triggerElement: element,
      triggerHook: 0.5,
      duration: `${duration}%`
    })

      .addTo(controller)

      .on('progress', function (event) {
        if (duration > 0) {
          tl.progress(roundOff(event.progress))
        } else {
          if (event.scrollDirection === 'FORWARD') {
            tl.play()
          }
        }
      })

      .on('start', function (event) {
        tl.play()
      })
  })
})()
