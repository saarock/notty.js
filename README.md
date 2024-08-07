# Notty Toast Library

Notty Toast Library is a JavaScript library for displaying beautiful toast notifications. This guide provides instructions for both pure JavaScript developers and WordPress developers to integrate and use the library.

## Important Notice

**For optimal performance, we highly recommend using `async/await` when working with the Notty library.**

Using `async/await` can significantly improve performance by allowing for non-blocking operations, which is crucial for applications that rely on asynchronous tasks.

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [Demo HTML](#demo-html)
4. [Example Integration](#example-integration)
   - [Pure JavaScript](#pure-javascript)
   - [WordPress](#wordpress)
   - [CDN Link](#CDN)
5. [License](#license)

## Installation

### Pure JavaScript

1. **Download the Library**: Clone or download the Notty Toast Library from the [GitHub repository](https://github.com/saarock/notty).
2. **Include the Required Files**:
   - Copy the `dist` directory (containing `index.js`) and `src/styles/notty.css` to your project directory.

### WordPress

1. **Download the Library**: Clone or download the Notty Toast Library from the [GitHub repository](https://github.com/saarock/notty).
2. **Include the Required Files**:
   - Copy the `dist` directory (containing `index.js`) and `src/styles/notty.css` to your WordPress theme or plugin directory.

## Usage

### Pure JavaScript

1. **Include the Required Files** in your HTML file:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Notty Toast Library Demo</title>
    <link rel="stylesheet" href="./src/styles/notty.css" />
  </head>
  <body class="bg-gray-900 text-white">
    <!-- Include Notty Toast Library JS -->
    <script type="module" src="./dist/index.js"></script>
  </body>
</html>
```

2. **Initialize and Use the Library**:

   ```html
   <script type="module">
     import { notty } from "./dist/index.js";

     // Example usage
     notty.success({
       message: "This is a success message",
       timeOut: 5000,
       position: "right",
       comeFrom: "LEFT",
       leaveFrom: "RIGHT",
     });
   </script>
   ```

### WordPress

1. **Enqueue Scripts and Styles**:

   Add the following code to your `functions.php` file or equivalent in your theme or plugin to enqueue the required CSS and JS files.

   ```php
   function enqueue_notty_toast_assets() {

       // Enqueue Notty Toast Library CSS
       wp_enqueue_style('notty-toast-css', get_template_directory_uri() . '/path-to-your/notty.css');

       // Enqueue Notty Toast Library JS
       wp_enqueue_script('notty-toast-js', get_template_directory_uri() . '/path-to-your/dist/index.js', array(), false, true);

   }
   add_action('wp_enqueue_scripts', 'enqueue_notty_toast_assets');
   ```

2. **Add the HTML Structure**:

   Add the following HTML structure to your WordPress template file or create a custom shortcode to render it.

   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <title>Notty Toast Library Demo</title>
       <?php wp_head(); ?>
   </head>
   <body class="bg-gray-900 text-white">
   <div class="container mx-auto p-4">
       <h1 class="text-3xl font-bold text-center mb-4">Notty Toast Library Playground</h1>
       <div class="bg-gray-800 p-4 rounded-md mb-4">
           <form id="toastForm" class="space-y-4">
               <div>
                   <label for="message" class="block text-sm font-medium text-gray-300">Message</label>
                   <input type="text" id="message" class="mt-1 block w-full bg-gray-700 border border-gray-600 text-white py-2 px-3 rounded" placeholder="Enter toast message">
               </div>
               <div>
                   <label for="timeOut" class="block text-sm font-medium text-gray-300">Timeout (ms)</label>
                   <input type="number" id="timeOut" class="mt-1 block w-full bg-gray-700 border border-gray-600 text-white py-2 px-3 rounded" placeholder="Enter timeout">
               </div>
               <div>
                   <label for="position" class="block text-sm font-medium text-gray-300">Position</label>
                   <select id="position" class="mt-1 block w-full bg-gray-700 border border-gray-600 text-white py-2 px-3 rounded">
                       <option value="LEFT">LEFT</option>
                       <option value="RIGHT">RIGHT</option>
                   </select>
               </div>
               <div>
                   <label for="comeFrom" class="block text-sm font-medium text-gray-300">Come From</label>
                   <select id="comeFrom" class="mt-1 block w-full bg-gray-700 border border-gray-600 text-white py-2 px-3 rounded">
                       <option value="LEFT">LEFT</option>
                       <option value="RIGHT">RIGHT</option>
                   </select>
               </div>
                <div>
                  <label for="leaveFrom" class="block text-sm font-medium text-gray-300">Leave From</label>
                   <select id="leaveFrom" class="mt-1 block w-full bg-gray-700 border border-gray-600 text-white py-2 px-3 rounded">
                    <option value="LEFT">LEFT</option>
                    <option value="RIGHT">RIGHT</option>
                  </select>
               </div>
               <div class="flex space-x-4">
                   <button type="button" id="successBtn" class="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded focus:outline-none">Success</button>
                   <button type="button" id="loadingBtn" class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none">Loading</button>
                   <button type="button" id="warningBtn" class="bg-yellow-700 hover:bg-yellow-600 text-white py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-
                    md">Warning</button>
                   <button type="button" id="errorBtn" class="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded focus:outline-none">Error</button>
               </div>
           </form>
       </div>
       <?php wp_footer(); ?>
   </body>
   </html>

   ```

3. **Initialize and Use the Library**:

   Add the following script to initialize and use the Notty Toast Library in your template file or custom shortcode.

```html
<script type="module">
  import { notty } from "<?php echo get_template_directory_uri(); ?>/path-to-your/dist/index.js";

  const btnSuccess = document.querySelector("#successBtn");
  const btnLoading = document.querySelector("#loadingBtn");
  const warningBtn = document.querySelector("#warningBtn");
  const btnError = document.querySelector("#errorBtn");
  const messageInput = document.querySelector("#message");
  const timeOutInput = document.querySelector("#timeOut");
  const positionSelect = document.querySelector("#position");
  const comeFromSelect = document.querySelector("#comeFrom");
  const leaveFromSelect = document.querySelector("#leaveFrom");

  btnSuccess.addEventListener("click", async () => {
    await notty.success({
      message: messageInput.value || "Success Message",
      comeFrom: comeFromSelect.value,
      leaveFrom: leaveFromSelect.value,
      position: positionSelect.value,
      timeOut: parseInt(timeOutInput.value) || 5000,
    });
  });

  btnLoading.addEventListener("click", async () => {
    await notty.loading({
      message: messageInput.value || "Loading Message",
      comeFrom: comeFromSelect.value,
      leaveFrom: leaveFromSelect.value,
      position: positionSelect.value,
      timeOut: parseInt(timeOutInput.value) || 5000,
    });
  });

  warningBtn.addEventListener("click", async () => {
   await notty.warning({
      message: messageInput.value || "Warning Message",
      position: positionSelect.value,
      comeFrom: comeFromSelect.value,
      leaveFrom: leaveFromSelect.value,
      timeOut: parseInt(timeOutInput.value) || 5000,
    });
  });

  btnError.addEventListener("click", async () => {
    await notty.error({
      message: messageInput.value || "Error Message",
      comeFrom: comeFromSelect.value,
      leaveFrom: leaveFromSelect.value,
      position: positionSelect.value,
      timeOut: parseInt(timeOutInput.value) || 5000,
    });
  });
</script>
```

## CDN
For css 

```html

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/saarock/notty.js@main/src/styles/notty.css">
```
For notty libary js
```html

    <script type="module">
        import { notty } from "https://cdn.jsdelivr.net/gh/saarock/notty.js@main/dist/index.js";

        document.getElementById('notifyButton').addEventListener('click', async () => {
            await notty.success({
                position: "right",
                message: "welcome",
                comeFrom: "BOTTOM"
            });
        });

    </script>
```

## License

This library is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.
