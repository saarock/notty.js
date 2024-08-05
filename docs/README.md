# Toast Interface

The `Toast` interface defines the properties that can be used to configure a toast notification in the `notty` JavaScript library.

## Properties

- **message**: _(Optional)_ `string`  
  The message content of the toast notification.

- **timeOut**: _(Optional)_ `number`  
  The duration in milliseconds for which the toast notification will be displayed.

- **nottyClass**: _(Optional)_ `number`  
  Custom styling or behavior for the toast.

- **icons**: _(Optional)_ `string`  
  The icon to display within the toast notification.

- **position**: _(Optional)_ `"left" | "right" | "middle"`  
  Specifies the position on the screen where the toast notification will appear. It can be either `"left"` or `"right" or "middle`.

- **comeFrom**: _(Optional)_ `"LEFT" | "RIGHT" | "TOP" | "BOTTOM"`  
  Specifies the direction from which the toast notification will animate into view. It can be either `"LEFT"` or `"RIGHT"`.

- **toatsClassName**: _(Optional)_ `string`  
  A custom CSS class name for styling the toast container.

- **toastIconClassName**: _(Optional)_ `string`  
  A custom CSS class name for styling the toast icon.

- **toastMessageClassName**: _(Optional)_ `string`  
  A custom CSS class name for styling the toast message.

- **leaveFrom**: _(Optional)_ `"LEFT" | "RIGHT" | "TOP" | "BOTTOM"`
  desides toast will remove from the left or right.

- **gotTo**: _(Optional)_ `string` (Currently not-available)
  A URL to navigate to when the toast notification is clicked.

- **RemoveIconClassName**: _(Optional)_ `string`  
  A custom CSS class name for styling the remove icon of the toast.

## Example Usage

```typescript
import { Toast } from "notty";

// Example toast configuration
const toastConfig: Toast = {
  message: "Hello, world!",
  timeOut: 3000,
  icons: "bell-icon",
  position: "right",
  comeFrom: "LEFT",
  leaveFrom: "LEFT",
  toatsClassName: "custom-toast",
  toastIconClassName: "custom-icon",
  toastMessageClassName: "custom-message",
  gotTo: "https://example.com",
  RemoveIconClassName: "remove-icon",
};

// Display the toast using notty.showToast(toastConfig);
notty.showToast(toastConfig);
```
