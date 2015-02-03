:: Batch Script to Detect Google Chrome or Mozilla Firefox installation on machine
:: Execute detected browser or default browser if no browser detected

:: Author: Adnan Umer <u.adnan@outlook.com>
:: Dated: 24 Janvary, 2015

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