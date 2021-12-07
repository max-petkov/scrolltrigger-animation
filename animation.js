gsap.registerPlugin(ScrollTrigger);

const splitText = document.querySelector(".text");

function splitLetter(parentConainer) {
  const splittedText = parentConainer.textContent.split("");
  const joinText = splittedText.map(
    (el, i) =>
      (parentConainer.innerHTML = `<span class="letter-container" style="z-index: ${
        splittedText.length - i
      };"><span class="letter">${el}</span></span>`)
  );

  parentConainer.innerHTML = joinText.join("");
}
splitLetter(splitText);

// Horizontal scroll
const sections = gsap.utils.toArray(".animation");

let scrollTween = gsap.to(sections, {
  xPercent: -100 * (sections.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: ".container",
    pin: true,
    scrub: 1,
    // base vertical scrolling on how wide the container is so it feels more natural.
    end: () => "+=" + document.querySelector(".container").offsetWidth,
  },
});

// Letter Animation
const letters = gsap.utils.toArray(".letter");
gsap.set(letters, { x: "-100%" });
console.log(letters);

gsap.to(letters, {
  x: 0,
  ease: "none",
  scrollTrigger: {
    markers: true,
    containerAnimation: scrollTween,
    trigger: ".text",
    start: "top center",
    end: "bottom center",
    // end: "+=1500",
    scrub: true,
  },
  stagger: 1,
});
