# KayraExport FullStack Project

Bu proje Next.js frontend ve ASP.NET Core backend ile geliştirilmiş bir full-stack e-ticaret uygulamasıdır.
Docker kullanılarak PostgreSQL ve pgAdmin ile çalışacak şekilde yapılandırılmıştır.

---

# Proje Yapısı

- FullStackCase.Api/ → Backend (ASP.NET Core Web API)
- frontend/ → Frontend (Next.js)
- frontend/services/ → Servisler (auth, product vb.)
- frontend/app/ → Next.js sayfaları
- frontend/components/ → Navbar, ProtectedRoute vb.
- docker-compose.yml → PostgreSQL ve pgAdmin container yapılandırması

---

# Kurulum

## 1️⃣ Projeyi İndirme

### a) Zip ile
1. GitHub’dan Download ZIP seçeneği ile projeyi indir.
2. Zip dosyasını aç ve uygun bir klasöre çıkar.

### b) Git Clone ile
git clone https://github.com/nams068/FullStackCase.Api
cd FullStackCase.Api

---

## 2️⃣ Docker ile Database Kurulumu

Proje root dizininde docker-compose.yml mevcut. PostgreSQL ve pgAdmin containerları çalıştırmak için:

docker-compose up -d

PostgreSQL:
POSTGRES_USER=postgres
POSTGRES_PASSWORD=SeninSifren
POSTGRES_DB=fullstackcase_db

pgAdmin:
Erişim: http://localhost:5050
Default login: admin@admin.com / admin

Database containerı çalışınca backend’i çalıştırmadan önce bağlantı ayarlarının (appsettings.json) doğru olduğundan emin ol.

---

## 3️⃣ Backend Kurulumu (ASP.NET Core)

Visual Studio 2022 veya .NET 8 SDK kurulu olmalı.

Backend terminalini aç (ya da VS Package Manager Console):

cd FullStackCase.Api
dotnet restore

Database migration ekle ve güncelle:

Add-Migration AddUserIdAndStockToProduct
Update-Database

PostgreSQL kullanıyorsan connection string appsettings.json içinde backend container’ına uygun ayarlanmalı.

Backend’i çalıştır:

dotnet run

API varsayılan olarak https://localhost:7025 üzerinde çalışacak.

---

## 4️⃣ Frontend Kurulumu (Next.js)

Node.js >= 18 yüklü olmalı.

Terminali frontend dizininde aç:

cd frontend
npm install
# veya
yarn install
# veya
pnpm install

Next.js uygulamasını çalıştır:

npm run dev
# veya
yarn dev
# veya
pnpm dev

Tarayıcıda http://localhost:3000 adresini aç.

---

## 5️⃣ Önemli Notlar

Auth sistemi: Login/Register işlemleri localStorage ile token bazlı çalışır.

ProtectedRoute: Sadece giriş yapmış kullanıcıların erişebileceği sayfalar için kullanılır.

Navbar: Giriş durumuna göre farklı butonlar gösterir.

Redux Toolkit: Sepet yönetimi global state üzerinden yapılır.

Kullanıcıya özel sayfalar: My Products, Profile gibi sayfalar token ile korunur.

Kişiye özel ürünler: Product modeline eklenen UserId ile kullanıcıya özel ürün ekleme, güncelleme ve silme işlemleri yapılabilir.

---

## 6️⃣ Geliştirme İpuçları

Yeni bir model veya kolon eklediğinizde:

Add-Migration MigrationAdi
Update-Database

Frontend’de yeni bir sayfa eklemek için frontend/app altına .tsx dosyası oluştur.

Özel sayfalar için ProtectedRoute component’i kullan.

---

## 7️⃣ Kullanılan Teknolojiler

Backend: .NET 8, ASP.NET Core Web API, Entity Framework Core, PostgreSQL

Frontend: Next.js 14, React, TypeScript, TailwindCSS

State Management: Redux Toolkit (Sepet)

Docker: PostgreSQL ve pgAdmin containerları

Diğer: LocalStorage token yönetimi, responsive tasarım, image optimization (Next/Image)

---

## 8️⃣ Çalıştırma Özet

Docker ile PostgreSQL + pgAdmin çalıştır:

docker-compose up -d

Backend’i çalıştır:

cd FullStackCase.Api
dotnet run

Frontend’i çalıştır:

cd frontend
npm run dev

Tarayıcıda http://localhost:3000 aç ve projeyi kullan.
