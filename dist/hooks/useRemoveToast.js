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
  NOTTY_ANIMATE_FADE_IN_CLASS,
  NOTTY_ANIMATE_FADE_OUT_CLASS,
} from "../constant.js";
export default function useRemoveTost(toast, toastBox) {
  return __awaiter(this, void 0, void 0, function* () {
    function removeToast() {
      toastBox.remove();
    }
    function fadeOut() {
      toastBox.classList.remove(
        `${NOTTY_ANIMATE_FADE_IN_CLASS}__${toast.comeFrom || "LEFT"}`,
      );
      toastBox.classList.add(
        `${NOTTY_ANIMATE_FADE_OUT_CLASS}__${toast.leaveFrom || "LEFT"}`,
      );
      setTimeout(removeToast, 500);
    }
    if (toastBox.style.animationPlayState !== "paused") {
      fadeOut();
    }
  });
}
//# sourceMappingURL=useRemoveToast.js.map
