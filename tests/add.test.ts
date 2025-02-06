import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import fs from "fs-extra";
import path from "path";
import { addComponent } from "../commands/add";

vi.mock("fs-extra", () => ({
  default: {
    ensureDir: vi.fn(),
    copy: vi.fn(),
    pathExists: vi.fn(),
  },
}));

describe("addComponent", () => {
  const mockCwd = "/fake/project";

  beforeEach(() => {
    vi.spyOn(process, "cwd").mockReturnValue(mockCwd);
    vi.spyOn(console, "log").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should create directories and copy files for button component", async () => {
    await addComponent("button");

    expect(fs.ensureDir).toHaveBeenCalledWith(path.join(mockCwd, "components"));

    expect(fs.copy).toHaveBeenCalledWith(
      expect.stringContaining("Button.tsx"),
      path.join(mockCwd, "components", "Button.tsx")
    );
  });

  it("should handle non-existent components", async () => {
    await addComponent("non-existent");

    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining('Component "non-existent" not found')
    );
    expect(fs.copy).not.toHaveBeenCalled();
  });

  it("should copy styles when component has them", async () => {
    await addComponent("preview");

    expect(fs.ensureDir).toHaveBeenCalledWith(path.join(mockCwd, "styles"));

    expect(fs.copy).toHaveBeenCalledWith(
      expect.stringContaining("preview.css"),
      path.join(mockCwd, "styles", "preview.css")
    );
  });

  it("should log dependency installation instructions", async () => {
    await addComponent("button");

    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining("npm install")
    );
  });
});
