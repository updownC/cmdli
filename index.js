#!/usr/bin/env node

import fs from 'fs';
import * as child from 'child_process';
import inquirer from 'inquirer';
import chalk from 'chalk';

(async () => {
  try {
    const packageData = fs.readFileSync('./package.json');
    const { scripts = {} } = JSON.parse(packageData);
    const { target } = await inquirer.prompt([
      {
        type: 'list',
        name: 'target',
        message: 'Select a script to run\n -----------------------\n',
        choices: Object.keys(scripts),
      },
    ]);

    child.spawn('npm run', target);
  } catch (error) {
    console.log(error);
    console.log(chalk.redBright('package.json'), 'not found.');
  }
})();
