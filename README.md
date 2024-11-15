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

      - name: Use Dependency Update Action
        uses: 13ANM/dependor@v1
        with:
          repo-token: ${{ secrets.GITHUB_TOKEN }}
```

### Inputs

- **repo-token**: The GitHub token used to create pull requests. This is required for pushing branches and creating pull requests.

## Setup Instructions

1. Add **Dependor** to your repository by referencing it in your workflow file.
2. Ensure you have a valid GitHub token saved in your repository secrets (`GITHUB_TOKEN`).
3. Customize the schedule as needed (currently set to run every Monday at 10 AM EET).

## Example Workflow

The provided example workflow runs weekly to update dependencies. It performs the following steps:

1. Checks out the repository.
2. Uses the **Dependor** action to update dependencies.
3. Creates a new branch with the updated dependencies and opens a pull request.

## Requirements

- Node.js (uses Yarn for dependency installation)
- Permissions to create branches and pull requests on the target repository

## License

This project is licensed under the MIT License.

## Author

**Andrei Mocanu**
