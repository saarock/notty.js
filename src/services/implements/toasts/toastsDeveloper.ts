import {
  NOTTY_CROSS_iCON_CLASS_NAME,
  NOTTY_ANIMATE_FADE_IN_CLASS,
  NOTTY_CONTAINER_CLASS_NAME,
  NOTTY_CONTAINER_LEFT_CHILD__CLASS_NAME,
  NOTTY_CONTAINER_MIDDLE_CHILD__CLASS_NAME,
  NOTTY_CONTAINER_RIGHT_CHILD__CLASS_NAME,
  NOTTY_TOAST_CLASS,
  NOTTY_MESSAGE_CLASS_NAME,
  NOTTY_ICON_CLASS_NAME,
} from "../../../constant.js";
import useAddEventListenerOnTheCutIcon from "../../../hooks/useAddEventListenerOnTheCutIcon.js";

// import useAddEventListenerOnTheCutIcon from "../../../hooks/useAddEventListenerOnTheCutIcon.js";
import useRemoveTost from "../../../hooks/useRemoveToast.js";
import { Queue } from "../../../models/Queue.js";
import { Timer, Toast } from "../../../types/index.js";
import { time } from "../../../utils/index.js";


/**
 * Notification manager class where all the login are written
 */
class ToastsDeveloper {
  private toasts: HTMLDivElement[] = [];
  private queue: Queue<Toast>;
  private intervals: Map<HTMLDivElement, Timer> = new Map<
    HTMLDivElement,
    Timer
  >();
  private readonly nottyContainer: HTMLDivElement;
  private readonly nottyLeftChild: HTMLDivElement;
  private readonly nottyMiddleChild: HTMLDivElement;
  private readonly nottyRightChild: HTMLDivElement;
  constructor() {
    this.queue = new Queue<Toast>(2);
    this.nottyContainer = document.createElement("div") as HTMLDivElement;
    this.nottyContainer.classList.add(`${NOTTY_CONTAINER_CLASS_NAME}`, `notty__child_parent`);

    this.nottyLeftChild = document.createElement("div") as HTMLDivElement;
    this.nottyLeftChild.classList.add(`${NOTTY_CONTAINER_LEFT_CHILD__CLASS_NAME}`, `notty__child_parent`);

    this.nottyMiddleChild = document.createElement("div") as HTMLDivElement;
    this.nottyMiddleChild.classList.add(`${NOTTY_CONTAINER_MIDDLE_CHILD__CLASS_NAME}`, `notty__child_parent`);

    this.nottyRightChild = document.createElement("div") as HTMLDivElement;;
    this.nottyRightChild.classList.add(`${NOTTY_CONTAINER_RIGHT_CHILD__CLASS_NAME}`, `notty__child_parent`);

    this.nottyContainer.appendChild(this.nottyLeftChild);
    this.nottyContainer.appendChild(this.nottyMiddleChild);
    this.nottyContainer.appendChild(this.nottyRightChild);
    document.body.appendChild(this.nottyContainer);

    this.initializeEventForToastRemovalByClick();
  }

  /**
   *
   * @param toast
   * @param type
   * @note Adding toast one by one in the queue;
   */
  async addToastToQueue(toast: Toast, type: string): Promise<void> {
    await this.queue.enqueue(toast);
    await this.showToastFromQueue(type);
  }

  /**
   *
   * @param toastMessage
   * @param type
   * @note Showing all the toast one by one by getting from the queue (FIFO)
   */
  async showToastFromQueue(type: string): Promise<void> {
    try {
      let toast: Toast | null = await this.queue.dequeue();
      while (toast) {


        const toastBox = document.createElement("div");
        toastBox.classList.add(
          `notty__${type}__toast`,
          `${NOTTY_ANIMATE_FADE_IN_CLASS}__${toast.comeFrom || "LEFT"}`,
          `${toast.toastClassName}`,
          `${NOTTY_TOAST_CLASS}`,
        );

     
        toastBox.innerHTML = `
        <span class="${NOTTY_ICON_CLASS_NAME}">${await this.getIcon(type)} </span>
        <div class="notty__${type}__message notty__message ${toast.toastMessageClassName? toast.toastMessageClassName : ""} ${NOTTY_MESSAGE_CLASS_NAME}">${toast.message}</div>
        <div class="${NOTTY_CROSS_iCON_CLASS_NAME}"><i class="fas fa-times close-icon"></i></div>

        `;

        // Toast timer
        const timeOutDelay = toast?.timeOut ? toast.timeOut : 5000;
        const startTime = Date.now();

        /**
         * stop toast timer after hover to the toast
         */
        toastBox.addEventListener("mouseenter", (e) => {
          toastBox.style.animationPlayState = "paused";
          if (this.intervals.has(toastBox)) {
            const updatedTimer: Timer | undefined =
              this.intervals.get(toastBox);
            if (updatedTimer) {
              updatedTimer.timeOutDelay = time.getRemainingTime(
                updatedTimer.startTime,
                updatedTimer.timeOutDelay,
              );
            }
          }
        });

        /**
         * start toast timer after leave the toast
         */
        toastBox.addEventListener("mouseleave", async () => {
          toastBox.style.animationPlayState = "running";
          if (this.intervals.has(toastBox)) {
            const newTimer: Timer | undefined = this.intervals.get(toastBox);
            if (newTimer) {
              this.removeToast(newTimer.toast, toastBox, newTimer.timeOutDelay);
            }
          }
        });

        const timer: Timer = {
          startTime,
          timeOutDelay,
          toast,
        };

        this.intervals.set(toastBox, timer);
        if (toast.position == "left") {
          this.nottyLeftChild.appendChild(toastBox)
        } else if (toast.position === "right") {
          this.nottyRightChild.appendChild(toastBox)
        } else {
          this.nottyMiddleChild.appendChild(toastBox)
        }

        /**
         * remove toast after certain timer
         */


        this.removeToast(toast, toastBox, timeOutDelay);
        toast = await this.queue.dequeue();
        this.toasts.push(toastBox);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("failed to load the notty-toast: " + error.message);
      }
    }
  }

  /**
   *
   * @param toastBox
   * @note Remove the toast with the help of the hooks;
   */
  private async removeToast(
    toast: Toast,
    toastBox: HTMLDivElement,
    timer: number,
  ) {
    setTimeout(async () => {
      if (toastBox.style.animationPlayState !== "paused") {
        await useRemoveTost(toast, toastBox);
      }
    }, timer);
  }


  private async getIcon(type: string):Promise<string> {
    switch (type) {
      case "success":
        return "<i class='fas fa-check-circle success-icon''></i>";
      case "error":
        return " <i class='fas fa-exclamation-circle error-icon'></i>"
      case "loading":
        return "  <i class='fas fa-spinner fa-spin loading-icon'></i>"
      default: 
         throw new Error("Something wrong with the gogo at line number 85 to 95 toast types are not define");
    }


  
  }


  private async initializeEventForToastRemovalByClick(): Promise<void> {
    try {
      await useAddEventListenerOnTheCutIcon();
    } catch (error) {
      if (error instanceof Error) {
        console.error("notty container error: " + error.message);
      }
    }
  }
}

const toastsDeveloper = new ToastsDeveloper();
export { toastsDeveloper };
