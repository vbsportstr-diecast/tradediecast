# 🚗 TradeDiecast — Complete Deployment Guide
### From zero to live website. Every single step spelled out.

---

## What you'll be setting up
| Service    | What it does               | Cost     |
|------------|----------------------------|----------|
| GitHub     | Stores your code           | Free     |
| Supabase   | Database + Auth + Storage  | Free     |
| Cloudinary | Photo uploads/storage      | Free     |
| Stripe     | Payments                   | Free (2.9% per sale) |
| Railway    | Runs your backend server   | Free ($5 credit) |
| Vercel     | Hosts your frontend        | Free     |
| Namecheap  | Your domain name           | ~$9/yr   |

**Total upfront cost: ~$9** (just the domain)

---

## STEP 1 — Install tools on your computer

### 1a. Install Node.js
1. Go to **https://nodejs.org**
2. Click the big green **"LTS"** button to download
3. Open the downloaded file and click through the installer
4. When done, open **Terminal** (Mac) or **Command Prompt** (Windows)
5. Type `node --version` and press Enter — you should see something like `v20.0.0`

### 1b. Install Git
1. Go to **https://git-scm.com/downloads**
2. Download for your operating system and install it
3. In Terminal, type `git --version` — you should see a version number

### 1c. Open the project folder in Terminal
On **Mac**: Open Terminal, type `cd ` (with a space), then drag the `tradediecast` folder onto the Terminal window, press Enter
On **Windows**: Open the `tradediecast` folder, hold Shift + right-click inside the folder, choose "Open PowerShell window here"

---

## STEP 2 — Create a GitHub account and upload your code

GitHub stores your code online and lets Vercel/Railway auto-deploy it.

1. Go to **https://github.com** and click **Sign up** (free)
2. Create your account, verify your email
3. Click the **+** button in the top right → **New repository**
4. Name it `tradediecast`, keep it **Private**, click **Create repository**
5. GitHub shows you some commands. In your Terminal (inside the tradediecast folder), run these one by one:

```bash
git init
git add .
git commit -m "Initial TradeDiecast project"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/tradediecast.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

✅ Your code is now on GitHub.

---

## STEP 3 — Set up Supabase (database + auth)

1. Go to **https://supabase.com** → **Start your project** → sign up with GitHub
2. Click **New project**
3. Fill in:
   - **Name**: tradediecast
   - **Database password**: choose a strong password and **save it somewhere**
   - **Region**: pick the one closest to you
4. Click **Create new project** — wait about 2 minutes for it to set up
5. When ready, click **SQL Editor** in the left sidebar
6. Click **New query**
7. Open the file `backend/schema.sql` from your project folder
8. Copy everything inside it and paste it into the SQL Editor
9. Click the green **Run** button
10. You should see "Success. No rows returned" — that means it worked ✅

### Get your Supabase keys:
1. In Supabase, click **Settings** (gear icon, bottom left) → **API**
2. Copy and save these — you'll need them soon:
   - **Project URL** (looks like `https://abcxyz.supabase.co`)
   - **anon public** key (long string starting with `eyJ`)
   - **service_role** key (another long string — keep this secret!)

---

## STEP 4 — Set up Cloudinary (photo uploads)

1. Go to **https://cloudinary.com** → **Sign up for free**
2. After signing in, you'll see a **Dashboard**
3. Copy and save:
   - **Cloud name** (top of dashboard)
   - **API Key**
   - **API Secret**

---

## STEP 5 — Set up Stripe (payments)

1. Go to **https://stripe.com** → **Start now** → create an account
2. Verify your email and complete setup
3. In the Stripe dashboard, click **Developers** → **API keys**
4. Copy and save:
   - **Publishable key** (starts with `pk_live_` or `pk_test_` for testing)
   - **Secret key** (starts with `sk_live_` or `sk_test_`)

> 💡 Use the **test mode** keys first (toggle at top right of Stripe dashboard). This lets you test payments without real money.

---

## STEP 6 — Deploy the backend to Railway

1. Go to **https://railway.app** → **Login with GitHub**
2. Click **New project** → **Deploy from GitHub repo**
3. Select your `tradediecast` repository
4. Railway will try to auto-detect the project. When asked, set:
   - **Root directory**: `backend`
5. Click **Add variables** and add each one below (copy from your notes):

```
PORT                  = 4000
NODE_ENV              = production
SUPABASE_URL          = (your Supabase Project URL)
SUPABASE_SERVICE_KEY  = (your Supabase service_role key)
STRIPE_SECRET_KEY     = (your Stripe secret key)
STRIPE_WEBHOOK_SECRET = (leave blank for now — add after Step 7)
CLOUDINARY_CLOUD_NAME = (your Cloudinary cloud name)
CLOUDINARY_API_KEY    = (your Cloudinary API key)
CLOUDINARY_API_SECRET = (your Cloudinary API secret)
FRONTEND_URL          = https://tradediecast.com
```

6. Click **Deploy** — wait about 2 minutes
7. When deployed, click your project → **Settings** → copy the **Railway URL** (looks like `https://tradediecast-backend.up.railway.app`)

### Set up Stripe webhooks:
1. In Stripe dashboard → **Developers** → **Webhooks** → **Add endpoint**
2. Endpoint URL: `https://YOUR-RAILWAY-URL.up.railway.app/api/webhooks/stripe`
3. Click **Select events** → choose `checkout.session.completed`
4. Click **Add endpoint**
5. Click the webhook you just created → copy the **Signing secret** (starts with `whsec_`)
6. Go back to Railway → add `STRIPE_WEBHOOK_SECRET` = the signing secret

✅ Backend is live.

---

## STEP 7 — Deploy the frontend to Vercel

1. Go to **https://vercel.com** → **Sign up with GitHub**
2. Click **Add new** → **Project**
3. Find your `tradediecast` repository and click **Import**
4. Set **Root directory** to `frontend`
5. Click **Environment Variables** and add:

```
VITE_SUPABASE_URL           = (your Supabase Project URL)
VITE_SUPABASE_ANON_KEY      = (your Supabase anon public key)
VITE_STRIPE_PUBLISHABLE_KEY = (your Stripe publishable key)
VITE_API_URL                = (your Railway URL from Step 6)
```

6. Click **Deploy** — wait about 1 minute
7. Vercel gives you a URL like `https://tradediecast.vercel.app` — your site is live!

✅ Frontend is live.

---

## STEP 8 — Connect your domain (tradediecast.com)

### In Vercel:
1. Go to your project → **Settings** → **Domains**
2. Type `tradediecast.com` → **Add**
3. Also add `www.tradediecast.com`
4. Vercel shows you some DNS records to add

### In Namecheap:
1. Log in at **namecheap.com** → **Domain List** → click **Manage** next to tradediecast.com
2. Click **Advanced DNS**
3. Delete any existing A records or CNAME records
4. Add the records Vercel told you to add (usually an A record and a CNAME)
5. Click the green ✅ to save each one

DNS changes take 10–30 minutes to spread around the internet. After that, **https://tradediecast.com** will load your site!

---

## STEP 9 — Test everything

1. Go to **https://tradediecast.com**
2. Click **Sign in** → create an account with your email
3. Check your email for a confirmation link and click it
4. Try listing a car — go to **Sell**, fill in the form, upload a photo
5. Test a purchase using Stripe test card: **4242 4242 4242 4242**, any future expiry, any 3-digit CVC
6. Check your Supabase dashboard → **Table editor** → listings to see your data

---

## STEP 10 — Go live with real payments

When you're happy everything works:
1. In Stripe dashboard, toggle **Test mode → Live mode**
2. Copy your new live API keys
3. Update the keys in Railway and Vercel environment variables
4. Redeploy both services
5. Update the Stripe webhook endpoint to use live mode too

---

## ✅ You're live!

Your website is now running at **https://tradediecast.com** with:
- ✅ User sign up / sign in
- ✅ Browse and search listings
- ✅ Create listings with photo uploads
- ✅ Stripe payments with buyer protection
- ✅ Seller dashboard
- ✅ Auto-deploy: every time you push code to GitHub, Vercel and Railway update automatically

---

## 🆘 Common problems

**"npm: command not found"** → Node.js isn't installed. Redo Step 1a.

**Vercel build fails** → Check that you set the Root Directory to `frontend` in Step 7.

**Railway deploy fails** → Make sure you set Root Directory to `backend` in Step 6.

**Domain not working after 30 min** → Double-check the DNS records in Namecheap match exactly what Vercel showed you.

**Payments not working** → Make sure you're using the right keys (test vs live) and the webhook secret is correct.

**Need help?** Email: hello@tradediecast.com (once live!) or raise an issue on your GitHub repo.
