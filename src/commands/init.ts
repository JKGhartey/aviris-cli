import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function initProject(): Promise<void> {
  try {
    // Check if package.json exists
    const packageJsonPath = path.join(process.cwd(), "package.json");
    if (!(await fs.pathExists(packageJsonPath))) {
      throw new Error(
        "No package.json found. Please run this command in a Node.js project."
      );
    }

    // Create components directory structure
    const directories = [
      "components",
      "components/custom",
      "components/ui",
      "components/widgets",
      "lib",
    ];

    for (const dir of directories) {
      await fs.ensureDir(path.join(process.cwd(), dir));
    }

    // Copy utils.ts to lib directory
    const utilsSource = path.join(__dirname, "../../templates/utils.ts");
    const utilsTarget = path.join(process.cwd(), "lib/utils.ts");
    await fs.copy(utilsSource, utilsTarget);

    // Add required dependencies
    const packageJson = await fs.readJson(packageJsonPath);
    const dependencies = {
      "@radix-ui/react-slot": "^1.0.2",
      "class-variance-authority": "^0.7.1",
      clsx: "^2.1.1",
      "tailwind-merge": "^3.0.1",
    };

    packageJson.dependencies = {
      ...packageJson.dependencies,
      ...dependencies,
    };

    await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });

    console.log("\n✅ Project initialized successfully!");
    console.log("\nNext steps:");
    console.log(
      "1. Run 'yarn install' or 'npm install' to install dependencies"
    );
    console.log("2. Use 'aviris add <component>' to add components");
    console.log("3. Run 'aviris list' to see available components");
  } catch (error) {
    console.error("Error initializing project:", (error as Error).message);
  }
}
