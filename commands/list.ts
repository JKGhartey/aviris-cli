interface Component {
  name: string;
  description: string;
  dependencies: string[];
  baseComponents: string[];
}

interface Components {
  [key: string]: Component;
}

const COMPONENTS: Components = {
  "custom-button": {
    name: "CustomButton",
    description: "A customized button component based on shadcn/ui Button",
    dependencies: [
      "@radix-ui/react-slot",
      "class-variance-authority",
      "clsx",
      "tailwind-merge",
    ],
    baseComponents: ["Button"],
  },
  code: {
    name: "CodeBlock",
    description:
      "A code block component with copy functionality and tabs support",
    dependencies: ["@radix-ui/react-tabs", "lucide-react"],
    baseComponents: ["Tabs"],
  },
};

export function listComponents(): void {
  console.log("\nAvailable components:\n");

  Object.entries(COMPONENTS).forEach(([key, component]) => {
    console.log(`${component.name} (${key})`);
    console.log(`Description: ${component.description}`);
    console.log(
      "Required base components:",
      component.baseComponents.join(", ")
    );
    console.log("Dependencies:", component.dependencies.join(", "));
    console.log("");
  });
}
