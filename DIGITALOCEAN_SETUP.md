# 🚀 DigitalOcean Droplet Setup Guide (ქართულად)

## ⚡ სწრაფი დეპლოიმენტი ($6-12/თვე)

ეს გაიდი დაგეხმარებათ დააყენოთ MyHunter აპლიკაცია DigitalOcean Droplet-ზე Docker-ის გამოყენებით, ავტომატური GitHub დეპლოიმენტით.

---

## 📋 წინაპირობები

- DigitalOcean ანგარიში
- GitHub ანგარიში (რეპოზიტორია უკვე არსებობს)
- დომეინი (არასავალდებულო, მაგრამ რეკომენდებულია)

---

## 1️⃣ DigitalOcean Droplet-ის შექმნა

### ნაბიჯი 1: Droplet-ის შექმნა

1. **გადადით DigitalOcean-ზე**: https://cloud.digitalocean.com/
2. **დააჭირეთ "Create" → "Droplets"**
3. **აირჩიეთ პარამეტრები**:

   **Image (ოპერაციული სისტემა)**:

   - Ubuntu 22.04 LTS x64 (რეკომენდებული)

   **Droplet Type**:

   - Basic (საკმარისია)

   **CPU options**:

   - **Regular - $6/თვე**: 1GB RAM, 1 CPU, 25GB SSD (მინიმუმი)
   - **Regular - $12/თვე**: 2GB RAM, 1 CPU, 50GB SSD (რეკომენდებული)

   **Datacenter Region**:

   - Frankfurt (ევროპა - ყველაზე ახლოს საქართველოსთან)

   **Authentication**:

   - აირჩიეთ "SSH Keys" (უფრო უსაფრთხო)
   - ან "Password" (მარტივი, მაგრამ ნაკლებად უსაფრთხო)

   **Hostname**:

   - `myhunter-production` (ან სასურველი სახელი)

4. **დააჭირეთ "Create Droplet"**
5. **დაელოდეთ 1-2 წუთს** სანამ Droplet შეიქმნება

---

## 2️⃣ SSH Key-ის გენერირება (თუ არ გაქვთ)

თუ SSH Key აირჩიეთ ავთენტიფიკაციისთვის:

### Windows-ზე (PowerShell):

```powershell
ssh-keygen -t ed25519 -C "your_email@example.com"
```

### შენახვის მდებარეობა:

- Press Enter (default location: `C:\Users\YourName\.ssh\id_ed25519`)
- შეიყვანეთ passphrase (არასავალდებულო)

### Public Key-ის კოპირება:

```powershell
cat ~/.ssh/id_ed25519.pub
```

კოპირების შემდეგ, დაამატეთ ეს key DigitalOcean-ზე:

1. Settings → Security → SSH Keys → Add SSH Key
2. ჩასვით public key და მიეცით სახელი

---

## 3️⃣ Droplet-თან დაკავშირება

### IP მისამართის მოძიება:

DigitalOcean Dashboard-ზე ნახავთ თქვენი Droplet-ის IP მისამართს (მაგ: `164.92.123.45`)

### დაკავშირება SSH-ით:

```bash
ssh root@YOUR_DROPLET_IP
```

**პირველად შემოსვლისას**:

- დაადასტურეთ fingerprint (დაწერეთ "yes")
- თუ password გამოიყენეთ, შეიყვანეთ იგი

---

## 4️⃣ Server-ის მომზადება

### ნაბიჯი 1: სისტემის განახლება

```bash
apt update && apt upgrade -y
```

### ნაბიჯი 2: Docker-ის დაყენება

```bash
# Docker-ის ოფიციალური repository-ის დამატება
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Docker Compose-ის დაყენება
apt install docker-compose-plugin -y

# Docker service-ის გაშვება
systemctl start docker
systemctl enable docker

# შემოწმება
docker --version
docker compose version
```

### ნაბიჯი 3: Git-ის დაყენება

```bash
apt install git -y
git --version
```

### ნაბიჯი 4: პროექტის directory-ის შექმნა

```bash
mkdir -p /var/www
cd /var/www
```

---

## 5️⃣ პროექტის Clone-ი GitHub-იდან

### ნაბიჯი 1: GitHub Personal Access Token-ის გენერირება

1. **GitHub-ზე გადადით**: https://github.com/settings/tokens
2. **"Generate new token" → "Generate new token (classic)"**
3. **აირჩიეთ permissions**:
   - `repo` (სრული წვდომა repositories-ზე)
4. **"Generate token"** და დაკოპირეთ token (ერთხელ გამოჩნდება!)

### ნაბიჯი 2: Repository-ის Clone

```bash
cd /var/www
git clone https://github.com/anano303/myhunter.git
cd myhunter
```

**თუ private repository-ა**:

```bash
git clone https://YOUR_GITHUB_USERNAME:YOUR_PERSONAL_ACCESS_TOKEN@github.com/anano303/myhunter.git
```

---

## 6️⃣ Environment Variables-ის კონფიგურაცია

### ნაბიჯი 1: Server .env ფაილის შექმნა

```bash
cd /var/www/myhunter/server
cp .env.example .env
nano .env
```

### მნიშვნელოვანი: შეცვალეთ შემდეგი მნიშვნელობები:

```env
# MongoDB Configuration
MONGO_USERNAME=admin
MONGO_PASSWORD=GENERATE_STRONG_PASSWORD_HERE  # შეცვალეთ ძლიერი პაროლით!

# JWT Secrets (გენერირება: openssl rand -base64 32)
JWT_ACCESS_SECRET=YOUR_GENERATED_SECRET_MIN_32_CHARS
JWT_REFRESH_SECRET=YOUR_GENERATED_SECRET_MIN_32_CHARS

# Client URLs
CLIENT_URL=https://yourdomain.com  # თქვენი დომეინი
ALLOWED_ORIGINS=https://yourdomain.com

# Cloudinary (თქვენი Cloudinary ანგარიშიდან)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# AWS S3 (თქვენი AWS ანგარიშიდან)
AWS_ACCESS_KEY=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_BUCKET_NAME=your_bucket
AWS_REGION=us-east-1

# Email (Gmail app password)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM=noreply@yourdomain.com
ADMIN_EMAIL=admin@yourdomain.com
```

### 🔐 უსაფრთხო პაროლების გენერირება:

```bash
# JWT Secrets-ის გენერირება
openssl rand -base64 32
openssl rand -base64 32

# ან უფრო ძლიერი (64 ბაიტი):
openssl rand -base64 64
```

### შენახვა:

- `Ctrl + O` (შენახვა)
- `Enter` (დადასტურება)
- `Ctrl + X` (გასვლა)

---

## 7️⃣ Docker Containers-ის გაშვება

### ნაბიჯი 1: პირველი Build და გაშვება

```bash
cd /var/www/myhunter/server
docker compose up -d --build
```

რას აკეთებს ეს ბრძანება:

- `up`: containers-ის გაშვება
- `-d`: background-ში გაშვება (detached mode)
- `--build`: Docker image-ების build

### ნაბიჯი 2: Logs-ის შემოწმება

```bash
# ყველა container-ის logs
docker compose logs

# მხოლოდ app container-ის logs
docker compose logs app

# Real-time logs-ის ნახვა
docker compose logs -f app
```

### ნაბიჯი 3: Containers-ის სტატუსის შემოწმება

```bash
docker compose ps
```

უნდა ნახოთ:

- `myhunter-mongodb` - Up
- `myhunter-api` - Up

---

## 8️⃣ Firewall-ის კონფიგურაცია

### UFW Firewall-ის დაყენება:

```bash
# UFW-ის გააქტიურება
ufw allow OpenSSH
ufw allow 4000/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable

# Status-ის შემოწმება
ufw status
```

---

## 9️⃣ GitHub Actions CI/CD-ის დაყენება

### ნაბიჯი 1: GitHub Secrets-ის დამატება

1. **გადადით თქვენს GitHub repository-ში**: https://github.com/anano303/myhunter
2. **Settings → Secrets and variables → Actions**
3. **"New repository secret"** და დაამატეთ:

```
DROPLET_IP
Value: თქვენი Droplet-ის IP მისამართი

DROPLET_USER
Value: root

SSH_PRIVATE_KEY
Value: თქვენი SSH private key-ის შიგთავსი
```

### SSH Private Key-ის მოძიება:

**Windows PowerShell**:

```powershell
cat ~/.ssh/id_ed25519
```

**კოპირება**: სრული შიგთავსი, ჩათვლით `-----BEGIN` და `-----END` ხაზები

### ნაბიჯი 2: Deploy Script-ის გამართვადობის მინიჭება

```bash
chmod +x /var/www/myhunter/server/deploy.sh
```

### ნაბიჯი 3: GitHub Actions-ის ტესტირება

1. **შეცვალეთ რამე ფაილი** თქვენს repository-ში
2. **Commit და Push main branch-ში**:

```bash
git add .
git commit -m "test: trigger deployment"
git push origin main
```

3. **შეამოწმეთ GitHub-ზე**:
   - გადადით: Actions tab → უნდა ნახოთ workflow-ის გაშვება
   - დელოდეთ სანამ ✅ მწვანე checkmark გამოჩნდება

### ნაბიჯი 4: Droplet-ზე შემოწმება

```bash
cd /var/www/myhunter
git log -1  # ბოლო commit უნდა გამოჩნდეს

docker compose ps  # containers უნდა run-ობდნენ
```

---

## 🔟 Domain-ის დაყენება (არასავალდებულო მაგრამ რეკომენდებული)

### ნაბიჯი 1: DNS Records-ის კონფიგურაცია

თქვენს Domain Provider-ში (Namecheap, GoDaddy, და ა.შ.) დაამატეთ:

**A Records**:

```
Type: A
Host: @
Value: YOUR_DROPLET_IP
TTL: 300

Type: A
Host: api
Value: YOUR_DROPLET_IP
TTL: 300
```

**ამის შემდეგ**:

- `yourdomain.com` → Next.js frontend
- `api.yourdomain.com` → NestJS backend API

### ნაბიჯი 2: Nginx Reverse Proxy-ის დაყენება

```bash
apt install nginx -y

# API-ის კონფიგურაცია
nano /etc/nginx/sites-available/api.yourdomain.com
```

**ჩასვით**:

```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

**გააქტიურება**:

```bash
ln -s /etc/nginx/sites-available/api.yourdomain.com /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

### ნაბიჯი 3: SSL Certificate (HTTPS) - Let's Encrypt

```bash
# Certbot-ის დაყენება
apt install certbot python3-certbot-nginx -y

# SSL Certificate-ის მიღება
certbot --nginx -d api.yourdomain.com

# ავტომატური განახლება
certbot renew --dry-run
```

---

## 🔧 სასარგებლო ბრძანებები

### Docker Management:

```bash
# Containers-ის სტატუსი
docker compose ps

# Containers-ის გაჩერება
docker compose stop

# Containers-ის გაშვება
docker compose start

# Containers-ის წაშლა და ხელახლა გაშვება
docker compose down && docker compose up -d --build

# Logs-ის ნახვა
docker compose logs -f app

# Container-ში შესვლა
docker exec -it myhunter-api sh
```

### Git Operations:

```bash
# ბოლო ცვლილებების Pull
cd /var/www/myhunter
git pull origin main

# სტატუსის შემოწმება
git status

# ბოლო commits
git log --oneline -5
```

### MongoDB Management:

```bash
# MongoDB shell-ში შესვლა
docker exec -it myhunter-mongodb mongosh -u admin -p YOUR_MONGO_PASSWORD

# Backup-ის შექმნა
docker exec myhunter-mongodb mongodump --out /data/backup --authenticationDatabase admin -u admin -p YOUR_MONGO_PASSWORD

# Backup-ის კოპირება host-ზე
docker cp myhunter-mongodb:/data/backup ./mongodb-backup-$(date +%Y%m%d)
```

### System Resources:

```bash
# Disk space-ის შემოწმება
df -h

# RAM გამოყენება
free -h

# CPU და მეხსიერება
htop  # (დაინსტალირეთ: apt install htop)

# Docker disk usage
docker system df
```

---

## 📊 Monitoring და Logging

### Application Logs:

```bash
# Real-time logs
docker compose logs -f

# ბოლო 100 ხაზი
docker compose logs --tail=100

# დროის ფილტრი
docker compose logs --since 30m
```

### MongoDB Logs:

```bash
docker compose logs mongodb
```

### Nginx Logs:

```bash
# Access logs
tail -f /var/log/nginx/access.log

# Error logs
tail -f /var/log/nginx/error.log
```

---

## 🚨 პრობლემების მოგვარება (Troubleshooting)

### პრობლემა 1: Containers არ ეშვება

```bash
# შეამოწმეთ logs
docker compose logs

# რესტარტი
docker compose restart

# სრული rebuild
docker compose down
docker compose up -d --build
```

### პრობლემა 2: MongoDB Connection Error

```bash
# შეამოწმეთ MongoDB container
docker compose logs mongodb

# შეამოწმეთ .env ფაილში MONGODB_URI
cat .env | grep MONGODB_URI

# MongoDB-ში შესვლა
docker exec -it myhunter-mongodb mongosh
```

### პრობლემა 3: Out of Disk Space

```bash
# Disk space-ის შემოწმება
df -h

# არაგამოყენებული Docker images-ის წაშლა
docker image prune -a -f

# არაგამოყენებული volumes-ის წაშლა
docker volume prune -f

# System-wide cleanup
docker system prune -a -f
```

### პრობლემა 4: GitHub Actions Failed

```bash
# Droplet-ზე შეამოწმეთ:
cd /var/www/myhunter
git pull origin main  # მუშაობს თუ არა

# SSH Connection-ის ტესტირება GitHub-იდან
# შეამოწმეთ SSH_PRIVATE_KEY სწორედ არის დამატებული
```

### პრობლემა 5: Environment Variables არ მუშაობს

```bash
# .env ფაილის არსებობა
ls -la /var/www/myhunter/server/.env

# .env ფაილის შემოწმება
cat /var/www/myhunter/server/.env

# Containers-ის restart .env ცვლილების შემდეგ
docker compose down
docker compose up -d
```

---

## 🔄 პროექტის განახლება (Manual)

როდესაც `.env` ფაილში რამე იცვლება:

```bash
cd /var/www/myhunter/server

# 1. შეცვალეთ .env ფაილი
nano .env

# 2. Containers-ის რესტარტი
docker compose down
docker compose up -d

# 3. Logs-ის შემოწმება
docker compose logs -f app
```

**მნიშვნელოვანი**: `.env` ცვლილებები არ ვრცელდება GitHub-ზე (`.gitignore`-ში არის)

---

## 💡 Best Practices

### 1. Security:

- ✅ **ძლიერი პაროლები გამოიყენეთ** MongoDB და JWT secrets-ისთვის
- ✅ **SSH Keys გამოიყენეთ** password-ის ნაცვლად
- ✅ **UFW Firewall-ი ჩართეთ**
- ✅ **Fail2ban დააყენეთ** SSH brute-force attacks-ისგან დასაცავად
- ✅ **რეგულარულად განაახლეთ** სისტემა (`apt update && apt upgrade`)

### 2. Backups:

```bash
# MongoDB Backup Script (შეინახეთ როგორც /root/backup-mongo.sh)
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
docker exec myhunter-mongodb mongodump --out /data/backup-$DATE --authenticationDatabase admin -u admin -p $MONGO_PASSWORD
docker cp myhunter-mongodb:/data/backup-$DATE /root/backups/
echo "Backup completed: backup-$DATE"

# Cron Job-ის დამატება (ყოველდღე 2 AM)
crontab -e
# დაამატეთ: 0 2 * * * /root/backup-mongo.sh
```

### 3. Monitoring:

- რეგულარულად შეამოწმეთ logs
- გააკონტროლეთ disk space
- გამოიყენეთ DigitalOcean Monitoring (უფასოა)

### 4. Updates:

- რეგულარულად pull-ით GitHub changes
- რესტარტი containers ცვლილებების შემდეგ
- ნახეთ GitHub Actions history რეგულარულად

---

## 📝 Checklist: პირველი Deployment

- [ ] ✅ Droplet შექმნილია DigitalOcean-ზე
- [ ] ✅ SSH-ით დაკავშირებული
- [ ] ✅ Docker და Docker Compose დაინსტალირდა
- [ ] ✅ Git დაინსტალირდა
- [ ] ✅ Repository clone-ილია `/var/www/myhunter`
- [ ] ✅ `.env` ფაილი შექმნილია და კონფიგურირებულია
- [ ] ✅ ძლიერი პაროლები და secrets გენერირებულია
- [ ] ✅ Docker containers build-ილია და run-ობს
- [ ] ✅ Firewall (UFW) კონფიგურირებულია
- [ ] ✅ GitHub Secrets დამატებულია
- [ ] ✅ GitHub Actions workflow ტესტირებულია
- [ ] ✅ Domain DNS records დამატებულია (თუ გაქვთ)
- [ ] ✅ Nginx reverse proxy კონფიგურირებულია
- [ ] ✅ SSL Certificate (Let's Encrypt) დაინსტალირდა

---

## 🎉 შედეგი

თქვენი აპლიკაცია ახლა:

- 🚀 **Run-ობს DigitalOcean Droplet-ზე**
- 🔄 **ავტომატურად დეპლოიდება** როდესაც GitHub-ზე push-ს აკეთებთ
- 🐳 **Docker-ში გაშვებულია** მარტივი management-ისთვის
- 📦 **MongoDB თქვენს containers-ში არის** - მონაცემები უსაფრთხოა
- 💰 **იაფია** - $6-12/თვე

---

## 📞 დახმარება

თუ პრობლემა გაქვთ:

1. **შეამოწმეთ logs**: `docker compose logs -f`
2. **GitHub Actions**: გადახედეთ failed workflow logs-ს
3. **Droplet Console**: DigitalOcean dashboard-ზე შეგიძლიათ browser console-ში შესვლა

---

## 🔗 სასარგებლო ლინკები

- **DigitalOcean Docs**: https://docs.digitalocean.com/
- **Docker Docs**: https://docs.docker.com/
- **MongoDB Docs**: https://docs.mongodb.com/
- **Let's Encrypt**: https://letsencrypt.org/

---

**შეკითხვები?** დამიწერეთ ან გახსენით Issue GitHub repository-ში! 🚀
