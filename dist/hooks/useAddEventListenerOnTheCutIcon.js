var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
import {
  NOTTY_ANIMATE_FADE_OUT_CLASS,
  NOTTY_CONTAINER_CLASS_NAME,
  NOTTY_CROSS_iCON_CLASS_NAME,
  NOTTY_TOAST_CLASS,
} from "../constant.js";
export default function useAddEventListenerOnTheCutIcon() {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      const nottyContainer = document.querySelector(
        `.${NOTTY_CONTAINER_CLASS_NAME}`,
      );
      if (nottyContainer === undefined || nottyContainer == null)
        throw new Error("notty__container required");
      nottyContainer.addEventListener("click", (event) => {
        const target = event.target;
        if (target.closest(`.${NOTTY_CROSS_iCON_CLASS_NAME}`)) {
          const toast = target.closest(`.${NOTTY_TOAST_CLASS}`);
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
  });
}
//# sourceMappingURL=useAddEventListenerOnTheCutIcon.js.map
