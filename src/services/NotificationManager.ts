import {
  NOTTY_ANIMATE_FADE_IN_CLASS,
  NOTTY_CONTAINER_ID_NAME,
  NOTTY_CROSS_ICON_CLASS,
  NOTTY_TOAST_CLASS,
} from "../constant.js";


import useAddEventListenerOnTheCutIcon from "../hooks/useAddEventListenerOnTheCutIcon.js";
import useRemoveTost from "../hooks/useRemoveToast.js";
import { Queue } from "../models/Queue.js";
import { Toast } from "../types";

/**
 * Notification manager class where all the login are written
 */
class NotificationManager {
  private queue: Queue<Toast>;
  private startTime = 0;
  private pausedTime = 0;
  private resumeTime: number = 0;


  constructor() {
    this.queue = new Queue<Toast>(100);
    (async () => {
      await this.initializeEventForToastRemovalByClick();
    })()
  }

  private async startRemoveToastTimer(toastBox: HTMLDivElement, timeOut: number): Promise<void> {
    const remainingTime: number = timeOut - this.pausedTime;

    setTimeout(() => {
      this.removeToast(toastBox)
    }, remainingTime);
  }




  /**
   *
   * @param toast
   * @param type
   * @note Adding toast one by one in the queue;
   */
  public async addToastToQueue(
    toast: Toast,
    type: string
  ): Promise<void> {
    await this.queue.enqueue(toast);
    await this.showToastFromQueue(toast, type);
  }

  /**
   *
   * @param type
   * @note Showing all the toast one by one by getting from the queue (FIFO)
   */
  public async showToastFromQueue(
    toastMessage: Toast,
    type: string,
  ): Promise<void> {
    try {
      const nottyContainer = document.getElementById(NOTTY_CONTAINER_ID_NAME);
      if (!nottyContainer) throw new Error("NottyContainer not found");
      let toast: Toast | null = this.queue.dequeue();
      while (toast) {
        const toastBox = document.createElement("div");
        toastBox.classList.add(
          `notty__${type}__toast`,
          `${NOTTY_TOAST_CLASS}`,
          `${NOTTY_TOAST_CLASS}__${toast.position || "LEFT"}`,
          `${NOTTY_ANIMATE_FADE_IN_CLASS}__${toast.comeFrom || "LEFT"}`
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

        type IntervalId = ReturnType<typeof setInterval>;
        let interval: IntervalId;
        toastBox.addEventListener("mouseenter", (e) => {
          this.pausedTime = 0;
          interval = setInterval(() => {
            this.pausedTime += 1000;
          }, 1000);
          toastBox.style.animationPlayState = "paused";
        });

        toastBox.addEventListener("mouseleave", async () => {
          toastBox.style.animationPlayState = "running";
          await this.startRemoveToastTimer(toastBox,toast?.timeOut ? toast.timeOut : 5000 );
        });

        nottyContainer.appendChild(toastBox);
        setTimeout(() => {
          this.removeToast(toastBox)
        }, toast?.timeOut ? toast.timeOut : 5000);
        toast = this.queue.dequeue();
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
  private async removeToast(toastBox: HTMLDivElement) {
      if (toastBox.style.animationPlayState !== "paused") {
       await useRemoveTost(toastBox);
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

const nottyManager = new NotificationManager();
export { nottyManager };
