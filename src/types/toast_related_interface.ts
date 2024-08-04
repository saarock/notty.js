import { Toast } from "./syntax.js";

export interface ToastsManagerOptions {
  success: (toast: Toast, type: string) => {};
  error: (toast: Toast, type: string) => {};
  loading: (toast: Toast, type: string) => {};
}
