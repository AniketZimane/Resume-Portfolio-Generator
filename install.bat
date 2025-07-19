@echo off
echo Installing frontend dependencies...
call npm install
echo.
echo Installing backend dependencies...
cd server
call npm install
cd ..
echo.
echo Installation complete!
echo To start the application, run: start-dev.bat
pause