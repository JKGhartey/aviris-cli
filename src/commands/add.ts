import fs from "fs-extra";
import path from "path";
import { copyComponent } from "../lib/helpers.js";

interface Component {
  name: string;
  files: string[];
  dependencies: string[];
  baseComponents: string[];
}

const COMPONENTS: Record<string, Component> = {
  "custom-button": {
    name: "CustomButton",
    files: ["CustomButton.tsx"],
    dependencies: [
      "@radix-ui/react-slot",
      "class-variance-authority",
      "clsx",
      "tailwind-merge",
    ],
    baseComponents: ["Button"],
  },
};

export async function addComponent(componentName: string): Promise<void> {
  try {
    const component = COMPONENTS[componentName];
    if (!component) {
      console.error(
        `Component "${componentName}" not found. Use 'aviris list' to see available components.`
      );
      return;
    }

    const customComponentsDir = path.join(process.cwd(), "components/custom");
    await fs.ensureDir(customComponentsDir);

    for (const file of component.files) {
      await copyComponent(file, customComponentsDir);
    }

    console.log(`✅ Successfully added ${component.name} component`);

    if (component.dependencies.length > 0) {
      console.log("\nRequired dependencies:");
      console.log(`yarn add ${component.dependencies.join(" ")}`);
    }

    if (component.baseComponents.length > 0) {
      console.log("\nRequired base components:");
      component.baseComponents.forEach((baseComponent) => {
        console.log(
          `yarn dlx shadcn-ui@latest add ${baseComponent.toLowerCase()}`
        );
      });
    }
  } catch (error) {
    console.error("Error adding component:", (error as Error).message);
  }
}
