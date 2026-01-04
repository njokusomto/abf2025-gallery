# Repository Overview - ABF 2025 Gallery (For Dominion City Church)

## What This Repository Does

This is a **Next.js-based photo gallery web application** designed to showcase event photos in a beautiful, responsive masonry layout. Originally created for the Africa Blockchain Festival 2025, it's perfect for churches, conferences, and any organization wanting to display photos professionally.

### Key Features

1. **Automatic Photo Loading**
   - Fetches images automatically from Cloudinary cloud storage
   - No manual coding required to add new photos
   - Just upload to Cloudinary and rebuild

2. **Beautiful Masonry Layout**
   - Photos arranged in a Pinterest-style grid
   - Automatically adapts to different screen sizes
   - 1-4 columns depending on viewport width

3. **Interactive Image Viewing**
   - Click any photo to view full-screen
   - Navigate with arrow keys or on-screen buttons
   - Swipe gestures on mobile devices
   - ESC key to close

4. **Performance Optimized**
   - Blur placeholders while images load
   - Lazy loading for better page speed
   - Optimized image delivery via Cloudinary CDN

5. **Responsive & Mobile-Friendly**
   - Works perfectly on phones, tablets, and desktops
   - Touch-friendly navigation
   - Adaptive layouts

---

## Technology Stack

### Frontend Framework
- **Next.js 16** - React-based framework with server-side rendering and static generation
- **TypeScript** - Type-safe JavaScript for better code quality
- **React 18** - Modern UI library

### Styling
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **Framer Motion** - Smooth animations and transitions
- **Headless UI** - Accessible, unstyled UI components

### Image Management
- **Cloudinary** - Cloud-based image storage, transformation, and delivery
- **Next.js Image** - Optimized image component with automatic optimization

### Other Libraries
- **react-swipeable** - Touch gesture support
- **react-use-keypress** - Keyboard navigation

---

## How It Works

### 1. Image Storage (Cloudinary)
```
Upload photos to Cloudinary folder
         ↓
Cloudinary stores and optimizes images
         ↓
Cloudinary CDN delivers images globally
```

### 2. Data Fetching (Next.js)
```
Build time (getStaticProps)
         ↓
Query Cloudinary API for folder contents
         ↓
Generate blur placeholders
         ↓
Create static HTML with image data
```

### 3. User Experience
```
User visits gallery
         ↓
Masonry grid displays with blur placeholders
         ↓
Images lazy-load as user scrolls
         ↓
Click image → Full-screen modal opens
         ↓
Navigate with arrows/keyboard/swipe
```

---

## Architecture Overview

```
┌─────────────────────────────────────────┐
│          User's Browser                 │
│  ┌───────────────────────────────────┐ │
│  │   Next.js App (React)             │ │
│  │  ┌─────────────┐  ┌────────────┐ │ │
│  │  │  Gallery    │  │   Modal    │ │ │
│  │  │  (Masonry)  │  │  (Viewer)  │ │ │
│  │  └─────────────┘  └────────────┘ │ │
│  └───────────────────────────────────┘ │
└─────────────────────────────────────────┘
           ↕                ↕
┌──────────────────┐  ┌──────────────────┐
│  Vercel Hosting  │  │   Cloudinary     │
│  (Static Pages)  │  │  (Image CDN)     │
└──────────────────┘  └──────────────────┘
```

---

## File Structure Explained

```
abf2025-gallery/
│
├── pages/                      # Next.js pages (routes)
│   ├── index.tsx              # Main gallery page ⭐ (CUSTOMIZE THIS)
│   ├── _app.tsx               # App wrapper (global styles)
│   └── _document.tsx          # HTML document template
│
├── components/                 # React components
│   ├── Modal.tsx              # Full-screen image viewer
│   ├── SharedModal.tsx        # Shared modal logic
│   ├── Carousel.tsx           # Image navigation controls
│   └── Icons/
│       ├── Logo.tsx           # Church/event logo ⭐ (REPLACE THIS)
│       ├── Bridge.tsx         # Decorative icon
│       ├── WhatsAppIcon.tsx   # Social icon
│       └── Twitter.tsx        # Social icon
│
├── utils/                      # Utility functions
│   ├── cloudinary.ts          # Cloudinary SDK config
│   ├── images.ts              # Static image data (not used with API)
│   ├── generateBlurPlaceholder.ts  # Creates blur effect
│   ├── cachedImages.ts        # Image caching logic
│   ├── downloadPhoto.ts       # Download functionality
│   ├── useLastViewedPhoto.ts  # Remember last viewed
│   ├── animationVariants.ts   # Framer Motion animations
│   ├── range.ts               # Array utilities
│   └── types.ts               # TypeScript type definitions
│
├── public/                     # Static assets
│   ├── favicon.ico            # Browser tab icon ⭐ (REPLACE THIS)
│   ├── logo-white.png         # Logo image
│   ├── og-image.png           # Social media preview ⭐ (REPLACE THIS)
│   └── rwanda-outline.png     # Background image (optional)
│
├── styles/                     # CSS files
│   └── globals.css            # Global styles
│
├── .env.local                 # Environment variables ⭐ (CREATE THIS)
├── .env.local.example         # Example env file
├── next.config.js             # Next.js configuration
├── tailwind.config.js         # Tailwind CSS config
├── tsconfig.json              # TypeScript config
├── package.json               # Dependencies and scripts
│
└── Documentation (NEW! ⭐)
    ├── README.md              # Main documentation (updated)
    ├── QUICKSTART.md          # 30-minute setup guide
    ├── SETUP.md               # Detailed setup instructions
    ├── CHURCH_CUSTOMIZATION.md # Customization guide
    └── RECOMMENDED_NAMES.md   # App naming suggestions
```

---

## Key Files to Customize for Dominion City

### 🔴 Must Customize

1. **`.env.local`** (create from `.env.local.example`)
   - Add your Cloudinary credentials
   - Critical for app to work

2. **`pages/index.tsx`** (lines 19, 48-63)
   - Update page title
   - Change hero card text
   - Update website link

3. **`components/Icons/Logo.tsx`**
   - Replace with your church logo

### 🟡 Should Customize

4. **`public/favicon.ico`**
   - Replace with church icon

5. **`public/og-image.jpg`**
   - Create social media preview image

6. **Colors** (in `pages/index.tsx`)
   - Change color scheme to match branding

### 🟢 Optional

7. **`public/rwanda-outline.png`**
   - Replace or remove background image

8. **`tailwind.config.js`**
   - Add custom color palette

---

## Environment Variables Explained

```env
# Public - visible to browser (used in image URLs)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name

# Private - server-side only (API credentials)
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Folder name in Cloudinary where photos are stored
CLOUDINARY_FOLDER=sunday-services
```

**Security Note**: Never commit `.env.local` to Git. It's already in `.gitignore`.

---

## npm Scripts Explained

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Build for production (optimized)
npm run start    # Start production server (after build)
npm run lint     # Check code quality with ESLint
```

---

## Data Flow Diagram

```
┌─────────────────────────────────────────────────┐
│  Build Time (getStaticProps)                    │
│                                                  │
│  1. Query Cloudinary API                        │
│     GET /v2/search                              │
│     folder: "sunday-services"                   │
│                                                  │
│  2. Receive image metadata                      │
│     [{ id, width, height, public_id, ... }]    │
│                                                  │
│  3. Generate blur placeholders                  │
│     Base64-encoded low-res previews            │
│                                                  │
│  4. Build static HTML                           │
│     Pre-rendered page with all data            │
└─────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────┐
│  Runtime (User Visits)                          │
│                                                  │
│  1. Load static HTML (instant)                  │
│                                                  │
│  2. Display blur placeholders                   │
│                                                  │
│  3. Lazy-load actual images                     │
│     From Cloudinary CDN                         │
│                                                  │
│  4. User interactions                           │
│     - Click → Open modal                        │
│     - Arrow keys → Navigate                     │
│     - ESC → Close modal                         │
└─────────────────────────────────────────────────┘
```

---

## How to Clone and Rebuild for Dominion City

### Summary (Details in SETUP.md)

1. **Prerequisites**: Install Node.js 18+, Git
2. **Clone**: `git clone https://github.com/njokusomto/abf2025-gallery.git`
3. **Install**: `npm install`
4. **Cloudinary Setup**: Create account, folder, upload photos
5. **Configure**: Create `.env.local` with credentials
6. **Customize**: Update branding (see CHURCH_CUSTOMIZATION.md)
7. **Test**: `npm run dev` → http://localhost:3000
8. **Deploy**: Push to GitHub, connect to Vercel
9. **Go Live**: Your gallery is online!

**Time Required**: 30-60 minutes total

---

## Recommended App Names for Dominion City

Top 3 recommendations:

1. **Dominion Moments** ⭐⭐⭐
   - Short, memorable, meaningful
   - URL: `moments.dominioncity.org`

2. **Dominion City Gallery**
   - Clear and professional
   - URL: `gallery.dominioncity.org`

3. **Dominion Sundays**
   - Specific to Sunday services
   - URL: `sundays.dominioncity.org`

See **RECOMMENDED_NAMES.md** for 20+ more options!

---

## Cost Estimate

| Service | Free Tier | Cost |
|---------|-----------|------|
| Cloudinary | 25GB storage, 25GB bandwidth/month | FREE ✅ |
| Vercel Hosting | Unlimited personal sites | FREE ✅ |
| Custom Domain (optional) | - | $10-15/year |
| **TOTAL** | | **$0-15/year** |

---

## Documentation Index

📚 **All Guides Available**:

1. **[QUICKSTART.md](./QUICKSTART.md)** - Start here for 30-minute setup
2. **[SETUP.md](./SETUP.md)** - Complete setup and deployment guide  
3. **[CHURCH_CUSTOMIZATION.md](./CHURCH_CUSTOMIZATION.md)** - Customize for Dominion City
4. **[RECOMMENDED_NAMES.md](./RECOMMENDED_NAMES.md)** - 20+ app name suggestions
5. **[README.md](./README.md)** - Overview and quick reference

---

## Support Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Cloudinary Docs**: https://cloudinary.com/documentation
- **Tailwind Docs**: https://tailwindcss.com/docs
- **Vercel Docs**: https://vercel.com/docs

---

## Summary

This repository provides a production-ready photo gallery that:
- ✅ Works out of the box
- ✅ Is fully customizable
- ✅ Costs $0-15/year to run
- ✅ Requires minimal technical knowledge
- ✅ Includes complete documentation
- ✅ Is perfect for church Sunday services

**Ready to get started?** → **[QUICKSTART.md](./QUICKSTART.md)**

---

*Last Updated: January 2026 | Created for Dominion City Church*
