# Dependor - GitHub Action for Dependency Updates

**Dependor** is a GitHub Action that automates the process of updating project dependencies, creating a new branch, and submitting a pull request. It uses `npm-check-updates` to ensure all project dependencies are up to date.

## Features

- Automatically updates project dependencies using Yarn and `npm-check-updates`
- Creates a new branch for the dependency update
- Commits the changes and pushes the branch to the remote repository
- Opens a pull request for easy review and integration

## Usage

To use **Dependor** in your GitHub repository, add the following workflow configuration:

```yaml
name: Dependency Update

on:
  schedule:
    - cron: '0 8 * * 1' # Runs every Monday at 10 AM EET (8 AM UTC)
  workflow_dispatch: # Allows for manual triggering

jobs:
  update-dependencies:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v2

      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '20'

      - name: Install Dependencies
        run: yarn install

      - name: Use Dependency Update Action
        uses: 13ANM/dependor@v1
        with:
          repo-token: ${{ secrets.GITHUB_TOKEN }}
        env:
          BASE_BRANCH: master # Default: main
```

### Inputs

- **repo-token**: The GitHub token used to create pull requests. This is required for pushing branches and creating pull requests.

### Environment Variables

- **BASE_BRANCH**: The name of the base branch to use for the pull request. Defaults to `'main'`, but can be set to `'master'` or any other branch as required.

## Requirements

- Node.js (uses Yarn for dependency installation)
- Permissions to create branches and pull requests on the target repository

## License

This project is licensed under the MIT License.

## Author

**Andrei Mocanu**
