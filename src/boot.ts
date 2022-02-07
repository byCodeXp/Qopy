import { app, BrowserWindow, ipcMain } from 'electron';
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';

app.whenReady().then(() => {
    const window = new BrowserWindow({
        frame: false,
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            devTools: true,
        },
    });

    window.loadURL('http://localhost:1234');

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

    installExtension([REACT_DEVELOPER_TOOLS]);
});
