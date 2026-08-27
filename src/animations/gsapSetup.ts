import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

// Registered synchronously at module load, NOT inside a React effect.
// `useGSAP` (used by every scroll-triggered component) runs via
// useLayoutEffect, which fires before any plain useEffect -- registering
// here instead of in an effect guarantees this runs before ANY component
// tries to create a scrollTrigger-based tween. Registering inside a
// useEffect (the previous approach) worked in local dev only because React
// StrictMode's mount/unmount/remount cycle happened to let it sneak in
// before the second mount's layout effects ran; a real single-pass
// production mount has no such second chance, so every scrollTrigger
// config landed on GSAP before the plugin existed and was silently
// rejected ("Invalid property scrollTrigger... Missing plugin?").
gsap.registerPlugin(ScrollTrigger, SplitText);

export { gsap, ScrollTrigger, SplitText };
