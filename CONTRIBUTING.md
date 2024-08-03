# Contributing to Notty Toast Library

Thank you for considering contributing to Notty! Here are some guidelines to help you get started.


# Before Creating a PR:
1. Create a branch with `git checkout -b branch-name` with the name of an issue or feature that you are working on
2. Add all your changes with `git add .`
3. Commit all your changes with a clear description of what you changed with the command `git commit -m "your description"`
4. Push all your changes to your fork with `git push`
6. Run Tests: Execute ``` npx cypress run ``` to run all tests. Ensure that all tests pass before proceeding.
7. TypeScript Imports: When importing modules in TypeScript, include the .js extension, like so:
```
import { someFunction } from "./index.js";

```
6. At last also exeute ``` npx prettier . --check ``` to keep the code clean.
7. Create your PR!
   
This ensures proper module resolution in the final JavaScript output.
Following these steps will help maintain code quality and consistency.


## How to Report Bugs

1. Search the [issues](https://github.com/your-username/notty-toast-library/issues) to see if the bug has already been reported.
2. If the bug has not been reported, open a new issue and include:
   - A clear and descriptive title.
   - Steps to reproduce the issue.
   - Expected and actual results.
   - Any relevant code or screenshots.

## How to Request Features

1. Search the [issues](https://github.com/your-username/notty-toast-library/issues) to see if the feature has already been requested.
2. If the feature has not been requested, open a new issue and include:
   - A clear and descriptive title.
   - A detailed description of the feature.
   - Any relevant examples or use cases.

## How to Submit Changes

1. Fork the repository and create a new branch for your changes.
2. Make your changes and commit them with descriptive messages.
3. Push your changes to your forked repository.
4. Open a pull request and include:
   - A clear and descriptive title.
   - A detailed description of the changes.
   - Any relevant issues or pull requests.

## Code Style

- Follow the existing code style and conventions.
- Ensure your code is properly formatted and linted.

Thank you for your contributions!
