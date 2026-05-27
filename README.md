# POS Fullstack

React ve Node.js ile gelistirilmis fullstack POS (satis noktasi) uygulamasi. Uygulama; urun, kategori, sepet, fatura, musteri ve satis istatistikleri yonetimini tek bir arayuzde toplar.

## Ozellikler

- Kullanici kayit ve giris islemleri
- Urun ve kategori ekleme, guncelleme, silme
- Sepete urun ekleme ve satis/fatura olusturma
- Fatura listesi ve musteri gecmisi
- Gunluk satis ve musteri bazli kazanc istatistikleri
- Yazdirilabilir fatura ekrani
- Redux ile sepet durum yonetimi

## Teknolojiler

**Frontend**

- React
- Vite
- React Router
- Redux Toolkit
- Ant Design ve Ant Design Charts
- Tailwind CSS

**Backend**

- Node.js
- Express
- MongoDB
- Mongoose
- bcryptjs
- dotenv

## Proje Yapisi

```text
pos-fullstack/
  api/       # Express API ve MongoDB modelleri
  client/    # React + Vite istemci uygulamasi
```

## Kurulum

Projeyi calistirmadan once bilgisayarinizda Node.js ve MongoDB baglantisi hazir olmalidir.

### 1. Repoyu klonlayin

```bash
git clone <repo-url>
cd pos-fullstack
```

### 2. Backend bagimliliklarini yukleyin

```bash
cd api
npm install
```

`api` klasorunde `.env` dosyasi olusturun:

```env
MONGO_URI=mongodb://localhost:27017/pos-fullstack
```

MongoDB Atlas kullaniyorsaniz `MONGO_URI` alanina Atlas connection string'inizi yazin.

### 3. Frontend bagimliliklarini yukleyin

```bash
cd ../client
npm install
```

## Calistirma

Backend sunucusunu baslatin:

```bash
cd api
npm run dev
```

API varsayilan olarak su adreste calisir:

```text
http://localhost:5000
```

Frontend uygulamasini baslatin:

```bash
cd client
npm run dev
```

Vite ciktisinda verilen localhost adresini tarayicida acin.

## Kullanilabilir Komutlar

Backend:

```bash
npm run dev      # nodemon ile gelistirme sunucusu
npm start        # node ile production baslatma
```

Frontend:

```bash
npm run dev      # Vite gelistirme sunucusu
npm run build    # Production build
npm run preview  # Build onizleme
npm run lint     # ESLint kontrolu
```

## API Endpointleri

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`

### Categories

- `GET /api/categories/get-all`
- `POST /api/categories/add-category`
- `PUT /api/categories/update-category`
- `DELETE /api/categories/delete-category`

### Products

- `GET /api/products/get-all`
- `POST /api/products/add-product`
- `PUT /api/products/update-product`
- `DELETE /api/products/delete-product`

### Bills

- `GET /api/bills/get-all`
- `POST /api/bills/add-bill`

### Users

- `GET /api/users/get-all`
- `GET /api/users`

## Notlar

- Frontend API istekleri su an `http://localhost:5000` adresine gore ayarlanmistir.
- Sepet verisi tarayicinin `localStorage` alaninda saklanir.
- Korumali sayfalara erisim icin giris yapildiktan sonra `localStorage` icinde `popUser` bilgisi kullanilir.

