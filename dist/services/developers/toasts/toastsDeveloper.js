var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { NOTTY_CROSS_ICON_CLASS_NAME, NOTTY_ANIMATE_FADE_IN_CLASS, NOTTY_CONTAINER_CLASS_NAME, NOTTY_CONTAINER_LEFT_CHILD__CLASS_NAME, NOTTY_CONTAINER_MIDDLE_CHILD__CLASS_NAME, NOTTY_CONTAINER_RIGHT_CHILD__CLASS_NAME, NOTTY_TOAST_CLASS, NOTTY_MESSAGE_CLASS_NAME, NOTTY_ICON_CLASS_NAME, } from "../../../constant.js";
import useAddEventListenerOnTheCutIcon from "../../../hooks/useAddEventListenerOnTheCutIcon.js";
import useRemoveTost from "../../../hooks/useRemoveToast.js";
import { Queue } from "../../../models/Queue.js";
import { time } from "../../../utils/index.js";
class ToastsDeveloper {
    constructor() {
        this.toasts = [];
        this.intervals = new Map();
        this.queue = new Queue(2);
        this.nottyContainer = document.createElement("div");
        this.nottyContainer.classList.add(`${NOTTY_CONTAINER_CLASS_NAME}`);
        this.nottyLeftChild = document.createElement("div");
        this.nottyLeftChild.classList.add(`${NOTTY_CONTAINER_LEFT_CHILD__CLASS_NAME}`, `notty__child_parent`);
        this.nottyMiddleChild = document.createElement("div");
        this.nottyMiddleChild.classList.add(`${NOTTY_CONTAINER_MIDDLE_CHILD__CLASS_NAME}`, `notty__child_parent`);
        this.nottyRightChild = document.createElement("div");
        this.nottyRightChild.classList.add(`${NOTTY_CONTAINER_RIGHT_CHILD__CLASS_NAME}`, `notty__child_parent`);
        this.nottyContainer.appendChild(this.nottyLeftChild);
        this.nottyContainer.appendChild(this.nottyMiddleChild);
        this.nottyContainer.appendChild(this.nottyRightChild);
        document.body.appendChild(this.nottyContainer);
        this.initializeEventForToastRemovalByClick();
    }
    addToastToQueue(toast, type) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.queue.enqueue(toast);
            yield this.showToastFromQueue(type);
        });
    }
    showToastFromQueue(type) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let toast = yield this.queue.dequeue();
                while (toast) {
                    const toastBox = document.createElement("div");
                    toastBox.classList.add(`notty__${type}__toast`, `${NOTTY_ANIMATE_FADE_IN_CLASS}__${toast.comeFrom || "LEFT"}`, `${toast.toastClassName}`, `${NOTTY_TOAST_CLASS}`);
                    toastBox.innerHTML = `
        <span class="${NOTTY_ICON_CLASS_NAME} ${toast.toastIconClassName ? toast.toastIconClassName : ""}">${yield this.getIcon(type)} </span>
        <div class="notty__${type}__message notty__message ${toast.toastMessageClassName ? toast.toastMessageClassName : ""} ${NOTTY_MESSAGE_CLASS_NAME}">${toast.message || "Give me something to show please."}</div>
        <div class="${NOTTY_CROSS_ICON_CLASS_NAME} ${toast.RemoveIconClassName ? toast.RemoveIconClassName : ""}"><i class="fas fa-times close-icon"></i></div>

        `;
                    if (toast.goTo) {
                        this.addEventListenerOnToastMessage(toastBox, toast.goTo);
                    }
                    const timeOutDelay = (toast === null || toast === void 0 ? void 0 : toast.timeOut) ? toast.timeOut : 5000;
                    const startTime = Date.now();
                    toastBox.addEventListener("mouseenter", (e) => {
                        toastBox.style.animationPlayState = "paused";
                        if (this.intervals.has(toastBox)) {
                            const updatedTimer = this.intervals.get(toastBox);
                            if (updatedTimer) {
                                updatedTimer.timeOutDelay = time.getRemainingTime(updatedTimer.startTime, updatedTimer.timeOutDelay);
                            }
                        }
                    });
                    toastBox.addEventListener("mouseleave", () => __awaiter(this, void 0, void 0, function* () {
                        toastBox.style.animationPlayState = "running";
                        if (this.intervals.has(toastBox)) {
                            const newTimer = this.intervals.get(toastBox);
                            if (newTimer) {
                                this.removeToast(newTimer.toast, toastBox, newTimer.timeOutDelay);
                            }
                        }
                    }));
                    const timer = {
                        startTime,
                        timeOutDelay,
                        toast,
                    };
                    this.intervals.set(toastBox, timer);
                    if (toast.position == "left") {
                        this.nottyLeftChild.appendChild(toastBox);
                    }
                    else if (toast.position === "right") {
                        this.nottyRightChild.appendChild(toastBox);
                    }
                    else if (toast.position === "middle") {
                        this.nottyMiddleChild.appendChild(toastBox);
                    }
                    else {
                        this.nottyRightChild.appendChild(toastBox);
                    }
                    this.removeToast(toast, toastBox, timeOutDelay);
                    toast = yield this.queue.dequeue();
                    this.toasts.push(toastBox);
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error("failed to load the notty-toast: " + error.message);
                }
            }
        });
    }
    removeToast(toast, toastBox, timer) {
        return __awaiter(this, void 0, void 0, function* () {
            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                if (toastBox.style.animationPlayState !== "paused") {
                    yield useRemoveTost(toast, toastBox);
                }
            }), timer);
        });
    }
    getIcon(type) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (type) {
                case "success":
                    return "<i class='fas fa-check-circle success-icon'></i>";
                case "error":
                    return "<i class='fas fa-exclamation-circle error-icon'></i>";
                case "loading":
                    return "<i class='fas fa-spinner fa-spin loading-icon'></i>";
                case "warning":
                    return "<i class='fas fa-exclamation-triangle warning-icon'></i>";
                default:
                    throw new Error("Something went wrong with the toast types definition between line 85 to 95. The specified type is not defined.");
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
    addEventListenerOnToastMessage(toastBox, slug) {
        const childDiv = toastBox.children[1];
        childDiv.style.cursor = "pointer";
        childDiv.addEventListener("click", () => {
            window.location.assign(slug);
        });
    }
}
const toastsDeveloper = new ToastsDeveloper();
export { toastsDeveloper };
//# sourceMappingURL=toastsDeveloper.js.map