@echo off
setlocal

:: Define Cursor executable path
set "cursorPath=C:\Users\Administrator\AppData\Local\Programs\cursor\Cursor.exe"

:: Check if path was provided (from right-click context)
if "%~1"=="" (
    set "target=%cd%"
) else (
    set "target=%~1"
)

:: If it's a file, get its parent folder
if exist "%target%" (
    if not exist "%target%\" (
        for %%F in ("%target%") do set "target=%%~dpF"
    )
)

:: Launch Cursor at the resolved path
start "" "%cursorPath%" "%target%"
