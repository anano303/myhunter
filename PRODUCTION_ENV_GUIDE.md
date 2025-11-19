# 🚀 Production Deployment Instructions

## ფაილები რომლებიც შეიქმნა:

1. **server/.env.production** - Server-ის production environment
2. **web/.env.production** - Web-ის production environment

---

## 📋 Droplet-ზე .env ფაილის კოპირება

### Option 1: ხელით კოპირება (რეკომენდებული)

1. **გახსენი server/.env.production ფაილი**
2. **დააკოპირე სრული შიგთავსი**
3. **Droplet-ზე SSH-ით შესვლის შემდეგ**:

```bash
cd /var/www/myhunter/server
nano .env
```

4. **ჩასვი დაკოპირებული შიგთავსი**
5. **შეინახე**: `Ctrl+O`, `Enter`, `Ctrl+X`

### Option 2: SCP-ით ფაილის გადაგზავნა (PowerShell-დან)

```powershell
scp server\.env.production root@YOUR_DROPLET_IP:/var/www/myhunter/server/.env
```

---

## ⚠️ მნიშვნელოვანი: შეცვალე URL-ები!

### Server (.env.production):
```env
# შეცვალე ეს:
CLIENT_URL=https://www.myhunter.ge
ALLOWED_ORIGINS=https://www.myhunter.ge,https://myhunter.ge
SERVER_BASE_URL=https://api.myhunter.ge
GOOGLE_CALLBACK_URL=https://www.myhunter.ge/v1/auth/google/callback
BOG_CALLBACK_URL=https://api.myhunter.ge/v1/payments/bog/callback

# თუ domain არ გაქვს, გამოიყენე Droplet IP:
CLIENT_URL=http://YOUR_DROPLET_IP:3000
ALLOWED_ORIGINS=http://YOUR_DROPLET_IP:3000
SERVER_BASE_URL=http://YOUR_DROPLET_IP:4000
```

### Web (.env.production):
```env
# შეცვალე ეს:
NEXT_PUBLIC_API_URL=https://api.myhunter.ge/v1

# თუ domain არ გაქვს:
NEXT_PUBLIC_API_URL=http://YOUR_DROPLET_IP:4000/v1
```

---

## 🔐 უსაფრთხოება

**არასოდეს** commit-ი არ გააკეთო `.env.production` ფაილის GitHub-ზე!

დარწმუნდი რომ `.gitignore`-ში არის:
```
.env.production
.env.local
.env
```

---

## 🚀 Deployment-ის ნაბიჯები

### 1. Droplet-ზე .env ფაილის ატვირთვა:
```bash
cd /var/www/myhunter/server
nano .env
# ჩასვი server/.env.production-ის შიგთავსი
```

### 2. Docker Containers-ის გაშვება:
```bash
cd /var/www/myhunter/server
docker compose down
docker compose up -d --build
```

### 3. Logs-ის შემოწმება:
```bash
docker compose logs -f app
```

---

## ✅ რა არის უკვე კონფიგურირებული:

✅ MongoDB Atlas connection (cloud database)  
✅ Cloudinary (image hosting)  
✅ AWS S3 (file storage)  
✅ Email (Gmail SMTP)  
✅ Google OAuth  
✅ BOG Payment Gateway  
✅ Facebook Integration  
✅ PayPal  
✅ OpenAI API  

---

## 🌐 Domain Setup (არასავალდებულო)

თუ გაქვს domain (მაგ: myhunter.ge):

### DNS Records:
```
Type: A
Host: @
Value: YOUR_DROPLET_IP

Type: A  
Host: api
Value: YOUR_DROPLET_IP
```

შედეგი:
- `myhunter.ge` → Frontend
- `api.myhunter.ge` → Backend API

---

## 📝 Next Steps

1. ✅ `.env.production` ფაილები შექმნილია
2. 🔄 შეცვალე URL-ები შენი domain/IP-ით
3. 📤 ატვირთე `.env` ფაილი Droplet-ზე
4. 🐳 გაუშვი `docker compose up -d --build`
5. ✨ მზადაა!
