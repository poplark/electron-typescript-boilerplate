import { BrowserWindow, app, dialog } from 'electron';
const path = require('path');

console.log('main');

const output = path.resolve(__dirname, '../..', OUTPUT_PATH);

class View {
  private mainWindow: BrowserWindow | undefined
  get isRunning(): boolean {
    return !!this.mainWindow;
  }

  constructor() {
    this.init = this.init.bind(this);
    this.destroy = this.destroy.bind(this);
  }

  init() {
    this.mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      fullscreen: false,
      maximizable: false,
      backgroundColor: '#FFF',
      webPreferences: {
        preload: path.resolve(output, 'preload.js')
      }
    });

    // Open the DevTools.
    this.mainWindow.webContents.openDevTools();

    this.mainWindow
      .loadFile(path.resolve(output, 'index.html'))
      .then((res) => {
        console.log('load file ', res);
      })
      .catch(err => {
        // todo - use error page
        console.error('load file ', err);
        dialog.showErrorBox('load file error', 'error msg');
        // this.destroy();
        // app.quit();
      });
    this.mainWindow.on('closed', this.destroy);
  }

  destroy() {
    this.mainWindow = undefined;
  }
}

const view = new View();


app.on('ready', function () {
  view.init();
});
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', function () {
  console.log('activ')
  if (!view.isRunning) {
    view.init();
  }
});