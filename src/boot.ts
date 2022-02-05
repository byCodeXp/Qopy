const { app, BrowserWindow, ipcMain } = require('electron');

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

    window.loadFile('index.html');

    ipcMain.on('WINDOW_CLOSE', () => {
        window.close();
    });

    ipcMain.on('WINDOW_MAXIMIZE', () => {
        if (window.isMaximized()) {
            window.unmaximize();
        } else {
            window.maximize();
        }
    });

    ipcMain.on('WINDOW_MINIMIZE', () => {
        window.minimize();
    });
});
