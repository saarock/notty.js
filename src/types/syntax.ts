export interface Toast {
  message?: string;
  timeOut?: number;
  nottyClass?: number;
  icons?: string;
  position?: "LEFT" | "RIGHT";
  comeFrom?: "LEFT" | "RIGHT";
  toatsClassName?: string;
  toastIconClassName?: string;
  toastMessageClassName?: string;
  gotTo?: string;
  RemoveIconClassName?: string;
}
