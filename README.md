# CodeSkulptor Server
Unofficial [CodeSkulptor][0] Offline Server

## Installation on Windows
Download CodeSkulptor Offline Server Standalone Installer from [here][1]. Installer will install CodeSkulptor on your PC leaving two start menu items i.e. `CodeSkulptor` and `CodeSkulptor Server`. If you want to use fully functional server go with `CodeSkulptor Server`. If server fails to run or required post is blocked you can still use `CodeSkulptor` within limited environment.

**Note**: If you want to use full functionality of CodeSkulptor Offline copy you have to add CodeSkulptor Server in your Firewall or AntiVirus software exception rules. 

CodeSkulptor requires Chrome 18+, Firefox 11+, and Safari 6+. You must have a compatible browser to use CodeSkulptor. There might be some features working on other browser but full functionality is not expected.

CodeSkulptor Offline Server is able to detect Google Chrome and Mozilla Firefox installation on your PC and opens CodeSkulptor inside detected browser. If prefered browser is not detect CodeSkulptor Offline Server will try to open default browser.

## Compiling for Windows
CodeSkulptor Server is written in [Google Go][2]. To compile CodeSkulptor you must have Go Compilor installed on your PC. If you have already installed then opens `Comamnd Prompt` on windows and execute `build.bat`.

`build.bat` will executes Go Compilor and saves executable as `CodeSkulptorServer.exe` inside `bin` directory.

## Compiling for Other OS
To compile CodeSkulptor Server for other OS you have to replace OS specific function i.e `getExePath` that lives inside [src/codeskulptor/listener.go][3].

## Running Server
To run CodeSkulptor Server exeutes `bin\CodeSkulptorServer.exe`. This will also opens `localhost:2846` within detected browser if any or prefered web browser. CodeSkulptor Server listens on port `2846`. If browser doesn't opens automatically you can have to manully opens `localhost:2846` inside Google Chrome, Mozilla Firefox or Safari. Sorry Internet Explorer doesn't fully supports CodeSkulptor.

  [0]: http://www.codeskulptor.org/
  [1]: https://github.com/uadnan/CodeSkulptor-Server/releases/download/v1.2/Codeskulptor.Server.v1.2.Setup.zip
  [2]: https://golang.org/
  [3]: https://github.com/uadnan/CodeSkulptor-Server/blob/master/src/codeskulptor/listener.go
