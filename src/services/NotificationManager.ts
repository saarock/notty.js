import {
  NOTTY_ANIMATE_FADE_IN_CLASS,
  NOTTY_CONTAINER_ID_NAME,
  NOTTY_CROSS_ICON_CLASS,
  NOTTY_TOAST_CLASS,
} from "../constant.js";
import React from "react";

import useAddEventListenerOnTheCutIcon from "../hooks/useAddEventListenerOnTheCutIcon.js";
import useRemoveTost from "../hooks/useRemoveToast.js";
import { Queue } from "../models/Queue.js";
import { Toast } from "../types";

/**
 * Notification manager class where all the login are written
 */
class NotificationManager {
  private queue: Queue<Toast>;

  constructor() {
    this.queue = new Queue<Toast>(100);
    this.initializeEventForToastRemovalByClick();
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

        toastBox.addEventListener("mouseenter", (e) => {
          toastBox.style.animationPlayState = "paused";
        });

        toastBox.addEventListener("mouseleave", () => {
          toastBox.style.animationPlayState = "running";
          this.removeToast(toastBox);
        });

        nottyContainer.appendChild(toastBox);
        const nottyToastBorder = document.createElement("div");
        nottyToastBorder.classList.add(`notty__toast__border`);
        toastBox.appendChild(nottyToastBorder);
        setTimeout(() => {
          this.removeToast(toastBox);
        }, toast.timeOut || 5000)
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
  public async removeToast(toastBox: HTMLDivElement) {
    // setTimeout(async () => {
      if (toastBox.style.animationPlayState !== "paused") {
        await useRemoveTost(toastBox);
      }
    // }, 5000);
  }
  public async initializeEventForToastRemovalByClick(): Promise<void> {
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
