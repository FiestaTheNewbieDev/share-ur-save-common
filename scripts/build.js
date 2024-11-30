#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

function runCommand(command) {
  execSync(command, { stdio: "inherit" });
}

function copyDir(source, destination) {
  fs.mkdirSync(destination, { recursive: true });
  fs.readdirSync(source).forEach((item) => {
    const sourcePath = path.join(source, item);
    const destinationPath = path.join(destination, item);
    if (fs.lstatSync(sourcePath).isDirectory()) {
      copyDir(sourcePath, destinationPath);
    } else {
      fs.copyFileSync(sourcePath, destinationPath);
    }
  });
}

function build() {
  try {
    runCommand("npm run build:cjs");
    runCommand("npm run build:esm");
    runCommand("npm run build:types");
    runCommand("npm run prisma:generate");
    copyDir("./prisma", "./dist/prisma");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

build();
