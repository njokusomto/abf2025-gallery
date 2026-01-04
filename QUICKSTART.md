# Quick Start Guide - Dominion City Church Gallery

This is a fast-track guide to get your church photo gallery up and running. For detailed instructions, see [SETUP.md](./SETUP.md).

---

## What You're Getting

A beautiful, modern photo gallery website that:
- ✅ Automatically displays photos from Cloudinary
- ✅ Works perfectly on phones, tablets, and computers
- ✅ Loads fast with optimized images
- ✅ Includes smooth animations and transitions
- ✅ Allows clicking images to view full-screen

**Perfect for**: Showcasing Sunday service photos, church events, and special moments

---

## Prerequisites (5 minutes)

You need:
1. ✅ **Node.js 18+** installed ([download](https://nodejs.org/))
2. ✅ **Git** installed ([download](https://git-scm.com/))
3. ✅ **Cloudinary account** (free) ([sign up](https://cloudinary.com/users/register/free))
4. ✅ **Vercel account** (free, for hosting) ([sign up](https://vercel.com/signup))

---

## 5-Step Setup (30 minutes)

### Step 1: Clone the Project (2 minutes)
```bash
git clone https://github.com/njokusomto/abf2025-gallery.git
cd abf2025-gallery
npm install
```

### Step 2: Set Up Cloudinary (10 minutes)
1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Create a folder (e.g., "sunday-services")
3. Upload your Sunday service photos
4. Copy your credentials from the dashboard:
   - Cloud Name
   - API Key
   - API Secret

### Step 3: Configure Environment (3 minutes)
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your credentials:
```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
CLOUDINARY_FOLDER=sunday-services
```

### Step 4: Test Locally (2 minutes)
```bash
npm run dev
```
Open http://localhost:3000 - you should see your photos!

### Step 5: Deploy to Vercel (10 minutes)
```bash
# Push to GitHub first
git add .
git commit -m "Initial Dominion City gallery"
git push origin main

# Then deploy
npm install -g vercel
vercel
```

Add your environment variables when prompted, and you're live! 🎉

---

## Customization (15-30 minutes)

See [CHURCH_CUSTOMIZATION.md](./CHURCH_CUSTOMIZATION.md) for details. Quick changes:

### Update Church Name
**File**: `pages/index.tsx`

Line 19: Change title:
```tsx
<title>Dominion City - Sunday Service Photos</title>
```

Lines 48-54: Update hero text:
```tsx
<h1 className="...">Sunday Service Moments</h1>
<p className="...">
  Capturing the spirit of worship at Dominion City Church.
</p>
```

Line 58: Update website link:
```tsx
<a href="https://your-church-website.com" ...>
  Visit Our Website
</a>
```

### Change Colors
Replace `#FE4600` (orange) with your church color:
- Line 56: Button border color
- Line 30: Hero background gradient

Example for blue:
```tsx
border-[#2563eb] bg-[#2563eb]  // Button
from-blue-900 via-blue-800 to-blue-700  // Hero background
```

---

## Adding New Photos

Simply:
1. Upload to your Cloudinary folder
2. Rebuild your site (automatic on Vercel, or run `npm run build`)
3. New photos appear automatically! 🎉

---

## Recommended App Names

See [RECOMMENDED_NAMES.md](./RECOMMENDED_NAMES.md) for full list. Top picks:

1. **Dominion Moments** ⭐ (highly recommended)
2. **Dominion City Gallery**
3. **Dominion Sundays**

Use as subdomain: `moments.dominioncity.org` or `gallery.dominioncity.org`

---

## Common Issues

### Photos not showing?
- ✅ Check Cloudinary folder name matches `.env.local`
- ✅ Verify credentials are correct
- ✅ Restart dev server after changing `.env.local`

### Build errors?
```bash
rm -rf node_modules .next
npm install
npm run dev
```

### Need help?
- 📖 Read [SETUP.md](./SETUP.md) for detailed instructions
- 📖 Check [CHURCH_CUSTOMIZATION.md](./CHURCH_CUSTOMIZATION.md) for customization
- 🔍 Look at browser console for error messages

---

## Tech Stack

Built with modern, reliable technology:
- **Next.js 16** - React framework
- **TypeScript** - Type-safe code
- **Tailwind CSS** - Styling
- **Cloudinary** - Image hosting
- **Framer Motion** - Animations
- **Vercel** - Hosting (free tier)

---

## Project Structure

```
abf2025-gallery/
├── pages/
│   ├── index.tsx          # Main gallery page (customize here!)
│   ├── _app.tsx           # App wrapper
│   └── _document.tsx      # HTML document
├── components/
│   ├── Modal.tsx          # Full-screen image viewer
│   ├── Carousel.tsx       # Image navigation
│   └── Icons/
│       └── Logo.tsx       # Church logo (replace this!)
├── utils/
│   └── cloudinary.ts      # Cloudinary config
├── public/                # Static files (add your logo here!)
├── .env.local            # Your credentials (don't commit!)
└── package.json          # Dependencies
```

---

## Next Steps

1. ✅ **Test locally** to ensure everything works
2. ✅ **Customize** with your church branding
3. ✅ **Upload photos** to Cloudinary
4. ✅ **Deploy** to Vercel
5. ✅ **Share** with your congregation!

---

## Cost Breakdown

- ✅ **Cloudinary Free Tier**: 25GB storage, 25GB bandwidth/month - FREE
- ✅ **Vercel Free Tier**: Unlimited personal sites - FREE
- ✅ **Custom Domain**: $10-15/year (optional)

**Total Cost**: $0-15/year (or free if using subdomain)

---

## Support

For detailed help:
- 📘 [SETUP.md](./SETUP.md) - Complete setup instructions
- 🎨 [CHURCH_CUSTOMIZATION.md](./CHURCH_CUSTOMIZATION.md) - Customization guide
- 🏷️ [RECOMMENDED_NAMES.md](./RECOMMENDED_NAMES.md) - App naming ideas

---

## License

Open source - free to use and customize for your church!

---

**Ready to get started? Follow Step 1 above!** 🚀

Questions? Check the detailed guides linked throughout this document.
