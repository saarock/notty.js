var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { NOTTY_ANIMATE_FADE_IN_CLASS, NOTTY_CONTAINER_ID_NAME, NOTTY_CROSS_ICON_CLASS, NOTTY_TOAST_CLASS, } from "../constant.js";
import useAddEventListenerOnTheCutIcon from "../hooks/useAddEventListenerOnTheCutIcon.js";
import useRemoveTost from "../hooks/useRemoveToast.js";
import { Queue } from "../models/Queue.js";
class NotificationManager {
    constructor() {
        this.queue = new Queue(100);
        this.initializeEventForToastRemovalByClick();
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
                if (!nottyContainer)
                    throw new Error("NottyContainer not found");
                let toast = this.queue.dequeue();
                while (toast) {
                    const toastBox = document.createElement("div");
                    toastBox.classList.add(`notty__${type}__toast`, `${NOTTY_TOAST_CLASS}`, `${NOTTY_TOAST_CLASS}__${toast.position || "LEFT"}`, `${NOTTY_ANIMATE_FADE_IN_CLASS}__${toast.comeFrom || "LEFT"}`);
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
                    toastBox.addEventListener("mouseenter", (e) => {
                        toastBox.style.animationPlayState = "paused";
                    });
                    toastBox.addEventListener("mouseleave", () => {
                        toastBox.style.animationPlayState = "running";
                        setTimeout(() => {
                            this.removeToast(toastBox);
                        }, (toast === null || toast === void 0 ? void 0 : toast.timeOut) || 5000);
                    });
                    nottyContainer.appendChild(toastBox);
                    const nottyToastBorder = document.createElement("div");
                    nottyToastBorder.classList.add(`notty__toast__border`);
                    toastBox.appendChild(nottyToastBorder);
                    setTimeout(() => {
                        this.removeToast(toastBox);
                    }, (toast === null || toast === void 0 ? void 0 : toast.timeOut) || 5000);
                    toast = this.queue.dequeue();
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error("failed to load the notty-toast: " + error.message);
                }
            }
        });
    }
    removeToast(toastBox) {
        return __awaiter(this, void 0, void 0, function* () {
            if (toastBox.style.animationPlayState !== "paused") {
                yield useRemoveTost(toastBox);
            }
        });
    }
    initializeEventForToastRemovalByClick() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield useAddEventListenerOnTheCutIcon();
            }
            catch (error) {
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