# Deploying Vlagalabs to Vercel

This guide provides step-by-step instructions for deploying the Vlagalabs application to Vercel with a PostgreSQL database.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Database Setup](#database-setup)
- [Environment Variables](#environment-variables)
- [Deployment Steps](#deployment-steps)
- [Post-Deployment](#post-deployment)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before deploying, ensure you have:
- A [Vercel account](https://vercel.com/signup)
- A [GitHub account](https://github.com) (for connecting your repository)
- Node.js 18+ installed locally for testing

## Database Setup

### Recommended: Neon PostgreSQL (Free Tier)

We recommend **[Neon](https://neon.tech)** for hosting your PostgreSQL database. It offers:
- ✅ Free tier with 0.5 GB storage
- ✅ Serverless PostgreSQL (auto-scaling)
- ✅ Instant branching for development
- ✅ No credit card required for free tier

#### Step 1: Create a Neon Account

1. Go to [neon.tech](https://neon.tech)
2. Sign up with GitHub, Google, or email
3. Click "Create a Project"

#### Step 2: Create Your Database

1. **Project Name**: `vlagalabs` (or your preferred name)
2. **PostgreSQL Version**: Select the latest version (16+)
3. **Region**: Choose the region closest to your Vercel deployment (e.g., US East for `iad1`)
4. Click **Create Project**

#### Step 3: Get Your Connection String

After creating the project:
1. Go to the **Dashboard** of your Neon project
2. Click on **Connection Details**
3. Copy the **Connection String** (it should look like this):
   ```
   postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/dbname?sslmode=require
   ```
4. **Save this connection string** - you'll need it for Vercel environment variables

### Alternative: Supabase (Free Tier)

Another excellent option is **[Supabase](https://supabase.com)**:
- ✅ Free tier with 500 MB database
- ✅ Includes authentication and storage
- ✅ PostgreSQL 15+

#### Steps for Supabase:
1. Sign up at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to **Settings** → **Database**
4. Copy the **Connection String** (URI format)
5. Use this as your `DATABASE_URL`

### Alternative: Vercel Postgres

If you prefer an integrated solution:
- **[Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)** (Powered by Neon)
- Can be added directly from your Vercel project dashboard
- Same free tier as Neon

## Environment Variables

You'll need to configure the following environment variables in Vercel:

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string from Neon/Supabase | `postgresql://user:pass@host/db?sslmode=require` |
| `PAYLOAD_SECRET` | Secret key for PayloadCMS (32+ characters) | `your-super-secret-payload-key-here-32chars` |
| `NEXTAUTH_SECRET` | Secret for NextAuth authentication | `your-nextauth-secret-key-here-32chars` |
| `NEXTAUTH_URL` | Your production URL | `https://your-app.vercel.app` |
| `NEXT_PUBLIC_SERVER_URL` | Public URL for the app | `https://your-app.vercel.app` |

### Optional Variables (AWS S3 for Media Storage)

| Variable | Description |
|----------|-------------|
| `AWS_ACCESS_KEY_ID` | AWS access key for S3 bucket |
| `AWS_SECRET_ACCESS_KEY` | AWS secret key for S3 |
| `AWS_REGION` | AWS region (e.g., `us-east-1`) |
| `AWS_BUCKET` | S3 bucket name |

> **Note**: Without S3 configuration, media files will be stored locally (not recommended for production on Vercel due to ephemeral filesystem).

### Generating Secret Keys

Generate strong secret keys using one of these methods:

**Method 1: OpenSSL**
```bash
openssl rand -base64 32
```

**Method 2: Node.js**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**Method 3: Online Generator**
- Visit [generate-secret.vercel.app](https://generate-secret.vercel.app)

## Deployment Steps

### Step 1: Fork or Push to GitHub

1. Fork the repository or push your local changes to GitHub
2. Make sure all changes are committed and pushed

### Step 2: Import Project to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **Import Git Repository**
3. Select your GitHub repository (`atomotavio/Vlagalabs`)
4. Click **Import**

### Step 3: Configure Project Settings

#### Framework Preset
- Vercel should auto-detect **Next.js**
- If not, select **Next.js** from the dropdown

#### Root Directory
- Leave as `.` (root)

#### Build and Output Settings
- **Build Command**: `prisma generate && prisma migrate deploy && payload migrate && next build`
- **Output Directory**: `.next` (default)
- **Install Command**: `npm install` (default)

> **Note**: The `vercel.json` file in the repository already configures these settings.

### Step 4: Add Environment Variables

In the **Environment Variables** section, add all the required variables:

1. Click **Add** for each environment variable
2. Enter the **Key** and **Value**
3. Select **Production**, **Preview**, and **Development** (or as needed)

**Example Configuration:**

```env
DATABASE_URL=postgresql://user:pass@ep-xxx-xxx.region.aws.neon.tech/vlagalabs?sslmode=require
PAYLOAD_SECRET=your-generated-secret-key-32-characters
NEXTAUTH_SECRET=your-generated-nextauth-secret-32chars
NEXTAUTH_URL=https://your-app.vercel.app
NEXT_PUBLIC_SERVER_URL=https://your-app.vercel.app
```

> **Important**: After deployment, update `NEXTAUTH_URL` and `NEXT_PUBLIC_SERVER_URL` with your actual Vercel URL.

### Step 5: Deploy

1. Click **Deploy**
2. Wait for the build to complete (5-10 minutes for the first deployment)
3. If the build fails, check the **Build Logs** for errors

### Step 6: Update URLs

After your first deployment:

1. Copy your Vercel deployment URL (e.g., `https://vlagalabs.vercel.app`)
2. Go to **Settings** → **Environment Variables**
3. Update these variables:
   - `NEXTAUTH_URL`: `https://vlagalabs.vercel.app`
   - `NEXT_PUBLIC_SERVER_URL`: `https://vlagalabs.vercel.app`
4. **Redeploy** the application for changes to take effect

## Post-Deployment

### Initialize the Database

The database migrations will run automatically during deployment via the build command. However, you may need to:

1. **Create the first admin user** via PayloadCMS:
   - Visit `https://your-app.vercel.app/admin`
   - Follow the setup wizard to create your first admin account

2. **Verify the database** is properly connected:
   - Check the Vercel deployment logs for any Prisma or PayloadCMS errors
   - Test creating a user and blog post

### Set Up AWS S3 (Optional but Recommended)

For production media storage:

1. Create an AWS S3 bucket
2. Configure bucket permissions and CORS
3. Add the AWS environment variables to Vercel
4. Redeploy the application

Alternatively, consider:
- **Cloudinary** (free tier available)
- **Vercel Blob Storage** (built-in, paid)
- **UploadThing** (free tier available)

## Troubleshooting

### Build Failures

**Issue**: Prisma migration fails
```
Error: P1001: Can't reach database server
```

**Solution**: 
- Verify `DATABASE_URL` is correct
- Ensure the database allows connections from Vercel IPs (most cloud databases do by default)
- Check if SSL mode is required: add `?sslmode=require` to the connection string

---

**Issue**: PayloadCMS migration fails
```
Error: PAYLOAD_SECRET is not defined
```

**Solution**:
- Ensure `PAYLOAD_SECRET` is set in environment variables
- Verify it's at least 32 characters long

---

**Issue**: Build times out
```
Error: Build exceeded maximum duration
```

**Solution**:
- This usually happens on the first deployment due to large dependencies
- Retry the deployment
- Consider upgrading to Vercel Pro if the issue persists

### Runtime Errors

**Issue**: NextAuth authentication doesn't work
```
Error: NEXTAUTH_URL is not defined
```

**Solution**:
- Set `NEXTAUTH_URL` to your production URL
- Ensure `NEXTAUTH_SECRET` is set and at least 32 characters

---

**Issue**: Database connection errors in production
```
Error: Too many connections
```

**Solution**:
- Neon/Supabase free tiers have connection limits
- Use connection pooling (enabled by default in Prisma)
- Consider upgrading your database plan

---

**Issue**: Images not loading
```
Error: Cannot access local filesystem
```

**Solution**:
- Vercel has an ephemeral filesystem
- Configure AWS S3 or another cloud storage solution
- Add the storage environment variables and redeploy

### Logs and Debugging

- **Deployment Logs**: Available in the Vercel dashboard under each deployment
- **Runtime Logs**: Go to your project → **Logs** tab
- **Database Logs**: Check Neon/Supabase dashboard for query logs

### Getting Help

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Neon Documentation**: [neon.tech/docs](https://neon.tech/docs)
- **PayloadCMS Documentation**: [payloadcms.com/docs](https://payloadcms.com/docs)
- **Next.js Documentation**: [nextjs.org/docs](https://nextjs.org/docs)

## Summary Checklist

- [ ] Created a Neon/Supabase PostgreSQL database
- [ ] Copied the database connection string
- [ ] Generated secret keys for `PAYLOAD_SECRET` and `NEXTAUTH_SECRET`
- [ ] Imported the project to Vercel from GitHub
- [ ] Added all required environment variables
- [ ] Deployed the application
- [ ] Updated `NEXTAUTH_URL` and `NEXT_PUBLIC_SERVER_URL` with the actual Vercel URL
- [ ] Redeployed after updating URLs
- [ ] Created the first admin user at `/admin`
- [ ] (Optional) Configured AWS S3 for media storage

---

**Congratulations!** 🎉 Your Vlagalabs application should now be live on Vercel!

Visit your deployment URL to see it in action. If you encounter any issues, refer to the Troubleshooting section above.
