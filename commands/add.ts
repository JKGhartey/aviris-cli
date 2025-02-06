import fs from "fs-extra";
import path from "path";
import { copyComponent } from "../lib/helpers.js";

interface Component {
  name: string;
  description: string;
  files: string[];
  dependencies?: string[];
  styles?: string[];
}

interface ComponentRegistry {
  button: {
    name: "Button";
    description: "A customized button component with variants";
    files: ["Button.tsx"];
    dependencies: ["class-variance-authority"];
  };
  code: {
    name: "CodeBlock";
    description: "Code block with syntax highlighting and copy";
    files: ["CodeBlock.tsx"];
    dependencies: ["lucide-react"];
  };
  preview: {
    name: "ComponentPreview";
    description: "Preview component with code view";
    files: ["ComponentPreview.tsx"];
    dependencies: ["lucide-react"];
    styles?: ["preview.css"];
  };
  table: {
    name: "DataTable";
    description: "Advanced table with sorting and filtering";
    files: ["DataTable.tsx", "columns.tsx"];
    dependencies: ["@tanstack/react-table"];
  };
}

const COMPONENTS: ComponentRegistry = {
  button: {
    name: "Button",
    description: "A customized button component with variants",
    files: ["Button.tsx"],
    dependencies: ["class-variance-authority"],
  },
  code: {
    name: "CodeBlock",
    description: "Code block with syntax highlighting and copy",
    files: ["CodeBlock.tsx"],
    dependencies: ["lucide-react"],
  },
  preview: {
    name: "ComponentPreview",
    description: "Preview component with code view",
    files: ["ComponentPreview.tsx"],
    dependencies: ["lucide-react"],
    styles: ["preview.css"],
  },
  table: {
    name: "DataTable",
    description: "Advanced table with sorting and filtering",
    files: ["DataTable.tsx", "columns.tsx"],
    dependencies: ["@tanstack/react-table"],
  },
};

export async function addComponent(componentName: string): Promise<void> {
  try {
    const component = COMPONENTS[componentName as keyof typeof COMPONENTS];
    if (!component) {
      console.error(
        `Component "${componentName}" not found. Available components:\n${Object.keys(
          COMPONENTS
        ).join(", ")}`
      );
      return;
    }

    // Copy component files
    const componentsDir = path.join(process.cwd(), "components");
    await fs.ensureDir(componentsDir);

    for (const file of component.files) {
      await copyComponent(file, componentsDir);
    }

    // Copy styles if any
    if (component.styles?.length) {
      const stylesDir = path.join(process.cwd(), "styles");
      await fs.ensureDir(stylesDir);
      for (const style of component.styles) {
        await copyComponent(style, stylesDir);
      }
    }

    // Log success and next steps
    console.log(`✅ Added ${component.name}`);

    if (component.dependencies?.length) {
      console.log("\nInstall dependencies:");
      console.log(`npm install ${component.dependencies.join(" ")}`);
    }

    if (component.styles?.length) {
      console.log("\nAdd to your CSS:");
      component.styles.forEach((style: string) =>
        console.log(`@import "../styles/${style}";`)
      );
    }
  } catch (error) {
    console.error("Failed to add component:", (error as Error).message);
  }
}
