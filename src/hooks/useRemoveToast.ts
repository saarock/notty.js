import {
  NOTTY_ANIMATE_FADE_IN_CLASS,
  NOTTY_ANIMATE_FADE_OUT_CLASS,
} from "../constant.js";
import { Toast } from "../types/syntax.js";

export default async function useRemoveTost(toast: Toast, toastBox: HTMLDivElement) {
  // remove the toast
  function removeToast() {
    toastBox.remove();
  }


  function fadeOut() {
    toastBox.classList.remove(`${NOTTY_ANIMATE_FADE_IN_CLASS}__${toast.comeFrom || "LEFT"}`,);
    toastBox.classList.add(`${NOTTY_ANIMATE_FADE_OUT_CLASS}__${toast.leaveFrom || "LEFT"}`);
    setTimeout(removeToast, 500);
  }

  if (toastBox.style.animationPlayState !== "paused") {
    fadeOut();
  }

}
