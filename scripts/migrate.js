#!/usr/bin/env node

const { execSync } = require("child_process");

function run() {
  try {
    execSync("npm run prisma:migrate", { stdio: "inherit" });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

run();
