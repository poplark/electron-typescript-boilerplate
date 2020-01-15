// import chalk from 'chalk';
const childProcess = require('child_process');

const {
  spawn
} = childProcess;

module.exports = class ElectronProcess {

  constructor(electronArgs, env) {
    this.args = electronArgs;
    this.env = env;
  }

  start() {
    console.debug('electron start...');
    this.process = spawn(require("electron").toString(), this.args, {
      env: {
        ...this.env,
        // ELECTRON_HMR_SOCKET_PATH: socketPath,
      }
    });
    this.process.on('close', exitCode => {
      console.debug('electron close ', exitCode);
    });
    this.process.on('error', err => {
      console.debug('electron error ', err);
    });
    this.process.stdout.on('data', data => {
      console.log(`electron process stdout - `, data.toString());
    });
    this.process.stderr.on('data', data => {
      console.log(`electron process stderr - `, data.toString());
    });
  }

  restart() {
    console.debug('electron restart...');
    if (this.close()) {
      this.start();
    }
  }

  close() {
    console.debug('electron close...');
    return this.process.kill();
  }
}
