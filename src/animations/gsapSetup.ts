import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

let registered = false;

/** Registers GSAP plugins exactly once, regardless of how many modules import this. */
export function ensureGsapRegistered() {
  if (registered) return;
  registered = true;
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

export { gsap, ScrollTrigger, SplitText };
