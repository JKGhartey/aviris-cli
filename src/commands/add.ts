import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import { COMPONENTS } from "../registry/components.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
        `Component "${componentName}" not found. Use 'aviris list' to see available components.`
      );
      return;
    }

    // Check if project is initialized
    const utilsPath = path.join(process.cwd(), "lib/utils.ts");
    if (!(await fs.pathExists(utilsPath))) {
      console.error(
        "Project is not initialized. Please run 'aviris init' first."
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
            `File ${file} already exists. Use --overwrite to replace it.`
          );
          return;
        }
      }
    }

    // Copy component files
    for (const file of component.files) {
      const sourcePath = path.join(__dirname, "../../templates", file);
      const targetPath = path.join(targetDir, file);

      if (!(await fs.pathExists(sourcePath))) {
        throw new Error(`Template file ${file} not found`);
      }

      await fs.copy(sourcePath, targetPath);
      console.log(`✅ Added ${file}`);
    }

    // Update package.json with dependencies
    if (Object.keys(component.dependencies).length > 0) {
      const packageJsonPath = path.join(process.cwd(), "package.json");
      const packageJson = await fs.readJson(packageJsonPath);

      const newDependencies: Record<string, string> = {};
      Object.entries(component.dependencies).forEach(([dep, version]) => {
        if (!packageJson.dependencies?.[dep]) {
          newDependencies[dep] = version;
        }
      });

      if (Object.keys(newDependencies).length > 0) {
        console.log("\nRequired dependencies:");
        console.log(
          "yarn add",
          Object.entries(newDependencies)
            .map(([name, version]) => `${name}@${version}`)
            .join(" ")
        );
      }
    }

    // Install base components
    if (component.baseComponents.length > 0) {
      console.log("\nRequired base components:");
      component.baseComponents.forEach((baseComponent) => {
        console.log(
          `yarn dlx shadcn-ui@latest add ${baseComponent.toLowerCase()}`
        );
      });
    }

    console.log("\n✅ Component added successfully!");
  } catch (error) {
    console.error("Error adding component:", (error as Error).message);
  }
}
