import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Copy a component from the templates directory to the target directory
 */
export async function copyComponent(
  fileName: string,
  targetDir: string
): Promise<void> {
  const templatesDir = path.join(__dirname, "../../templates");
  const sourcePath = path.join(templatesDir, "components", fileName);
  const targetPath = path.join(targetDir, fileName);

  try {
    await fs.copy(sourcePath, targetPath);
  } catch (error) {
    throw new Error(`Failed to copy ${fileName}: ${(error as Error).message}`);
  }
}

/**
 * Check if a file exists in the project root
 */
export async function fileExists(fileName: string): Promise<boolean> {
  try {
    const filePath = path.join(process.cwd(), fileName);
    return await fs.pathExists(filePath);
  } catch {
    return false;
  }
}

/**
 * Check if the project uses TypeScript
 */
export async function detectTypeScript(): Promise<boolean> {
  try {
    const tsconfig = path.join(process.cwd(), "tsconfig.json");
    return await fs.pathExists(tsconfig);
  } catch {
    return false;
  }
}

/**
 * Check if the project uses Tailwind CSS
 */
export async function detectTailwind(): Promise<boolean> {
  try {
    const tailwindConfig = path.join(process.cwd(), "tailwind.config.js");
    const tailwindTsConfig = path.join(process.cwd(), "tailwind.config.ts");
    return (
      (await fs.pathExists(tailwindConfig)) ||
      (await fs.pathExists(tailwindTsConfig))
    );
  } catch {
    return false;
  }
}

/**
 * Check if the project uses CSS Modules
 */
export async function detectCssModules(): Promise<boolean> {
  try {
    const srcDir = path.join(process.cwd(), "src");
    const files = await fs.readdir(srcDir);
    return files.some((file) => file.endsWith(".module.css"));
  } catch {
    return false;
  }
}
