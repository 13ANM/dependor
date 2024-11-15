const core = require('@actions/core')
const { exec } = require('child_process')
const { promisify } = require('util')
const execAsync = promisify(exec)
const { Octokit } = require('@octokit/rest')

const USER_EMAIL = 'actions@github.com'
const USER_NAME = 'GitHub Action'
const COMMIT_MESSAGE = 'chore: update dependencies'

const PULL_REQUEST_TITLE = `Dependency Update - ${
	new Date().toISOString().split('T')[0]
}`
const PULL_REQUEST_BODY =
	'This PR was created automatically to update the project dependencies.'

;(async () => {
	try {
		core.info('Starting dependency update process...')

		// Install npm-check-updates and update dependencies
		await execAsync(
			'yarn global add npm-check-updates && ncu -u && yarn install'
		)

		// Configure Git user identity
		await execAsync(
			`git config user.email "${USER_EMAIL}" && git config user.name "${USER_NAME}"`
		)

		// Create a new branch, commit changes, and push to remote
		const branchName = `dependency-update-${
			new Date().toISOString().split('T')[0]
		}`
		await execAsync(
			`git checkout -b ${branchName} && git add package.json yarn.lock && git commit -m "${COMMIT_MESSAGE}" && git push origin ${branchName}`
		)

		// Create a pull request
		const [owner, repoName] = process.env.GITHUB_REPOSITORY.split('/')
		const octokit = new Octokit({ auth: core.getInput('repo-token') })
		await octokit.pulls.create({
			owner,
			repo: repoName,
			title: PULL_REQUEST_TITLE,
			head: branchName,
			base: 'main',
			body: PULL_REQUEST_BODY,
		})

		core.info('Pull request created successfully.')
	} catch (error) {
		core.setFailed(`Dependency update failed: ${error.message}`)
	}
})()
