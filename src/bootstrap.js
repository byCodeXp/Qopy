const { app, BrowserWindow, ipcMain } = require('electron');
const ipc = ipcMain;

app.whenReady().then(() => {

   const window = new BrowserWindow({
      frame: false,
      width: 800,
      height: 600,
      webPreferences: {
         nodeIntegration: true,
         contextIsolation: false,
         enableRemoteModule: true
      }
   });

   window.loadFile('src/index.html');

   ipc.on('minimize_app_action', () =>
   {
      window.minimize();
   });

   ipc.on('maximize_app_action', () =>
   {
      if (window.isMaximized()) {
         window.unmaximize();
      } else {
         window.maximize();
      }
   });

   ipc.on('close_app_action', () =>
   {
      window.close();
   });

});