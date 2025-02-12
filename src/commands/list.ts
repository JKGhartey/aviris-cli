import { Component, ComponentWithKey } from "../types/index.js";
import { COMPONENTS } from "../registry/components.js";
import chalk from "chalk";

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
      chalk.bold(
        `\n${category.charAt(0).toUpperCase() + category.slice(1)} Components:`
      )
    );

    if (components.length === 0) {
      console.log(chalk.yellow(`No ${category} components found`));
    } else {
      components.forEach(
        ({ key, name, description, dependencies, baseComponents, tags }) => {
          console.log(`\n${chalk.green(name)} ${chalk.gray(`(${key})`)}`);
          console.log(chalk.white(description));

          if (tags.length > 0) {
            console.log(
              chalk.blue("Tags:"),
              tags.map((tag) => chalk.cyan(tag)).join(", ")
            );
          }

          if (Object.keys(dependencies).length > 0) {
            console.log(chalk.blue("\nDependencies:"));
            Object.entries(dependencies).forEach(([dep, version]) => {
              console.log(chalk.gray(`  ${dep}@${version}`));
            });
          }

          if (baseComponents.length > 0) {
            console.log(
              chalk.blue("\nRequired base components:"),
              baseComponents.map((comp) => chalk.yellow(comp)).join(", ")
            );
          }
        }
      );
    }
  });

  console.log(chalk.bold("\nUsage:"));
  console.log(chalk.gray("  aviris add <component-name>"));
  console.log(chalk.gray("  Example: aviris add custom-button\n"));
}
