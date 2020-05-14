const path = require('path');
const now = new Date()
const secondsSinceEpoch = Math.round(now.getTime() / 1000)

var fs = require('fs');

//function to execute shell command as a promise
//cmd is the shell command
//wdir is the working dir
//return a Promise
function execCommand(cmd,wdir) {
  console.log('executing  ' + cmd + '  ...');
  const exec = require('child_process').exec;
  return new Promise((resolve, reject) => {
    exec(cmd, {cwd: wdir}, (error, stdout, stderr) => {
      if (error) {
        console.warn(error);
        process.exit(99);
      }
      resolve(stdout? stdout : stderr);
    });
  });
}

async function go() {
  s = await execCommand('rm -rf node_modules >/dev/null  # removing node_modules','.');
  s = await execCommand('npm install >/dev/null  # main install','.');
}

go(); //MAIN

