const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');
const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../webpack.config');
const port = 1212;

const options = {
  publicPath: '/',
  hot: false,
  liveReload:false,
  inline: true,
  contentBase: path.join(__dirname, 'dist'),
  stats: {
    colors: true,
    hash: false,
    version: false,
    timings: false,
    assets: false,
    chunks: false,
    modules: false,
    reasons: false,
    children: false,
    source: false,
    errors: true,
    errorDetails: true,
    warnings: true,
    publicPath: true
  }
};

let devServer = new WebpackDevServer(webpack(config),options);

devServer.listen(port,'localhost', function(err){
  if(err) {
    console.error(err);
  }


  app.on('ready', createWindow)

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  
  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow()
    }
  })
})


let mainWindow



function createWindow() {

  installExtension(REACT_DEVELOPER_TOOLS)
  .then((name) => console.log(`Added Extension:  ${name}`))
  .catch((err) => console.log('An error occurred: ', err));

  mainWindow = new BrowserWindow({
       width: 800,
       height: 600,
       webPreferences: {
           nodeIntegration: true,
       }
     });
 mainWindow.setAutoHideMenuBar(true);
     
  mainWindow.webContents.openDevTools()

  mainWindow.loadURL('http://localhost:' + port);

  mainWindow.on('closed', () => {
    mainWindow = null
  })

}

