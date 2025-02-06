# Aviris CLI

A modern CLI tool for adding pre-built React components to your project. Built with TypeScript and inspired by shadcn/ui.

## Installation

```bash
npm install -g aviris-cli
# or
yarn global add aviris-cli
# or
pnpm add -g aviris-cli
```

## Usage

### Add a Component

```bash
aviris add <component-name>
```

For example:

```bash
aviris add button
```

This will:

1. Copy the component files to your project
2. Install required dependencies
3. Add necessary styles (if any)

### List Available Components

```bash
aviris list
```

## Available Components

- `button` - A customized button component with variants
- `code` - Code block with syntax highlighting and copy functionality
- `preview` - Preview component with code view toggle
- `table` - Advanced table with sorting and filtering

## Project Requirements

- Node.js >= 18
- React project with TypeScript
- Tailwind CSS (recommended)

## Component Structure

Components are added to your project in the following structure:

```
your-project/
├── components/
│   ├── Button.tsx
│   ├── CodeBlock.tsx
│   └── ...
└── styles/
    └── component-styles.css (if needed)
```

## Development

### Setup

```bash
# Clone the repository
git clone https://github.com/your-username/aviris-cli.git

# Install dependencies
cd aviris-cli
npm install

# Build
npm run build

# Run tests
npm test
```

### Adding New Components

1. Add component files to `templates/components/`
2. Register the component in `commands/add.ts`
3. Add tests in `tests/`
4. Run tests and build

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see [LICENSE](LICENSE) for details
