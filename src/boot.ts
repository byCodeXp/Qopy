import { app, BrowserWindow, ipcMain } from 'electron';
import installDevTools, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } from 'electron-devtools-installer';
import { appEvents } from './events';

let devMode = false;

if (process.env.NODE_ENV === 'development') {
    devMode = true;
}

// Window options
const windowOptions: Electron.BrowserWindowConstructorOptions = {
    width: 1024,
    height: 620,
    frame: false,
    webPreferences: {
        devTools: devMode,
        nodeIntegration: true,
        contextIsolation: false
    }
};

app.whenReady().then(() => {
    // Create window
    const window = new BrowserWindow(windowOptions);

    // Load html document
    if (devMode) {
        window.loadURL('http://localhost:1234');
    } else {
        window.loadFile('index.html');
    }

    // Register application events

    // Close window
    ipcMain.on(appEvents.CLOSE_FRAME, () => {
        window.close();
    });

    // Maximize window
    ipcMain.on(appEvents.MAXIMIZE_FRAME, () => {
        if (window.isMaximized()) {
            window.unmaximize();
        } else {
            window.maximize();
        }
    });

    // Minimize window
    ipcMain.on(appEvents.MINIMIZE_FRAME, () => {
        window.minimize();
    });

    // Setup dev tools
    if (devMode) {
        installDevTools([REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS]);
    }
});
