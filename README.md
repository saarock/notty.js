# Notty Toast Library

Notty Toast Library is a JavaScript library for displaying beautiful toast notifications. This guide provides instructions for both pure JavaScript developers and WordPress developers to integrate and use the library.

## Table of Contents

1. [Installation](#installation)
   - [Pure JavaScript](#pure-javascript)
   - [WordPress](#wordpress)
2. [Usage](#usage)
   - [Pure JavaScript](#pure-javascript-usage)
   - [WordPress](#wordpress-usage)
3. [Demo HTML](#demo-html)
4. [Example Integration](#example-integration)
   - [Pure JavaScript](#pure-javascript-example)
   - [WordPress](#wordpress-example)
5. [Features](#features)
6. [License](#license)

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

### Pure JavaScript Usage

1. **Include the Required Files** in your HTML file:

    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Notty Toast Library Demo</title>
        <link rel="stylesheet" href="./src/styles/notty.css" />
    </head>
    <body>
        <!-- Your HTML content here -->
        <div id="notty__container"></div>

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
        position: "LEFT",
        comeFrom: "BOTTOM",
      });
    </script>
    ```

### WordPress Usage

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
    <body>
    <div class="container">
        <h1>Notty Toast Library Playground</h1>
        <div>
            <form id="toastForm">
                <div>
                    <label for="message">Message</label>
                    <input type="text" id="message" placeholder="Enter toast message">
                </div>
                <div>
                    <label for="timeOut">Timeout (ms)</label>
                    <input type="number" id="timeOut" placeholder="Enter timeout">
                </div>
                <div>
                    <label for="position">Position</label>
                    <select id="position">
                        <option value="LEFT">LEFT</option>
                        <option value="RIGHT">RIGHT</option>
                    </select>
                </div>
                <div>
                    <label for="comeFrom">Come From</label>
                    <select id="comeFrom">
                        <option value="LEFT">LEFT</option>
                        <option value="RIGHT">RIGHT</option>
                    </select>
                </div>
                <div>
                    <button type="button" id="successBtn">Success</button>
                    <button type="button" id="loadingBtn">Loading</button>
                    <button type="button" id="errorBtn">Error</button>
                </div>
            </form>
        </div>
        <div id="notty__container"></div>
        <?php wp_footer(); ?>
    </body>
    </html>
    ```

3. **Initialize and Use the Library**:

    Add the following script to initialize and use the Notty Toast Library in your template file or custom shortcode.

    ```html
    <script type="module">
      import { notty } from "<?php echo get_template_directory_uri(); ?>/path-to-your/dist/index.js";

      const btnSuccess = document.querySelector('#successBtn');
      const btnLoading = document.querySelector('#loadingBtn');
      const btnError = document.querySelector('#errorBtn');
      const messageInput = document.querySelector('#message');
      const timeOutInput = document.querySelector('#timeOut');
      const positionSelect = document.querySelector('#position');
      const comeFromSelect = document.querySelector('#comeFrom');

      btnSuccess.addEventListener("click", () => {
        notty.success({
          message: messageInput.value || "Success Message",
          position: positionSelect.value,
          comeFrom: comeFromSelect.value,
          timeOut: parseInt(timeOutInput.value) || 5000,
        });
      });

      btnLoading.addEventListener("click", () => {
        notty.loading({
          message: messageInput.value || "Loading Message",
          comeFrom: comeFromSelect.value,
        });
      });

      btnError.addEventListener("click", () => {
        notty.error({
          message: messageInput.value || "Error Message",
        });
      });
    </script>
    ```

## Features

- **Customizable Notifications**: Tailor the appearance and behavior of toast notifications with options for position, animation, timeout, and more.
- **Multiple Notification Types**: Display success, error, and loading notifications with predefined styles.
- **Easy Integration**: Simple steps to integrate with both pure JavaScript and WordPress environments.

## License

This library is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.
