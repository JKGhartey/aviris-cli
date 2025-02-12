# Aviris CLI

A CLI tool for installing Aviris UI components - beautiful, accessible React components built with Tailwind CSS.

## Installation

```bash
# npm
npm install -g @aviris/cli

# yarn
yarn global add @aviris/cli

# pnpm
pnpm add -g @aviris/cli
```

## Usage

1. Initialize Aviris in your project:

```bash
aviris init
```

This will:

- Create the necessary directory structure
- Add required dependencies
- Set up utility functions

2. List available components:

```bash
aviris list
```

3. Add a component:

```bash
aviris add <component-name>
```

Example:

```bash
aviris add custom-button
```

### Options

When adding components:

- `-y, --yes`: Skip confirmation prompts
- `-o, --overwrite`: Overwrite existing files

## Available Components

### Custom Components

- CustomButton
- CodeBlock
- ComponentPreview
- FolderStructure
- SectionHeader
- ApiTable
- Toolbar
- InstallationSection

### Requirements

- Node.js 16 or later
- A React project using Tailwind CSS
- TypeScript (recommended)

## Documentation

For full documentation, visit [aviris.vercel.app](https://aviris.vercel.app)

## Contributing

1. Clone the repository
2. Install dependencies: `yarn install`
3. Build the CLI: `yarn build`
4. Link it locally: `yarn link`

## License

MIT © [Jerome Ghartey](https://github.com/jkghartey)
