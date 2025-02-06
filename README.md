# Aviris CLI

A command-line interface for installing and managing Aviris UI components.

## Installation

You can install the CLI globally using npm:

```bash
npm install -g aviris-cli
```

Or using yarn:

```bash
yarn global add aviris-cli
```

## Usage

### List Available Components

To see all available components:

```bash
aviris list
```

### Add a Component

To add a component to your project:

```bash
aviris add <component-name>
```

For example:

```bash
aviris add custom-button
```

This will:

1. Copy the component files to your project's `components/custom` directory
2. Display the required dependencies to install
3. Show any required base components from shadcn/ui

## Available Components

- **CustomButton**: A customized button component based on shadcn/ui Button
  - Dependencies: @radix-ui/react-slot, class-variance-authority, clsx, tailwind-merge
  - Required base components: Button

## Requirements

- Node.js 16.0.0 or higher
- A project using React and Tailwind CSS
- shadcn/ui setup in your project

## Development

To build the project locally:

```bash
# Clone the repository
git clone https://github.com/yourusername/aviris-cli
cd aviris-cli

# Install dependencies
npm install

# Build the project
npm run build

# Link for local development
npm link
```

## License

MIT
