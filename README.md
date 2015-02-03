# CodeSkulptor Server
Unofficial [CodeSkulptor][0] Offline Server

CodeSkulptor requires Chrome 18+, Firefox 11+, and Safari 6+. You must have a compatible browser to use CodeSkulptor. There might be some features working on other browser but full functionality is not expected.

CodeSkulptor Server is able to detect Chrome and Firefox installation on your PC and opens CodeSkulptor inside detected browser. If prefered browser is not detect CodeSkulptor Server will try to open default browser.

## Compiling for Windows
CodeSkulptor Server is written in [Google Go][2]. To compile CodeSkulptor you must have Go Compilor installed on your PC. If you have already installed then opens `Comamnd Prompt` on windows and execute `build.bat`.

`build.bat` will try to execute Go Compilor and if build was sucessfull executable will be saved as `CodeSkulptorServer.exe` inside `bin` directory.

## Compiling for Other OS
To compile CodeSkulptor Server for other OS you have to replace OS specific function i.e `getExePath` that lives inside [src/codeskulptor/listener.go][3].

## Running Server
To run CodeSkulptor Server exeutes `bin\CodeSkulptorServer.exe`. This will also try to open `localhost:2846` within prefered web browser. CodeSkulptor Server listens on port `2846`. If browser doesn't opens automatically try to open `localhost:2846` inside Google Chrome, Mozilla Firefox or Safari. Sorry Internet Explorer not full supports CodeSkulptor.

## CodeSkulptor Server Installer
You can download CodeSkulptor Standalone Installer from [here][1]. CodeSkulptor installer will install CodeSkulptor on your PC and creates two start menu items. First is `CodeSkulptor` and second is `CodeSkulptor Server`. Try to run `CodeSkulptor Server`. Your installed Firewall software might attempts block port. If you want to use fully functional CodeSkulptor Offline copy you have to allow CodeSkulptor Server. 

If CodeSkulptor Server is failing to launch or port is block then you can run `CodeSkulptor` from start menu that doesn't supports saving script right inside your browser

  [0]: http://www.codeskulptor.org/
  [1]: http://uadnan.blob.core.windows.net/public/codeskulptor-server-1.1.exe
  [2]: https://golang.org/
  [3]: https://github.com/uadnan/CodeSkulptor-Server/blob/master/src/codeskulptor/listener.go
