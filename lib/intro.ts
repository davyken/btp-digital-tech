export const INTRO_KEY = "btp-intro-seen";

/** Runs before first paint: skip the intro if already seen this session or reduced motion is requested. */
export const introScript = `try{var h=document.documentElement;if(sessionStorage.getItem('${INTRO_KEY}')||matchMedia('(prefers-reduced-motion: reduce)').matches){h.classList.add('intro-skip')}else{h.classList.add('intro-running')}}catch(e){document.documentElement.classList.add('intro-skip')}`;
