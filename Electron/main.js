const {
    app,
    BrowserWindow,
    screen
} = require('electron');
const path = require('path');
const ipc = require('electron').ipcMain;
let Mainwindow;

function createWindow() {
    // 创建浏览器窗口
    const win = new BrowserWindow({
        frame: false,
        width: 20,
        height: 50,
        x: 0,
        resizable: false,
        y: screen.getPrimaryDisplay().workAreaSize.height - 200,
        transparent: true,
        skipTaskbar: true,
        alwaysOnTop: true,
        backgroundColor: '#00000000',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            nodeIntegrationInWorker: true,
            devTools: false //  禁用开发者调试工具
        }
    });
    Mainwindow = new BrowserWindow({
        frame: false,
        width: 1440,
        height: 740,
        minWidth: 1440,
        transparent: true,
        alwaysOnTop: true,
        skipTaskbar: true,
        backgroundColor: '#00000000',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            nodeIntegrationInWorker: true,
            devTools: false //  禁用开发者调试工具
        }
    });
    // 加载index.html文件
    win.loadFile('Src/float.html');
    Mainwindow.loadFile('Src/index.html');
    Mainwindow.hide();
}
app.setLoginItemSettings({
    openAtLogin: true, // Boolean 在登录时启动应用
    openAsHidden: true, // Boolean (可选) mac 表示以隐藏的方式启动应用。~~~~
    // path: '', String (可选) Windows - 在登录时启动的可执行文件。默认为 process.execPath.
    // args: [] String Windows - 要传递给可执行文件的命令行参数。默认为空数组。注意用引号将路径换行。
})

app.whenReady().then(() => {
    createWindow()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

ipc.on('open', () => {
    Mainwindow.show();
})
ipc.on('hidden', () => {
    Mainwindow.hide();
})
ipc.on('close', () => {
    app.quit();
})
const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) {
    app.quit()
} else {
    app.on('second-instance', (event, commandLine, workingDirectory) => {
        // 当运行第二个实例时,将会聚焦到mainWindow这个窗口
        if (Mainwindow) {
            if (Mainwindow.isMinimized()) Mainwindow.restore()
            Mainwindow.focus()
            Mainwindow.show()
        }
    })
    // 创建 myWindow, 加载应用的其余部分, etc...
    // app.on('ready', () => {
    // })
}