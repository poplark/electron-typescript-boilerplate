// import chalk from 'chalk';
require('../env')(process.env.NODE_ENV = 'development');

const MainProcess = require('./main');
const RendererProcess = require('./renderer');
const ElectronProcess = require('./electron');

const elecProc = new ElectronProcess(['.'], process.env);
const mainProc = new MainProcess(elecProc);
const rendProc = new RendererProcess();

rendProc.start();
mainProc.start();

process.on('exit', (a,b,c) => {
  console.log('process exit ', a,b,c)
  elecProc.close();
});
