import gsap from 'gsap'
import SplitText from './SplitText'
import ScrollMagic from 'scrollmagic';

(function () {
  const controller = new ScrollMagic.Controller()

  document.querySelectorAll('.animated-element').forEach((element, i) => {
    const roundOff = progress => Math.round(progress * 100) / 100
    const title = element.querySelector('.animated-title')
    const paragraph = element.querySelectorAll('.animated-paragraph')
    const duration = 0
    const tl = gsap.timeline({ paused: true })

    if (title) {
      const mySplitText = new SplitText(title, { type: 'lines,words,chars', linesClass: 'ts-line' })
      const chars = mySplitText.chars

      tl.staggerFromTo(chars, 0.4, { yPercent: 100 }, { yPercent: 0, ease: 'power1.inOut' }, 0.02, '+=0')
    }

    if (paragraph) {
      const mySplitText = new SplitText(paragraph, { type: 'words' })
      const chars = mySplitText.words

      tl.staggerFromTo(chars, 0.5, { yPercent: 100, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, ease: 'power1.inOut' }, 0.02, '-=0.5')
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
