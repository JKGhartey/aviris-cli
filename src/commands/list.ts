import { Component, ComponentWithKey } from "../types/index.js";
import { COMPONENTS } from "../registry/components.js";

export function listComponents(): void {
  console.log("\nAvailable components:\n");

  // Group components by category
  const componentsByCategory = Object.entries(COMPONENTS).reduce<
    Record<string, ComponentWithKey[]>
  >((acc, [key, component]) => {
    const category = component.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push({ key, ...component });
    return acc;
  }, {});

  // Display components by category
  Object.entries(componentsByCategory).forEach(([category, components]) => {
    console.log(
      `\n${category.charAt(0).toUpperCase() + category.slice(1)} Components:`
    );

    if (components.length === 0) {
      console.log(`No ${category} components found`);
    } else {
      components.forEach(({ key, name, dependencies, baseComponents }) => {
        console.log(`\n${name} (${key})`);

        if (Object.keys(dependencies).length > 0) {
          console.log("Dependencies:");
          Object.entries(dependencies).forEach(([dep, version]) => {
            console.log(`  ${dep}@${version}`);
          });
        }

        if (baseComponents.length > 0) {
          console.log("Required base components:", baseComponents.join(", "));
        }
      });
    }
  });
}
