import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATES_DIR = path.join(__dirname, "../../templates");

export async function copyComponent(
  fileName: string,
  targetDir: string
): Promise<void> {
  const sourcePath = path.join(TEMPLATES_DIR, fileName);
  const targetPath = path.join(targetDir, fileName);

  try {
    if (!(await fs.pathExists(sourcePath))) {
      throw new Error(
        `Template file ${fileName} not found in ${TEMPLATES_DIR}`
      );
    }
    await fs.copy(sourcePath, targetPath);
    console.log(`Copied ${fileName} to ${targetPath}`);
  } catch (error) {
    throw new Error(
      `Failed to copy component ${fileName}: ${(error as Error).message}`
    );
  }
}
