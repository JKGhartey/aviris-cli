import fs from "fs-extra";
import path from "path";

const __dirname = path.dirname(require.resolve("../../package.json"));

export async function copyComponent(
  fileName: string,
  targetDir: string
): Promise<void> {
  const sourcePath = path.join(__dirname, "templates", fileName);
  const targetPath = path.join(targetDir, fileName);

  try {
    await fs.copy(sourcePath, targetPath);
  } catch (error) {
    throw new Error(
      `Failed to copy component ${fileName}: ${(error as Error).message}`
    );
  }
}
