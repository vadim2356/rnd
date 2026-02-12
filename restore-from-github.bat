@echo off
cd /d "%~dp0"
git fetch https://github.com/vadim2356/rnd.git main
git reset --hard FETCH_HEAD
echo Done. Run: npm install
pause
