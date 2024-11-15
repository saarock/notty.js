import {
  NOTTY_ANIMATE_FADE_OUT_CLASS,
  NOTTY_CONTAINER_CLASS_NAME,
  NOTTY_CROSS_ICON_CLASS_NAME,
  NOTTY_TOAST_CLASS,
} from "../constant.js";

export default async function useAddEventListenerOnTheCutIcon(): Promise<void> {
  try {
    const nottyContainer = document.querySelector(
      `.${NOTTY_CONTAINER_CLASS_NAME}`,
    );
    if (nottyContainer === undefined || nottyContainer == null)
      throw new Error("notty__container required");

    nottyContainer.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      if (target.closest(`.${NOTTY_CROSS_ICON_CLASS_NAME}`)) {
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
  } catch (error) {
    throw error;
  }
}
