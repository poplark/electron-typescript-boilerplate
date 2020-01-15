const webpack = require('webpack');
const config = require('../../config/webpack.dev.main');

module.exports = class MainProcess {
  constructor(electronProcess) {
    this.state = 'init';
    this.electronProcess = electronProcess;
    this.compiler = webpack(config);
  }

  start() {
    this.watcher = this.compiler.watch({}, (err, stats) => {
      if (err) {
        console.error(`main process - `, err);
        return;
      }
      const info = stats.toJson();
      if (stats.hasErrors()) {
        console.error(`main process compiler - `, info.errors);
        return;
      }
      if (stats.hasWarnings()) {
        console.warn(`main process compiler - `, info.warnings);
      }
      console.info(`main compiler state `, stats.toString({
        colors: true
      }));
      switch (this.state) {
        case 'init':
          console.debug('main process start')
          this.electronProcess.start();
          this.state = 'running';
          break;
        case 'running':
          console.debug('main process restart')
          this.electronProcess.restart();
          break;
        default:
          console.debug('main process unknown ', this.state);
      }
    });
  }

  close() {
    this.watching.close();
  }
}