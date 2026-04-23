# 🚀 Vercel Deployment Guide - Ola Spa

This guide will walk you through deploying your Ola Spa application to Vercel.

## ✅ Prerequisites

- [Vercel Account](https://vercel.com/signup) (free)
- [GitHub Account](https://github.com/signup) (free)
- [MongoDB Atlas Account](https://www.mongodb.com/cloud/atlas) (free tier available)
- Your project pushed to GitHub

## 📋 Step-by-Step Deployment

### Step 1: Prepare MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new project and cluster (free tier: M0)
3. Click **Connect** → **Drivers**
4. Copy your connection string
5. Replace `<password>` with your database password
6. **Important**: Add `0.0.0.0/0` to IP Access List to allow Vercel connections

### Step 2: Push Code to GitHub

```bash
cd /path/to/ola-spa
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### Step 3: Connect to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Add New** → **Project**
3. Select **Import Git Repository**
4. Find and select your `ola-spa` repository
5. Click **Import**

### Step 4: Configure Environment Variables

In the Vercel project settings, add these environment variables:

**Required for Backend:**
- `MONGO_URI`: Your MongoDB Atlas connection string
- `JWT_SECRET`: Any secure random string (generate one)
- `ADMIN_EMAIL`: admin@olaspa.com (or your choice)
- `ADMIN_PASSWORD`: Your admin password

**For Frontend:**
- `VITE_API_URL`: Leave blank initially. After first deployment, update to: `https://your-deployment.vercel.app/api`

**Other (Optional but recommended):**
- `NODE_ENV`: production
- `FRONTEND_URL`: https://your-deployment.vercel.app

### Step 5: Trigger Deployment

1. In Vercel dashboard, click **Deploy**
2. Wait for the build to complete (2-5 minutes)
3. You'll see a deployment URL like: `https://ola-spa-xyz.vercel.app`

### Step 6: Update VITE_API_URL

1. Note your deployment URL from Step 5
2. Go to **Settings** → **Environment Variables**
3. Edit `VITE_API_URL` and set it to: `https://your-deployment.vercel.app/api`
4. Redeploy: Click **Deployments** → Click the latest → Click **Redeploy**

## 🔍 Verify Deployment

Check that everything is working:

```bash
# Check API health
curl https://your-deployment.vercel.app/api/health

# Should return:
# {"status":"Server is running","timestamp":"...","environment":"production","frontend":"https://your-deployment.vercel.app"}
```

## 📱 Test the Application

1. Open `https://your-deployment.vercel.app` in your browser
2. Verify the home page loads
3. Try navigating to Services, About, Gallery
4. Test the Booking flow
5. Login to admin: Visit `/admin/login`
   - Email: (your ADMIN_EMAIL)
   - Password: (your ADMIN_PASSWORD)

## 🆘 Troubleshooting

### Build Fails
- Check the build logs in Vercel: **Deployments** → Click deployment → **Logs**
- Common issues:
  - Missing environment variables: Check Step 4
  - Node version: Should be 20.x
  - MongoDB connection: Verify connection string and IP allowlist

### API Not Responding
- Check `/api/health` endpoint
- Verify CORS settings in `api/index.js`
- Ensure MongoDB connection string is correct
- Check Vercel function logs

### Frontend Shows 404
- This is normal for client-side routes like `/booking`
- Vercel is configured to serve `index.html` for all non-API routes
- The React router handles client-side navigation

### Database Connection Error
1. Go to MongoDB Atlas → Network Access
2. Add IP: `0.0.0.0/0` (allows all IPs from Vercel)
3. Or add specific IPs if you know them
4. Verify the MONGO_URI connection string is correct

## 🔐 Security Notes

**Before Going Live:**

1. Change default admin credentials:
   - Login to `/admin/login`
   - Change password immediately
   
2. Update JWT_SECRET:
   - Generate a strong random string
   - Update in Vercel environment variables
   
3. Enable MongoDB IP allowlist:
   - Instead of `0.0.0.0/0`, add specific Vercel IPs if possible
   - Check Vercel deployment regions and IP ranges

4. Set up SSL/HTTPS:
   - Vercel provides free SSL certificates automatically

5. Set up custom domain (optional):
   - In Vercel: **Settings** → **Domains**
   - Add your custom domain
   - Follow DNS configuration steps

## 📊 Monitoring

Monitor your deployment:
- **Vercel Dashboard**: Real-time metrics, logs, and performance
- **MongoDB Atlas**: Database usage, performance, and analytics
- **Analytics**: Enable in Vercel for visitor statistics

## 🔄 Continuous Deployment

After initial setup, every `git push` to your main branch automatically triggers a new Vercel deployment!

### To Disable Auto-Deploy:
- Go to **Settings** → **Git** → Toggle off auto-deploy
- Deploy manually from the Vercel dashboard

## 📞 Need Help?

- [Vercel Docs](https://vercel.com/docs)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)
- [Express.js Docs](https://expressjs.com/)
- [React Docs](https://react.dev/)
