:: Batch Script to Detect Google Chrome or Mozilla Firefox installation on machine
:: Execute detected browser or default browser if no browser detected

:: Copyright (c) Adnan Umer <u.adnan@outlook.com>.
:: All rights reserved. Follow me @MrAdnanUmer

:: Permission is hereby granted, free of charge, to any person obtaining a copy of this
:: software and associated documentation files (the "Software"), to deal in the Software
:: without restriction, including without limitation the rights to use, copy, modify, merge,
:: publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons
:: to whom the Software is furnished to do so, subject to the following conditions:
:: 
:: The above copyright notice and this permission notice shall be included in all copies or
:: substantial portions of the Software.
:: 
:: THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
:: INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
:: PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
:: FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
:: OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
:: DEALINGS IN THE SOFTWARE.

@echo off
setlocal EnableDelayedExpansion

echo Detecting 32-bit Installed Browsers
for /f "tokens=2,*" %%A in ('reg query "HKEY_LOCAL_MACHINE\SOFTWARE\Wow6432Node\Clients\StartMenuInternet" /ve 2^>nul') do set "Default=%%B"
for /f "skip=3 delims=" %%A in ('reg query "HKEY_LOCAL_MACHINE\SOFTWARE\Wow6432Node\Clients\StartMenuInternet" 2^>nul') do (
    if "%%~nxA"=="Google Chrome" (
    	set "CHROMEPATH=%%~A"
    	goto exec
    ) else (
    	if "%%~nxA"=="Mozilla Firefox" (
    		set "CHROMEPATH=%%~A"
    		goto exec
    	)
    )
)

echo Detecting 64-bit Installed Browsers
for /f "tokens=2,*" %%A in ('reg query "HKEY_LOCAL_MACHINE\SOFTWARE\Clients\StartMenuInternet" /ve 2^>nul') do set "Default=%%B"
for /f "skip=3 delims=" %%A in ('reg query "HKEY_LOCAL_MACHINE\SOFTWARE\Clients\StartMenuInternet" 2^>nul') do (
    if "%%~nxA"=="Google Chrome" (
    	set "CHROMEPATH=%%~A"
    	goto exec
    ) else (
    	if "%%~nxA"=="Mozilla Firefox" (
    		set "CHROMEPATH=%%~A"
    		goto exec
    	)
    )
)
goto notfound

:exec
echo Successfully Found Compatible Web browser
for /f "tokens=2,*" %%A in ('reg query "%CHROMEPATH%\shell\open\command" /ve 2^>nul') do set "Command=%%~B"
start "Browser" "%Command%" %1 %2 %3 %4 %5 %6 %7 %8 %9

goto end

:notfound
echo Failed to find any Compatible Web Browser
echo Starting Default Webbrowser
start "HTML" %1 %2 %3 %4 %5 %6 %7 %8 %9

:end
endlocal
