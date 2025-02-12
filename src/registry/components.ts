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
    files: ["CustomButton.tsx"],
    dependencies: {
      "@radix-ui/react-slot": commonDeps["@radix-ui/react-slot"],
      "class-variance-authority": commonDeps["class-variance-authority"],
      clsx: commonDeps["clsx"],
      "tailwind-merge": commonDeps["tailwind-merge"],
    },
    baseComponents: [baseComponents.button],
    category: "custom",
  },
  "code-block": {
    name: "CodeBlock",
    files: ["CodeBlock.tsx"],
    dependencies: {
      "@radix-ui/react-tabs": commonDeps["@radix-ui/react-tabs"],
      "prism-react-renderer": commonDeps["prism-react-renderer"],
    },
    baseComponents: [],
    category: "custom",
  },
  "component-preview": {
    name: "ComponentPreview",
    files: ["ComponentPreview.tsx"],
    dependencies: {
      "@radix-ui/react-tabs": commonDeps["@radix-ui/react-tabs"],
    },
    baseComponents: [],
    category: "custom",
  },
  "folder-structure": {
    name: "FolderStructure",
    files: ["FolderStructure.tsx"],
    dependencies: {
      "framer-motion": commonDeps["framer-motion"],
    },
    baseComponents: [],
    category: "custom",
  },
  "section-header": {
    name: "SectionHeader",
    files: ["SectionHeader.tsx"],
    dependencies: {},
    baseComponents: [],
    category: "custom",
  },
  "api-table": {
    name: "ApiTable",
    files: ["ApiTable.tsx"],
    dependencies: {},
    baseComponents: [baseComponents.table],
    category: "custom",
  },
  toolbar: {
    name: "Toolbar",
    files: ["Toolbar.tsx"],
    dependencies: {
      "@radix-ui/react-tooltip": commonDeps["@radix-ui/react-tooltip"],
    },
    baseComponents: [baseComponents.tooltip],
    category: "custom",
  },
  "installation-section": {
    name: "InstallationSection",
    files: ["InstallationSection.tsx"],
    dependencies: {},
    baseComponents: [],
    category: "custom",
  },
};
