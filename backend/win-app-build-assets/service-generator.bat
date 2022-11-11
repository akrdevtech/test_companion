echo "################################################"
echo "Adding Application as a service"
echo "################################################"

set "ServiceName=AkrStudyCentre"

echo "Removing existing service - started"
call sc.exe delete %ServiceName%
echo "Removing existing service - completed"

echo "Starting Service creation"
call nssm.exe set %ServiceName% AppDirectory "%cd%\index.exe"
nssm install %ServiceName%
echo "Completed Service creation"
