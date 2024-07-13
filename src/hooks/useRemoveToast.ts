import {
  NOTTY_ANIMATE_FADE_IN_CLASS,
  NOTTY_ANIMATE_FADE_OUT_CLASS,
} from "../constant.js";

export default async function useRemoveTost(toastBox: HTMLDivElement) {
  // remove the toast
  function removeToast() {
    toastBox.remove();
  }

  function fadeOut() {
    toastBox.classList.remove(`${NOTTY_ANIMATE_FADE_IN_CLASS}__LEFT`);
    toastBox.classList.add(`${NOTTY_ANIMATE_FADE_OUT_CLASS}__RIGHT`);
    setTimeout(removeToast, 500);
  }
  if (toastBox.style.animationPlayState !== "paused") {
    fadeOut();
  }

  // setTimeout(fadeOut, 3000);
}
