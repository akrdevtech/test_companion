echo "################################################"
echo "Adding Application as a service"
echo "################################################"

@echo off
:: BatchGotAdmin
::-------------------------------------
REM  --> Check for permissions
>nul 2>&1 "%SYSTEMROOT%\system32\cacls.exe" "%SYSTEMROOT%\system32\config\system"

REM --> If error flag set, we do not have admin.
if '%errorlevel%' NEQ '0' (
    echo Requesting administrative privileges...
    goto UACPrompt
) else ( goto gotAdmin )

:UACPrompt
    echo Set UAC = CreateObject^("Shell.Application"^) > "%temp%\getadmin.vbs"
    set params = %*:"="
    echo UAC.ShellExecute "cmd.exe", "/c %~s0 %params%", "", "runas", 1 >> "%temp%\getadmin.vbs"

    "%temp%\getadmin.vbs"
    del "%temp%\getadmin.vbs"
    exit /B

:gotAdmin
    pushd "%CD%"
    CD /D "%~dp0"
::--------------------------------------

set "ServiceName=AkrStudyCentre"

echo "Removing existing service - started"
call nssm.exe stop %ServiceName%
call sc.exe delete %ServiceName%
echo "Removing existing service - completed"

echo "Starting Service creation"
call nssm.exe set %ServiceName% AppDirectory %cd%
call nssm.exe install %ServiceName% "%cd%/index.exe"
call nssm start %ServiceName%
echo "Completed Service creation"

pause