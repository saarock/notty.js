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
  NOTTY_CONTAINER_ID_NAME,
  NOTTY_CROSS_ICON_CLASS,
  NOTTY_TOAST_CLASS,
} from "../constant.js";
import useAddEventListenerOnTheCutIcon from "../hooks/useAddEventListenerOnTheCutIcon.js";
import useRemoveTost from "../hooks/useRemoveToast.js";
import { Queue } from "../models/Queue.js";
import { time } from "../utils/index.js";
class NotificationManager {
  constructor() {
    this.intervals = new Map();
    this.queue = new Queue(2);
    (() =>
      __awaiter(this, void 0, void 0, function* () {
        yield this.initializeEventForToastRemovalByClick();
      }))();
  }
  addToastToQueue(toast, type) {
    return __awaiter(this, void 0, void 0, function* () {
      yield this.queue.enqueue(toast);
      yield this.showToastFromQueue(toast, type);
    });
  }
  showToastFromQueue(toastMessage, type) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const nottyContainer = document.getElementById(NOTTY_CONTAINER_ID_NAME);
        if (!nottyContainer) throw new Error("NottyContainer not found");
        let toast = this.queue.dequeue();
        while (toast) {
          const toastBox = document.createElement("div");
          toastBox.classList.add(
            `notty__${type}__toast`,
            `${NOTTY_TOAST_CLASS}`,
            `${NOTTY_TOAST_CLASS}__${toast.position || "LEFT"}`,
            `${NOTTY_ANIMATE_FADE_IN_CLASS}__${toast.comeFrom || "LEFT"}`,
            `${toast.toatsClassName}`,
          );
          toastBox.innerHTML = `
         <div class="notty__${type}__icon ${toast.toastIconClassName}">
         </div>
        <div class="notty__${type}__message notty__message ${toast.toastMessageClassName}">${toast.message}</div>
       <div class="${NOTTY_CROSS_ICON_CLASS} ${toast.RemoveIconClassName}">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
       </div>
        `;
          const timeOutDelay = (
            toast === null || toast === void 0 ? void 0 : toast.timeOut
          )
            ? toast.timeOut
            : 5000;
          const startTime = Date.now();
          toastBox.addEventListener("mouseenter", (e) => {
            toastBox.style.animationPlayState = "paused";
            if (this.intervals.has(toastBox)) {
              const updatedTimer = this.intervals.get(toastBox);
              if (updatedTimer) {
                updatedTimer.timeOutDelay = time.getRemainingTime(
                  updatedTimer.startTime,
                  updatedTimer.timeOutDelay,
                );
              }
            }
          });
          toastBox.addEventListener("mouseleave", () =>
            __awaiter(this, void 0, void 0, function* () {
              toastBox.style.animationPlayState = "running";
              if (this.intervals.has(toastBox)) {
                const newTimer = this.intervals.get(toastBox);
                if (newTimer) {
                  this.removeToast(toastBox, newTimer.timeOutDelay);
                }
              }
            }),
          );
          const timer = {
            startTime,
            timeOutDelay,
          };
          this.intervals.set(toastBox, timer);
          nottyContainer.appendChild(toastBox);
          this.removeToast(toastBox, timeOutDelay);
          toast = this.queue.dequeue();
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error("failed to load the notty-toast: " + error.message);
        }
      }
    });
  }
  removeToast(toastBox, timer) {
    return __awaiter(this, void 0, void 0, function* () {
      setTimeout(
        () =>
          __awaiter(this, void 0, void 0, function* () {
            if (toastBox.style.animationPlayState !== "paused") {
              yield useRemoveTost(toastBox);
            }
          }),
        timer,
      );
    });
  }
  initializeEventForToastRemovalByClick() {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        yield useAddEventListenerOnTheCutIcon();
      } catch (error) {
        if (error instanceof Error) {
          console.error("notty container error: " + error.message);
        }
      }
    });
  }
}
const nottyManager = new NotificationManager();
export { nottyManager };
//# sourceMappingURL=NotificationManager.js.map
