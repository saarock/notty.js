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
import { nottyManager } from "./NotificationManager.js";
class NotificationToastManager {
  success(toast_1) {
    return __awaiter(
      this,
      arguments,
      void 0,
      function* (toast, type = "success") {
        yield nottyManager.addToastToQueue(toast, type);
      },
    );
  }
  error(toast_1) {
    return __awaiter(
      this,
      arguments,
      void 0,
      function* (toast, type = "error") {
        yield nottyManager.addToastToQueue(toast, type);
      },
    );
  }
  loading(toast_1) {
    return __awaiter(
      this,
      arguments,
      void 0,
      function* (toast, type = "loading") {
        yield nottyManager.addToastToQueue(toast, type);
      },
    );
  }
}
const notty = new NotificationToastManager();
export { notty };
//# sourceMappingURL=NotificationToastManager.js.map
