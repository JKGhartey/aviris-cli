import fs from "fs-extra";
import path from "path";
import axios from "axios";
import chalk from "chalk";
import ora from "ora";
import { COMPONENTS } from "../registry/components.js";

const GITHUB_REPO = "JKGhartey/aviris";
const COMPONENTS_PATH = "aviris-app/components/custom"; // Path to components in the repo
const GITHUB_RAW_URL = `https://raw.githubusercontent.com/${GITHUB_REPO}/main/${COMPONENTS_PATH}`;

interface AddOptions {
  yes?: boolean;
  overwrite?: boolean;
}

export async function addComponent(
  componentName: string,
  options: AddOptions = {}
): Promise<void> {
  try {
    const component = COMPONENTS[componentName];
    if (!component) {
      console.error(
        chalk.red(
          `Component "${componentName}" not found. Use 'aviris list' to see available components.`
        )
      );
      return;
    }

    // Check if project is initialized
    const utilsPath = path.join(process.cwd(), "lib/utils.ts");
    if (!(await fs.pathExists(utilsPath))) {
      console.error(
        chalk.red("Project is not initialized. Please run 'aviris init' first.")
      );
      return;
    }

    // Determine target directory based on category
    const targetDir = path.join(
      process.cwd(),
      "components",
      component.category
    );
    await fs.ensureDir(targetDir);

    // Check for existing files
    for (const file of component.files) {
      const targetPath = path.join(targetDir, file);
      if ((await fs.pathExists(targetPath)) && !options.overwrite) {
        if (!options.yes) {
          console.error(
            chalk.yellow(
              `File ${file} already exists. Use --overwrite to replace it.`
            )
          );
          return;
        }
      }
    }

    // Download files from GitHub
    const spinner = ora("Downloading component files...").start();

    for (const file of component.files) {
      const fileUrl = `${GITHUB_RAW_URL}/${file}`;
      const targetPath = path.join(targetDir, file);

      try {
        const response = await axios.get(fileUrl, { responseType: "text" });
        if (response.status !== 200) {
          throw new Error(`Failed to download ${file}`);
        }

        await fs.writeFile(targetPath, response.data);
        spinner.succeed(`Downloaded ${file}`);
      } catch (error) {
        spinner.fail(`Failed to download ${file}: ${(error as Error).message}`);
        return;
      }
    }

    // Update package.json with dependencies
    if (Object.keys(component.dependencies).length > 0) {
      console.log(chalk.blue("\nRequired dependencies:"));
      console.log(
        "yarn add",
        Object.entries(component.dependencies)
          .map(([name, version]) => `${name}@${version}`)
          .join(" ")
      );
    }

    // Install base components
    if (component.baseComponents.length > 0) {
      console.log(chalk.blue("\nRequired base components:"));
      component.baseComponents.forEach((baseComponent) => {
        console.log(
          `yarn dlx shadcn-ui@latest add ${baseComponent.toLowerCase()}`
        );
      });
    }

    console.log(chalk.green("\n✅ Component added successfully!"));
  } catch (error) {
    console.error(
      chalk.red("Error adding component:"),
      (error as Error).message
    );
  }
}
