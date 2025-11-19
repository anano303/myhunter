# DigitalOcean App Platform დეპლოიმენტის ინსტრუქცია

## 🚀 როგორ დავდეპლოიო DigitalOcean App Platform-ზე

### 1️⃣ შექმენი App
1. შედი https://cloud.digitalocean.com/apps
2. დააჭირე **"Create App"**
3. აირჩიე **"GitHub"** source
4. აირჩიე repository: **anano303/myhunter**
5. აირჩიე branch: **main**
6. Source Directory: დატოვე empty (App Platform თავად იპოვის `/server` folder-ს)

### 2️⃣ კონფიგურაცია
DigitalOcean App Platform ავტომატურად დაადეტექტავს Node.js-ს, მაგრამ შენ უნდა დააკონფიგურო:

#### Build Settings:
- **Build Command**: `npm install && npm run build`
- **Run Command**: `npm run start`
- **Output Directory**: `dist`
- **Source Directory**: `/server`

#### Environment Variables:
დააჭირე **"Edit"** → **"Environment Variables"** და დაამატე ყველა:

```bash
NODE_ENV=production
PORT=8080

# MongoDB Atlas
DATABASE_URL=mongodb+srv://myhunter2107:ciwyYm8PZnCOr0LW@cluster0.no9olwg.mongodb.net/

# JWT
JWT_SECRET=<შენი JWT secret>
JWT_REFRESH_SECRET=<შენი JWT refresh secret>

# Cloudinary
CLOUDINARY_CLOUD_NAME=dcnz1iv0m
CLOUDINARY_API_KEY=<შენი key>
CLOUDINARY_API_SECRET=<შენი secret>

# AWS S3
AWS_ACCESS_KEY_ID=<შენი access key>
AWS_SECRET_ACCESS_KEY=<შენი secret key>
AWS_REGION=eu-central-1
AWS_S3_BUCKET=fish-hunt

# Email (Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=myhunter2107@gmail.com
EMAIL_PASSWORD=<შენი app password>
EMAIL_FROM=myhunter2107@gmail.com

# Google OAuth
GOOGLE_CLIENT_ID=<შენი client id>
GOOGLE_CLIENT_SECRET=<შენი secret>
GOOGLE_CALLBACK_URL=https://myhunter-pj436.ondigitalocean.app/auth/google/callback

# Facebook
FACEBOOK_APP_ID=<შენი app id>
FACEBOOK_APP_SECRET=<შენი secret>

# BOG Payment
BOG_CLIENT_ID=<შენი client id>
BOG_SECRET_KEY=<შენი secret>

# PayPal
PAYPAL_CLIENT_ID=<შენი client id>
PAYPAL_CLIENT_SECRET=<შენი secret>
PAYPAL_MODE=sandbox

# OpenAI
OPENAI_API_KEY=<შენი key>

# Frontend
FRONTEND_URL=https://www.myhunter.ge
```

**⚠️ მნიშვნელოვანი**: 
- ყველა SECRET-ის გასწვრივ ჩართე **"Encrypt"** checkbox!
- PORT უნდა იყოს **8080** (DigitalOcean-ის სტანდარტი)

### 3️⃣ Resources (ფასები)
აირჩიე instance size:
- **Basic - $5/month** (512MB RAM, 1 vCPU) - რეკომენდებული საწყისად
- **Pro - $12/month** (1GB RAM, 1 vCPU) - თუ მეტი მომხმარებელი გეყოლება

### 4️⃣ Region
აირჩიე:
- **Frankfurt (fra)** - ყველაზე ახლოს საქართველოსთან
- ან **London (lon)**

### 5️⃣ Deploy
1. დააჭირე **"Next"** → **"Create Resources"**
2. დაელოდე build process-ს (5-10 წუთი)
3. როცა მწვანე "Active" გახდება - მზად არის!

## 📡 შემდეგ რას ვაკეთებ?

### Swagger Documentation:
დადით ბრაუზერში: `https://myhunter-pj436.ondigitalocean.app/docs`

### Test API:
```bash
curl https://myhunter-pj436.ondigitalocean.app/health
```

### Frontend კონფიგურაცია:
შეცვალე `web/.env.production`:
```bash
NEXT_PUBLIC_API_URL=https://myhunter-pj436.ondigitalocean.app
```

## 🔄 ავტომატური დეპლოიმენტი
როცა GitHub-ზე `main` branch-ზე დაპუშავ:
1. DigitalOcean ავტომატურად დაიწყებს rebuild-ს
2. 5-10 წუთში ახალი ვერსია live იქნება
3. ნახავ progress-ს App Platform dashboard-ზე

## 🐛 თუ რაიმე არ მუშაობს:

### 1. შეამოწმე Logs:
App Platform → **"Runtime Logs"** tab

### 2. შეამოწმე Build Logs:
App Platform → **"Build Logs"** tab

### 3. შეამოწმე Health Check:
```bash
curl https://myhunter-pj436.ondigitalocean.app/docs
```

### 4. თუ 404 ERROR გაქვს:
- დარწმუნდი რომ `Run Command` არის: `npm run start`
- დარწმუნდი რომ `PORT=8080` environment variable არის
- შეამოწმე რომ `server/dist/` folder build-და

## 💰 ფასები
- **Basic Plan**: $5/month (512MB RAM, 1 vCPU)
- **Bandwidth**: 100GB/თვე (უფასო)
- **SSL Certificate**: უფასო (auto-generated)
- **Custom Domain**: უფასო (შეგიძლია დაამატო www.myhunter.ge)

## 🌐 Custom Domain დამატება:
1. App Settings → **"Domains"**
2. დაამატე: `api.myhunter.ge`
3. DNS-ში დაამატე CNAME record:
   ```
   api.myhunter.ge → myhunter-pj436.ondigitalocean.app
   ```

---

## ❗ სწრაფი შემოწმება:
```bash
# 1. ჯერ დაპუშე GitHub-ზე:
git add .
git commit -m "Add DigitalOcean App Platform support"
git push origin main

# 2. შემდეგ DigitalOcean-ზე:
# - App Platform დააჭირე "Deploy"
# - დაელოდე build-ს
# - გახსენი: https://myhunter-pj436.ondigitalocean.app/docs
```

გაქვს კითხვა? 😊
