import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function copyComponent(fileName, targetDir) {
  const sourcePath = path.join(
    __dirname,
    "../../app/components/custom",
    fileName
  );
  const targetPath = path.join(targetDir, fileName);

  try {
    await fs.copy(sourcePath, targetPath);
    console.log(`Copied ${fileName} to ${targetDir}`);
  } catch (error) {
    throw new Error(`Failed to copy ${fileName}: ${error.message}`);
  }
}
