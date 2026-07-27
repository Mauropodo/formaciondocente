import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export function fadeInUp(element, delay = 0) {
  if (!element) return;
  gsap.from(element, {
    opacity: 0,
    y: 40,
    duration: 0.8,
    delay,
    scrollTrigger: {
      trigger: element,
      start: "top 85%",
    },
  });
}

export function fadeInDown(element, delay = 0) {
  if (!element) return;
  gsap.from(element, {
    opacity: 0,
    y: -40,
    duration: 0.8,
    delay,
    scrollTrigger: {
      trigger: element,
      start: "top 85%",
    },
  });
}

export function staggerItems(container, delay = 0.1) {
  if (!container) return;
  gsap.from(container.children, {
    opacity: 0,
    y: 30,
    stagger: delay,
    duration: 0.6,
    scrollTrigger: {
      trigger: container,
      start: "top 80%",
    },
  });
}

export function fadeInLeft(element, delay = 0) {
  if (!element) return;
  gsap.from(element, {
    opacity: 0,
    x: -60,
    duration: 0.8,
    delay,
    scrollTrigger: {
      trigger: element,
      start: "top 85%",
    },
  });
}

export function fadeInRight(element, delay = 0) {
  if (!element) return;
  gsap.from(element, {
    opacity: 0,
    x: 60,
    duration: 0.8,
    delay,
    scrollTrigger: {
      trigger: element,
      start: "top 85%",
    },
  });
}

export function scaleIn(element, delay = 0) {
  if (!element) return;
  gsap.from(element, {
    opacity: 0,
    scale: 0.8,
    duration: 0.6,
    delay,
    scrollTrigger: {
      trigger: element,
      start: "top 85%",
    },
  });
}
