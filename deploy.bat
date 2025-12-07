@echo off
setlocal enabledelayedexpansion

echo ========================================
echo   TradeBlade Automated Site Deployment
echo ========================================

:: Find the newest ZIP file in the folder
set newestZip=
for %%F in (*.zip) do (
    if not defined newestZip (
        set newestZip=%%F
    ) else (
        for /f "tokens=1,2 delims==" %%a in ('wmic datafile where "name='!cd!\%%F'" get lastmodified /value ^| find "="') do set currDate=%%b
        for /f "tokens=1,2 delims==" %%a in ('wmic datafile where "name='!cd!\%newestZip%'" get lastmodified /value ^| find "="') do set oldDate=%%b
        if !currDate! gtr !oldDate! set newestZip=%%F
    )
)

if not defined newestZip (
    echo ERROR: No ZIP file found in this folder.
    pause
    exit /b
)

echo Newest ZIP found: %newestZip%
echo Extracting...

:: Extract ZIP to a folder with the same name
powershell -command "Expand-Archive -Path '%newestZip%' -DestinationPath '%newestZip%.dir' -Force"

set extractedFolder=%newestZip%.dir

echo Extraction complete: %extractedFolder%
echo.

echo Deleting OLD site files...
for /d %%D in (*) do (
    if /I not "%%D"==".git" if /I not "%%D"=="%extractedFolder%" (
        echo Removing directory: %%D
        rmdir /s /q "%%D"
    )
)

for %%F in (*) do (
    if /I not "%%F"==".git" if /I not "%%F"=="CNAME" if /I not "%%F"=="deploy.bat" if /I not "%%F"=="%newestZip%" if /I not "%%F"=="%extractedFolder%" (
        echo Removing file: %%F
        del /q "%%F"
    )
)

echo.
echo Copying NEW site content into the repo root...
xcopy "%extractedFolder%\*" . /E /H /C /I /Y

echo.
echo Cleaning temporary files...
del "%newestZip%"
rmdir /s /q "%extractedFolder%"

echo.
echo Committing and pushing to GitHub...

git add -A
git commit -m "Auto-deploy from %newestZip%"
git push -f

echo.
echo ========================================
echo      Deployment Completed SUCCESSFULLY
echo ========================================
pause
