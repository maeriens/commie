const path = require('path');
const fs = require('fs');
const { red } = require('colors/safe');

const mainFolder = path.resolve(process.cwd());
const gitFolder = `${mainFolder}/.git`;
const msgFile = '.git/COMMIT_EDITMSG';
let msg = '';
let err = red('[ERROR]');

// If the git folder exists
if (fs.existsSync(gitFolder)) {
  // Check if the COMMIT_EDITMSG file exists and get its contents
  try {
    if (fs.existsSync(msgFile)) {
      msg = fs.readFileSync(msgFile, 'utf8').toString();
      // Get the commit title only - in case it was commited via git commit or has a body
      msg = msg.split('\n')[0].trim();
    } else {
      console.log(`\t${err} No commit message found. Have you made your first commit?\n`);
      process.exit(1);
    }
  } catch (error) {
    console.log(err);
    process.exit(1);
  }

} else {
  console.log(`\t${err} No git folder found in ${mainFolder}\n`);
  process.exit(1);
};


module.exports = msg;