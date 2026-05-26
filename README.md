# [Mailosaur - Create](https://mailosaur.com/) &middot; [![](https://github.com/mailosaur/create-mailosaur/workflows/CI/badge.svg)](https://github.com/mailosaur/create-mailosaur/actions)

Mailosaur lets you automate email and SMS tests as part of software development and QA.

This tool scaffolds a ready-to-run test project that uses Mailosaur. Pick a framework and language, optionally supply your API key, and you get example tests for password reset, email/SMS one-time passwords, and authenticator-app workflows. The example tests are sourced from the [`mailosaur/examples`](https://github.com/mailosaur/examples) repo.

## Quick start

Run the command and follow the prompts:

```sh
npm create mailosaur@latest
```

Or, if you prefer **npx** or **yarn**:

```sh
npx create-mailosaur
```

```sh
yarn create mailosaur
```

## Supported frameworks and languages

| Framework | Languages |
|---|---|
| Cypress | Node.js |
| Playwright | Node.js, .NET |
| Robot Framework | Python |
| Selenium | .NET, Java, Python, Ruby |
| WebdriverIO | Node.js |
| Other (no framework) | Node.js, .NET, Java, Python, PHP, Ruby, Go |

## Prerequisites

- **Node.js 18 or later** — required to run the `create-mailosaur` wizard itself.
- A **[Mailosaur account](https://mailosaur.com/app/signup)** — a free trial works.
- The language tooling for your chosen target (e.g. Python + pip for Python projects, Ruby for Ruby projects, etc.). The wizard checks for these and exits early with a helpful message if anything is missing.

## Development

If you'd like to contribute to this initializer, here is how to set it up locally.

Install all development dependencies:

```sh
npm i
```

The build step clones the [`examples`](https://github.com/mailosaur/examples) repo into `src/examples` so the scaffolder can copy from it:

```sh
npm run build
```

Lint and format:

```sh
npm run lint
npm run format
```

## Contacting us

You can get us at [support@mailosaur.com](mailto:support@mailosaur.com)
