import { BrowserWindow, app, dialog } from 'electron';
const path = require('path');

const output = path.resolve(__dirname, '../..', process.env.ELECTRON_TB_WEBPACK_DEST);
const isDevelopment = process.env.NODE_ENV !== 'production';

console.log('main', isDevelopment, process.env.NODE_ENV);

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
        nodeIntegration: true,
        preload: path.resolve(output, 'preload.js')
      }
    });

    if (isDevelopment) {
      // Open the DevTools.
      this.mainWindow.webContents.openDevTools();
      this.mainWindow.loadURL(`http://${process.env.ELECTRON_TB_WEBPACK_HOST || 'localhost'}:${process.env.ELECTRON_TB_WEBPACK_PORT || 3001}`);
    } else {
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
    }

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
  console.log('active')
  if (!view.isRunning) {
    view.init();
  }
});