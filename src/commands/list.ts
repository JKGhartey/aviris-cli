import { Component, ComponentWithKey } from "../types/index.js";
import { COMPONENTS } from "../registry/components.js";
import chalk from "chalk";

interface ListOptions {
  details?: boolean;
}

export function listComponents(options: ListOptions = {}): void {
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
        `${category.charAt(0).toUpperCase() + category.slice(1)} Components:`
      )
    );

    if (components.length === 0) {
      console.log(chalk.yellow(`  No ${category} components found`));
      return;
    }

    if (options.details) {
      // Detailed view
      components.forEach(
        ({ key, name, description, dependencies, baseComponents, tags }) => {
          console.log(chalk.green(`\n  ${name}`) + chalk.gray(` (${key})`));
          console.log(chalk.white(`  ${description}`));

          if (tags.length > 0) {
            console.log(
              chalk.blue(`  Tags: `) +
                tags.map((tag) => chalk.cyan(tag)).join(", ")
            );
          }

          if (Object.keys(dependencies).length > 0) {
            console.log(chalk.blue(`  Dependencies:`));
            Object.entries(dependencies).forEach(([dep, version]) => {
              console.log(chalk.gray(`    ${dep}@${version}`));
            });
          }

          if (baseComponents.length > 0) {
            console.log(
              chalk.blue(`  Required: `) +
                baseComponents.map((comp) => chalk.yellow(comp)).join(", ")
            );
          }
        }
      );
    } else {
      // Compact view
      components.forEach(({ key, name, description, tags }) => {
        const shortDesc = description.split(".")[0];
        console.log(
          chalk.green(`  ${name}`) +
            chalk.gray(` (${key})`) +
            chalk.white(` - ${shortDesc}`)
        );
      });
    }
  });

  // Show help text
  console.log(chalk.bold("\nCommands:"));
  console.log(
    chalk.gray("  aviris add <component>    Add a component to your project")
  );
  console.log(
    chalk.gray(
      "  aviris list --details     Show detailed component information"
    )
  );
  console.log(chalk.gray("  aviris list --help        Show command help\n"));
}
