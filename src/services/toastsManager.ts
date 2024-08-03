
import { toastsDeveloper } from "./implements/toasts/toastsDeveloper.js";
import { Toast, ToastsManagerOptions } from "../types/index.js";

class ToastsManager implements ToastsManagerOptions {
  public async success(toast: Toast, type = "success") {
    await toastsDeveloper.addToastToQueue(toast, type);
  }

  public async error(toast: Toast, type = "error") {
    await toastsDeveloper.addToastToQueue(toast, type);
  }

  public async loading(toast: Toast, type = "loading") {
    await toastsDeveloper.addToastToQueue(toast, type);
  }
}

const notty: ToastsManagerOptions = new ToastsManager();
export { notty };
