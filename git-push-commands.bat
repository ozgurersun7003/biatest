@echo off
echo ====================================
echo GitHub'a Push Komutları
echo ====================================
echo.

REM Git repository'sini başlat
echo [1/5] Git repository'si başlatılıyor...
git init

REM Remote repository ekle
echo [2/5] Remote repository ekleniyor...
git remote add origin https://github.com/ozgurersun7003/biatest.git

REM Tüm dosyaları ekle
echo [3/5] Dosyalar stage'e ekleniyor...
git add .

REM Commit yap
echo [4/5] Commit yapılıyor...
git commit -m "Initial commit - Biabet Next.js project"

REM Main branch oluştur
echo [5/5] Main branch oluşturuluyor...
git branch -M main

REM Push yap
echo.
echo ====================================
echo GitHub'a push yapılıyor...
echo ====================================
git push -u origin main

echo.
echo ====================================
echo Tamamlandı!
echo ====================================
echo.
echo Eğer hata alırsanız, GitHub kullanıcı adı ve token girmeniz gerekebilir.
echo GitHub Settings -^> Developer settings -^> Personal access tokens
pause
