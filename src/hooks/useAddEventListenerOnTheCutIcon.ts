import {
  NOTTY_ANIMATE_FADE_OUT_CLASS,
  NOTTY_CONTAINER_ID_NAME,
  NOTTY_CROSS_ICON_CLASS,
  NOTTY_TOAST_CLASS,
} from "../constant.js";

export default async function useAddEventListenerOnTheCutIcon() {
  const nottyContainer = document.getElementById(`${NOTTY_CONTAINER_ID_NAME}`);
  console.log(nottyContainer);
  if (nottyContainer === undefined || nottyContainer == null)
    throw new Error("notty__container required");

  nottyContainer.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    if (target.closest(`.${NOTTY_CROSS_ICON_CLASS}`)) {
      const toast = target.closest(`.${NOTTY_TOAST_CLASS}`) as HTMLElement;
      if (toast) {
        toast.style.animationPlayState = "running";
        function remove() {
          if (toast.style.animationPlayState !== "paused") {
            toast.classList.add(`${NOTTY_ANIMATE_FADE_OUT_CLASS}__LEFT`);
            setTimeout(() => {
              toast.remove();
            }, 500);
          }
        }

        remove();
      }
    }
  });
}
