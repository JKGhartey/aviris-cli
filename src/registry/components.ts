import { Component } from "../types/index.js";

// Base components that are available
const baseComponents = {
  button: "Button",
  table: "Table",
  tooltip: "Tooltip",
} as const;

// Common dependencies with their versions
const commonDeps = {
  "@radix-ui/react-slot": "^1.0.2",
  "class-variance-authority": "^0.7.1",
  clsx: "^2.1.1",
  "tailwind-merge": "^3.0.1",
  "@radix-ui/react-tabs": "^1.0.4",
  "@radix-ui/react-tooltip": "^1.0.7",
  "framer-motion": "^10.18.0",
  "prism-react-renderer": "^2.3.1",
} as const;

// Component definitions
export const COMPONENTS: Record<string, Component> = {
  "custom-button": {
    name: "CustomButton",
    description:
      "A customizable button component with loading state and variants",
    files: ["CustomButton.tsx"],
    dependencies: {
      "@radix-ui/react-slot": commonDeps["@radix-ui/react-slot"],
      "class-variance-authority": commonDeps["class-variance-authority"],
      clsx: commonDeps["clsx"],
      "tailwind-merge": commonDeps["tailwind-merge"],
    },
    baseComponents: [baseComponents.button],
    category: "custom",
    tags: ["form", "input", "interactive"],
  },
  "code-block": {
    name: "CodeBlock",
    description:
      "Code blocks with syntax highlighting, copy functionality and tabs",
    files: ["CodeBlock.tsx"],
    dependencies: {
      "@radix-ui/react-tabs": commonDeps["@radix-ui/react-tabs"],
      "prism-react-renderer": commonDeps["prism-react-renderer"],
    },
    baseComponents: [],
    category: "custom",
    tags: ["documentation", "code", "syntax"],
  },
  "component-preview": {
    name: "ComponentPreview",
    description: "Preview component with code display and live example",
    files: ["ComponentPreview.tsx"],
    dependencies: {
      "@radix-ui/react-tabs": commonDeps["@radix-ui/react-tabs"],
    },
    baseComponents: [],
    category: "custom",
    tags: ["documentation", "preview", "demo"],
  },
  "folder-structure": {
    name: "FolderStructure",
    description:
      "Tree-like component for displaying file and directory structures",
    files: ["FolderStructure.tsx"],
    dependencies: {
      "framer-motion": commonDeps["framer-motion"],
    },
    baseComponents: [],
    category: "custom",
    tags: ["tree", "files", "navigation"],
  },
  "section-header": {
    name: "SectionHeader",
    description:
      "Flexible header component for sections with title and actions",
    files: ["SectionHeader.tsx"],
    dependencies: {},
    baseComponents: [],
    category: "custom",
    tags: ["layout", "header", "navigation"],
  },
  "api-table": {
    name: "ApiTable",
    description: "API documentation table with property definitions",
    files: ["ApiTable.tsx"],
    dependencies: {},
    baseComponents: [baseComponents.table],
    category: "custom",
    tags: ["documentation", "table", "api"],
  },
  toolbar: {
    name: "Toolbar",
    description: "Figma-inspired toolbar component with tooltips",
    files: ["Toolbar.tsx"],
    dependencies: {
      "@radix-ui/react-tooltip": commonDeps["@radix-ui/react-tooltip"],
    },
    baseComponents: [baseComponents.tooltip],
    category: "custom",
    tags: ["navigation", "menu", "interactive"],
  },
  "installation-section": {
    name: "InstallationSection",
    description: "Installation guide section with code examples",
    files: ["InstallationSection.tsx"],
    dependencies: {},
    baseComponents: [],
    category: "custom",
    tags: ["documentation", "guide", "code"],
  },
};
