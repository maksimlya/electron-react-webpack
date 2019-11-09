const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const port = 1111;
const perf = require('execution-time')();
const config = require('../webpack.config');


perf.start('rend');

// const options = {
//   publicPath: '/',
//   hot: false,
//   liveReload:false,
//   inline: true,
//   contentBase: path.join(__dirname, 'dist'),
//   stats: {
//     colors: true,
//     hash: false,
//     version: false,
//     timings: false,
//     assets: false,
//     chunks: false,
//     modules: false,
//     reasons: false,
//     children: false,
//     source: false,
//     errors: true,
//     errorDetails: true,
//     warnings: true,
//     publicPath: true
//   }
// };

let mainWindow



function createWindow() {



  mainWindow = new BrowserWindow({
       width: 800,
       height: 600,
       webPreferences: {
           nodeIntegration: true,
       }
     });
 mainWindow.autoHideMenuBar = true;
     
  mainWindow.webContents.openDevTools()

  mainWindow.loadURL('http://localhost:' + port).then(() => {
    let res = perf.stop('rend');

    console.log('Rend process:',Math.round(res.time/10)/100);
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })
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