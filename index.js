#!/usr/bin/env node

import { Command } from "commander";
import path from "path";
import fs from "fs-extra";
import { fileURLToPath } from "url";

// Get __dirname equivalent in ES modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Create a new Command instance
const program = new Command();

// Helper function to list components in a directory
const listComponentsInDir = async (dirPath) => {
  try {
    if (!fs.existsSync(dirPath)) return [];
    const items = await fs.readdir(dirPath);
    return items;
  } catch (error) {
    return [];
  }
};

program
  .name("aviris")
  .description("CLI tool for installing aviris components")
  .version("1.0.0");

program
  .command("list")
  .argument("[type]", "Type of components to list: custom|widget|all", "all")
  .description("List available components (type: custom|widget|all)")
  .action(async (type) => {
    try {
      if (type !== "all" && !["custom", "widget"].includes(type)) {
        console.error('Type must be either "custom", "widget", or "all"');
        process.exit(1);
      }

      const avirisPath = path.resolve(__dirname, "../aviris");

      if (type === "all" || type === "custom") {
        const customComponents = await listComponentsInDir(
          path.join(avirisPath, "components/custom")
        );
        console.log("\nCustom Components:");
        console.log(
          customComponents.length
            ? customComponents.join("\n")
            : "No custom components found"
        );
      }

      if (type === "all" || type === "widget") {
        const widgetComponents = await listComponentsInDir(
          path.join(avirisPath, "components/widgets")
        );
        console.log("\nWidget Components:");
        console.log(
          widgetComponents.length
            ? widgetComponents.join("\n")
            : "No widget components found"
        );
      }
    } catch (error) {
      console.error("Error listing components:", error.message);
      process.exit(1);
    }
  });

program
  .command("install <type> <component>")
  .description("Install an aviris component (type: custom|widget)")
  .action(async (type, component) => {
    try {
      // Validate component type
      if (!["custom", "widget"].includes(type)) {
        console.error('Type must be either "custom" or "widget"');
        process.exit(1);
      }

      // Get the source and destination paths
      const componentType =
        type === "custom" ? "components/custom" : "components/widgets";
      const sourcePath = path.resolve(
        __dirname,
        "../aviris",
        componentType,
        component
      );

      // Log the paths for debugging
      console.log("Looking for component in:", sourcePath);

      const destPath = path.resolve(
        process.cwd(),
        "src",
        componentType,
        component
      );

      // Check if component exists
      if (!fs.existsSync(sourcePath)) {
        console.error(
          `${type} component "${component}" not found in aviris library`
        );
        process.exit(1);
      }

      // Create destination directory if it doesn't exist
      await fs.ensureDir(path.dirname(destPath));

      // Copy the component
      await fs.copy(sourcePath, destPath);
      console.log(`Successfully installed ${type} component: ${component}`);
    } catch (error) {
      console.error("Error installing component:", error.message);
      process.exit(1);
    }
  });

program.parse(process.argv);
