#!/usr/bin/env node
import { program } from "commander";
import { addComponent } from "../commands/add.js";
import { listComponents } from "../commands/list.js";

program
  .version("0.1.0")
  .description("Aviris CLI for installing and managing UI components");

program
  .command("add <component>")
  .description("Add a component to your project")
  .action(addComponent);

program
  .command("list")
  .description("List all available components")
  .action(listComponents);

program.parse(process.argv);
