# Dominion City Church Gallery - Setup Guide

## Overview

This is a beautiful image gallery web application built with Next.js and Cloudinary. It's perfect for showcasing photos from Sunday services and church events with a modern, responsive masonry layout.

### What This App Does

- **Photo Gallery**: Displays images in a beautiful masonry grid layout
- **Modal Viewing**: Click any image to view it in full-screen modal with navigation
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Cloudinary Integration**: Automatically fetches and displays images from your Cloudinary folder
- **Optimized Performance**: Uses blur placeholders and lazy loading for fast page loads
- **Smooth Animations**: Elegant fade-in effects powered by Framer Motion

### Technology Stack

- **Next.js 16**: React framework for server-side rendering and static generation
- **TypeScript**: Type-safe development
- **Cloudinary**: Cloud-based image storage and delivery
- **Tailwind CSS**: Modern utility-first CSS framework
- **Framer Motion**: Smooth animations and transitions

---

## Prerequisites

Before you begin, ensure you have:

1. **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
2. **npm** or **yarn** package manager (comes with Node.js)
3. **Git** - [Download here](https://git-scm.com/)
4. **Cloudinary Account** (free tier available) - [Sign up here](https://cloudinary.com/users/register/free)
5. **Vercel Account** (optional, for deployment) - [Sign up here](https://vercel.com/signup)

---

## Step 1: Clone the Repository

Open your terminal or command prompt and run:

```bash
# Clone the repository
git clone https://github.com/njokusomto/abf2025-gallery.git

# Navigate into the project directory
cd abf2025-gallery

# Rename the project folder (optional)
cd ..
mv abf2025-gallery dominion-city-gallery
cd dominion-city-gallery
```

---

## Step 2: Install Dependencies

Install all required packages:

```bash
npm install
```

or if you prefer yarn:

```bash
yarn install
```

This will install all dependencies listed in `package.json`, including Next.js, React, Cloudinary SDK, and Tailwind CSS.

---

## Step 3: Set Up Cloudinary

### 3.1 Create a Cloudinary Account

1. Go to [Cloudinary](https://cloudinary.com/users/register/free) and sign up for a free account
2. After signing up, you'll be taken to your **Dashboard**
3. Note down the following credentials (you'll need them in Step 4):
   - **Cloud Name**
   - **API Key**
   - **API Secret**

### 3.2 Create a Folder for Your Images

1. In your Cloudinary dashboard, click on **Media Library**
2. Click **Create Folder** and name it (e.g., `sunday-services`)
3. Upload your Sunday service photos to this folder
   - You can drag and drop multiple images
   - Supported formats: JPG, PNG, WebP, etc.

### 3.3 Organize Your Images

For best results:
- Use consistent image sizes (recommended: at least 1200px wide)
- Name your images descriptively (e.g., `sunday-jan-7-2025-worship.jpg`)
- Images will display in reverse chronological order by default

---

## Step 4: Configure Environment Variables

1. Copy the example environment file:

```bash
cp .env.local.example .env.local
```

2. Open `.env.local` in your text editor and fill in your Cloudinary credentials:

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name-here
CLOUDINARY_API_KEY=your-api-key-here
CLOUDINARY_API_SECRET=your-api-secret-here
CLOUDINARY_FOLDER=sunday-services
```

**Important Notes:**
- Replace `your-cloud-name-here`, `your-api-key-here`, and `your-api-secret-here` with your actual Cloudinary credentials
- The `CLOUDINARY_FOLDER` should match the folder name you created in Cloudinary
- **Never commit `.env.local` to Git** - it contains sensitive information and is already in `.gitignore`

---

## Step 5: Customize for Dominion City Church

Now you'll want to personalize the app for your church. See the [CHURCH_CUSTOMIZATION.md](./CHURCH_CUSTOMIZATION.md) file for detailed instructions on:

- Updating the church name and branding
- Changing colors and styles
- Replacing the logo
- Customizing text and descriptions
- Adding church website link

---

## Step 6: Run the Development Server

Start the development server to see your gallery in action:

```bash
npm run dev
```

or with yarn:

```bash
yarn dev
```

Open your browser and navigate to:

```
http://localhost:3000
```

You should see your image gallery! If you uploaded images to Cloudinary, they should appear in the gallery.

---

## Step 7: Test Your Gallery

1. **Check Image Display**: Verify all images from your Cloudinary folder appear
2. **Test Modal**: Click on an image to open the full-screen viewer
3. **Test Navigation**: Use arrow keys or on-screen buttons to navigate between images
4. **Test Responsive Design**: Resize your browser window to see how it looks on different screen sizes
5. **Test Mobile**: Open on your phone to verify mobile experience

---

## Step 8: Build for Production

When you're ready to deploy:

```bash
npm run build
```

This creates an optimized production build in the `.next` folder.

To test the production build locally:

```bash
npm run start
```

---

## Step 9: Deploy to Vercel (Recommended)

Vercel is the easiest way to deploy Next.js applications:

### Option A: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts and add your environment variables when asked

### Option B: Deploy via Vercel Dashboard

1. Push your code to GitHub:
```bash
git add .
git commit -m "Customized for Dominion City Church"
git push origin main
```

2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click **"New Project"**
4. Import your GitHub repository
5. Add environment variables:
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
   - `CLOUDINARY_FOLDER`
6. Click **"Deploy"**

Your gallery will be live at `https://your-project-name.vercel.app`!

---

## Alternative Deployment Options

### Netlify

1. Push code to GitHub
2. Connect repository to [Netlify](https://www.netlify.com/)
3. Set build command: `npm run build`
4. Set publish directory: `.next`
5. Add environment variables

### Custom Server

For deploying to your own server, you'll need:
- Node.js 18+ installed on the server
- A process manager like PM2
- Nginx or Apache for reverse proxy

---

## Troubleshooting

### Images Not Showing

1. **Check Cloudinary credentials** in `.env.local`
2. **Verify folder name** matches exactly (case-sensitive)
3. **Check browser console** for error messages
4. **Ensure images are in the correct folder** in Cloudinary

### Build Errors

1. **Clear cache and reinstall**:
```bash
rm -rf node_modules .next
npm install
```

2. **Check Node.js version**:
```bash
node --version
```
Should be 18.0.0 or higher

### Environment Variables Not Working

1. **Restart development server** after changing `.env.local`
2. **Verify variable names** are exactly as shown
3. **Check for extra spaces** in the values

---

## Updating Your Gallery

To add new photos:

1. Upload images to your Cloudinary folder
2. Rebuild your site (on Vercel, this happens automatically, or run `npm run build` locally)
3. The new images will appear in your gallery

---

## Support and Resources

- **Next.js Documentation**: https://nextjs.org/docs
- **Cloudinary Documentation**: https://cloudinary.com/documentation
- **Tailwind CSS Documentation**: https://tailwindcss.com/docs
- **Vercel Documentation**: https://vercel.com/docs

---

## License

This project is based on the Next.js Cloudinary example and is open source.

---

## Questions?

If you run into issues:
1. Check the troubleshooting section above
2. Review the Cloudinary and Next.js documentation
3. Check your browser console for error messages
4. Verify all environment variables are set correctly
