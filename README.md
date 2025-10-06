# KayraExport FullStack Project

Bu proje **Next.js frontend** ve **ASP.NET Core backend** ile geliştirilmiş bir full-stack e-ticaret uygulamasıdır.  
Docker kullanılarak PostgreSQL ve pgAdmin ile çalışacak şekilde yapılandırılmıştır.  

---

## 📂 Proje Yapısı

- `FullStackCase.Api/` → Backend (ASP.NET Core Web API)
- `frontend/` → Frontend (Next.js)
- `frontend/services/` → Servisler (auth, product vb.)
- `frontend/app/` → Next.js sayfaları
- `frontend/components/` → Navbar, ProtectedRoute vb.
- `docker-compose.yml` → PostgreSQL ve pgAdmin container yapılandırması

---

## ⚙️ Kurulum

### 1️⃣ Projeyi İndirme

#### a) Zip ile
1. GitHub’dan **Download ZIP** seçeneği ile projeyi indir.
2. Zip dosyasını aç ve uygun bir klasöre çıkar.

#### b) Git Clone ile
```bash
git clone https://github.com/kullaniciadi/proje-adi.git
cd proje-adi
