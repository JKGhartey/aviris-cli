#!/usr/bin/env node

import { program } from "commander";
import { addComponent } from "../commands/add.js";
import { initProject } from "../commands/init.js";
import { listComponents } from "../commands/list.js";

program
  .name("aviris")
  .description("CLI for installing Aviris components")
  .version("1.1.2");

program
  .command("init")
  .description("Initialize your project with Aviris configuration")
  .action(initProject);

program
  .command("add <component>")
  .description("Add a component to your project")
  .option("-y, --yes", "Skip confirmation prompt", false)
  .option("-o, --overwrite", "Overwrite existing files", false)
  .action(addComponent);

const list = program
  .command("list")
  .description("List all available components")
  .option("--details", "Show detailed component information")
  .action((cmd) => {
    listComponents({ details: cmd.details });
  });

program.parse();
