import {
    NOTTY_ANIMATE_FADE_IN_CLASS,
    NOTTY_CONTAINER_ID_NAME,
    NOTTY_CROSS_ICON_CLASS,
    NOTTY_TOAST_CLASS,
} from "../constant.js";


import useAddEventListenerOnTheCutIcon from "../hooks/useAddEventListenerOnTheCutIcon.js";
import useRemoveTost from "../hooks/useRemoveToast.js";
import  {Queue} from "../models/Queue.js"
import { Timer, Toast } from "../types/index.js";
import { time } from "../utils/index.js";

/**
 * Notification manager class where all the login are written
 */
class NotificationManager {
  private queue: Queue<Toast>;
  private intervals : Map<HTMLDivElement, Timer> = new Map<HTMLDivElement, Timer>();

  constructor() {
    this.queue = new Queue<Toast>(2);
    (async () => {
      await this.initializeEventForToastRemovalByClick();
    })()
  }



  /**
   *
   * @param toast
   * @param type
   * @note Adding toast one by one in the queue;
   */
   async addToastToQueue(
    toast: Toast,
    type: string
  ): Promise<void> {
    await this.queue.enqueue(toast);
    await this.showToastFromQueue(toast, type);
  }

  /**
   *
   * @param toastMessage
   * @param type
   * @note Showing all the toast one by one by getting from the queue (FIFO)
   */
   async showToastFromQueue(
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


        // Toast timer
        const timeOutDelay = toast?.timeOut ? toast.timeOut : 5000;
        const startTime = Date.now();
     


        /**
         * stop toast timer after hover to the toast
         */
        toastBox.addEventListener("mouseenter", (e) => {
          toastBox.style.animationPlayState = "paused";
          if (this.intervals.has(toastBox)) {
              const updatedTimer : Timer | undefined  = this.intervals.get(toastBox);
              if (updatedTimer) {
                updatedTimer.timeOutDelay = time.getRemainingTime(updatedTimer.startTime, updatedTimer.timeOutDelay);
              } 
          }
        });

        /**
         * start toast timer after leave the toast
         */
        toastBox.addEventListener("mouseleave", async () => {
              toastBox.style.animationPlayState = "running";
              if(this.intervals.has(toastBox)) {
                  const newTimer : Timer | undefined  = this.intervals.get(toastBox);
                  if (newTimer) {

                   this.removeToast(toastBox, newTimer.timeOutDelay);
                  }
              }
        });

        const timer: Timer = {
            startTime, 
            timeOutDelay
        }

        this.intervals.set(toastBox, timer);
        nottyContainer.appendChild(toastBox);



        /**
         * remove toast after certain timer
         */

        this.removeToast(toastBox, timeOutDelay)

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
  private async removeToast(toastBox: HTMLDivElement, timer: number) {

      setTimeout(async () => {
      if (toastBox.style.animationPlayState !== "paused") {
       await useRemoveTost(toastBox);
      }
      }, timer)
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
