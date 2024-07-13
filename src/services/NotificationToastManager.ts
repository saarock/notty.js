import {nottyManager} from "./NotificationManager.js";
import {Toast} from "../types";

class NotificationToastManager {
    public async success(toast: Toast, type="success") {
        await nottyManager.addToastToQueue(toast, type);
    }

    public async error(toast: Toast, type="error") {
        await nottyManager.addToastToQueue(toast, type);
    }

    public async loading(toast: Toast, type="loading") {
        await nottyManager.addToastToQueue(toast, type);
    }

}


 const notty: NotificationToastManager = new NotificationToastManager();
export  {notty}