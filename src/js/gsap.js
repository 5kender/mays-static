/* import gsap from 'gsap'

import SplitText from './SplitText';

(function() {
    gsap.from('.title', { duration: 3, y: '50%', opacity:0 , ease: "power4.inOut" });

    let tl = gsap.timeline(),
        mySplitText = new SplitText("#main-animated-title", {type:"lines,words,chars",linesClass:"ts-line"}),
        chars = mySplitText.chars;

        tl.staggerFromTo(chars, 0.5,{yPercent: 100,}, {yPercent: 0, ease: "power1.inOut"}, 0.02, "+=0"),
        tl.to('#btn-more', 1,{opacity:1, ease: "power4.inOut"}, "+=0.5");

})(); */
