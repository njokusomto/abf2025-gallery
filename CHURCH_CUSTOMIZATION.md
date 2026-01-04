# Customizing for Dominion City Church

This guide will walk you through customizing the gallery for Dominion City Church. All changes are minimal and focused on updating branding, text, and styling.

---

## Table of Contents

1. [Update Page Title and Meta Tags](#1-update-page-title-and-meta-tags)
2. [Customize the Hero Card](#2-customize-the-hero-card)
3. [Change Colors and Branding](#3-change-colors-and-branding)
4. [Replace Logo](#4-replace-logo)
5. [Update Favicon](#5-update-favicon)
6. [Customize Image Alt Text](#6-customize-image-alt-text)
7. [Update Social Media Preview](#7-update-social-media-preview)

---

## 1. Update Page Title and Meta Tags

**File to edit**: `pages/index.tsx`

### Current Code (lines 18-21):
```tsx
<Head>
  <title>Africa Blockchain Festival 2025 Photos</title>
  <meta property="og:image" content="/ABF-2025-Gallery.jpg" />
</Head>
```

### Change to:
```tsx
<Head>
  <title>Dominion City - Sunday Service Photos</title>
  <meta name="description" content="Photo gallery from Dominion City Church Sunday services and events" />
  <meta property="og:title" content="Dominion City - Sunday Service Photos" />
  <meta property="og:description" content="Photo gallery from Dominion City Church Sunday services and events" />
  <meta property="og:image" content="/og-image.jpg" />
  <meta property="og:type" content="website" />
</Head>
```

---

## 2. Customize the Hero Card

The hero card is the large introductory card at the top of the gallery.

**File to edit**: `pages/index.tsx`

### Step 2.1: Update Heading

**Current Code (lines 48-50):**
```tsx
<h1 className="text-lg font-semibold uppercase tracking-[0.25em] text-[#BEFFDC] mb-4">
  2025 Event Photos
</h1>
```

**Change to:**
```tsx
<h1 className="text-lg font-semibold uppercase tracking-[0.25em] text-white mb-4">
  Sunday Service Moments
</h1>
```

### Step 2.2: Update Description

**Current Code (lines 51-54):**
```tsx
<p className="max-w-[45ch] text-[#BEFFDC]/80 leading-relaxed mb-8">
  Our incredible Africa Blockchain Festival community came together
  in Rwanda for our first-ever in-person conference.
</p>
```

**Change to:**
```tsx
<p className="max-w-[45ch] text-white/80 leading-relaxed mb-8">
  Capturing the spirit of worship, fellowship, and community at Dominion City Church. 
  Every Sunday is a celebration of faith, hope, and love.
</p>
```

### Step 2.3: Update Button Link

**Current Code (lines 55-63):**
```tsx
<a
  className="inline-block rounded-lg border-2 border-[#FE4600] bg-[#FE4600] px-6 py-2.5 
     text-sm font-semibold transition hover:bg-transparent hover:text-[#FE4600]"
  href="https://africablockchainfestival.com"
  target="_blank"
  rel="noreferrer"
>
  Learn More
</a>
```

**Change to:**
```tsx
<a
  className="inline-block rounded-lg border-2 border-blue-600 bg-blue-600 px-6 py-2.5 
     text-sm font-semibold text-white transition hover:bg-transparent hover:text-blue-600"
  href="https://www.dominioncity.org"
  target="_blank"
  rel="noreferrer"
>
  Visit Our Website
</a>
```

*Note: Replace `https://www.dominioncity.org` with your actual church website URL*

### Step 2.4: Update Background Image (Optional)

**Current Code (lines 36-44):**
```tsx
<div className="absolute top-8 left-0 right-0 flex justify-center opacity-25">
  <Image
    src="/rwanda-outline.png"
    alt="Kigali Skyline"
    width={1000}
    height={300}
    className="object-contain filter brightness-0 invert"
  />
</div>
```

**Options:**
- **Remove the background image** (delete lines 36-44)
- **Replace with church logo or symbol**: Replace `/rwanda-outline.png` with your own image path
- **Keep it but make it more subtle**: Change `opacity-25` to `opacity-10`

---

## 3. Change Colors and Branding

### Option A: Use Church Brand Colors

**File to edit**: `pages/index.tsx`

Common church color schemes:
- **Royal Blue & Gold**: Professional and regal
- **Purple & White**: Spiritual and elegant
- **Green & White**: Growth and renewal
- **Burgundy & Cream**: Traditional and warm

Example for Royal Blue theme:

**Hero card gradient** (line 30):
```tsx
bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700
```

**Button color** (line 56):
```tsx
border-2 border-blue-600 bg-blue-600
```

### Option B: Customize with Tailwind Config

For more comprehensive color changes:

**File to edit**: `tailwind.config.js`

Add your church's colors:
```js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'church-primary': '#1e40af', // Your primary color
        'church-secondary': '#fbbf24', // Your secondary color
        'church-accent': '#10b981', // Your accent color
      },
    },
  },
  plugins: [],
};
```

Then use in your code:
```tsx
className="bg-church-primary text-white"
```

---

## 4. Replace Logo

### Step 4.1: Prepare Your Logo

1. Create or obtain your church logo
2. Save it as `logo-white.png` or `logo.svg` 
3. Recommended size: 200-300px wide, transparent background
4. For dark backgrounds, use white or light-colored logo

### Step 4.2: Replace Logo File

**File to edit**: `components/Icons/Logo.tsx`

**Current approach**: The logo is a custom SVG component

**Option A - Use Image File (Easier)**:

Replace the entire `Logo.tsx` file with:

```tsx
import Image from "next/image";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/dominion-city-logo.png"
      alt="Dominion City Church"
      width={200}
      height={80}
      className={className}
    />
  );
}
```

Then add your logo image to the `public` folder as `dominion-city-logo.png`

**Option B - Keep SVG Format**:

If you have an SVG logo, you can replace the SVG code in `Logo.tsx` with your church's SVG markup.

---

## 5. Update Favicon

### Step 5.1: Create Favicons

Use a favicon generator like [favicon.io](https://favicon.io/) or [realfavicongenerator.net](https://realfavicongenerator.net/)

Upload your church logo and download the generated files.

### Step 5.2: Replace Favicon Files

Copy the generated files to the `public` folder, replacing:
- `favicon.ico`
- `cropped-Fav.png` (or add new favicon images)

### Step 5.3: Update HTML Head

**File to edit**: `pages/_document.tsx`

If you want to add more favicon formats, you can update this file to include links to your favicon files.

---

## 6. Customize Image Alt Text

**File to edit**: `pages/index.tsx`

**Current Code (line 80):**
```tsx
alt={`ABF photo ${id}`}
```

**Change to:**
```tsx
alt={`Dominion City service photo ${id + 1}`}
```

This improves accessibility and SEO by providing meaningful alt text for screen readers.

---

## 7. Update Social Media Preview

When someone shares your gallery on social media, they'll see a preview image.

### Step 7.1: Create Preview Image

1. Create an image (1200x630px recommended) with:
   - Church name
   - "Sunday Service Photos" or similar text
   - Church logo
   - Maybe a collage of service photos

2. Save as `og-image.jpg` in the `public` folder

### Step 7.2: Update Meta Tag

Already covered in [Step 1](#1-update-page-title-and-meta-tags)

---

## Complete Example: Full Hero Card for Dominion City

Here's what your hero card section could look like after all customizations:

```tsx
<motion.div
  className="relative mb-6 inline-block w-full overflow-hidden rounded-3xl 
    bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700
    p-10 text-center shadow-lg backdrop-blur-md h-[680px] break-inside-avoid"
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
  {/* Optional: Remove or replace background image */}
  
  <div className="relative z-10 flex flex-col items-center mt-40">
    <Logo className="scale-110 mb-8" />
    <h1 className="text-lg font-semibold uppercase tracking-[0.25em] text-white mb-4">
      Sunday Service Moments
    </h1>
    <p className="max-w-[45ch] text-white/80 leading-relaxed mb-8">
      Capturing the spirit of worship, fellowship, and community at Dominion City Church. 
      Every Sunday is a celebration of faith, hope, and love.
    </p>
    <a
      className="inline-block rounded-lg border-2 border-white bg-white px-6 py-2.5 
         text-sm font-semibold text-blue-900 transition hover:bg-transparent hover:text-white"
      href="https://www.dominioncity.org"
      target="_blank"
      rel="noreferrer"
    >
      Visit Our Website
    </a>
  </div>
</motion.div>
```

---

## Quick Customization Checklist

- [ ] Update page title in `pages/index.tsx`
- [ ] Change hero card heading and description
- [ ] Update button link to church website
- [ ] Choose and apply church brand colors
- [ ] Replace logo in `components/Icons/Logo.tsx`
- [ ] Add church logo to `public` folder
- [ ] Update favicon files
- [ ] Customize image alt text
- [ ] Create and add social media preview image
- [ ] Test on desktop and mobile

---

## Testing Your Changes

After making customizations:

1. **Save all files**
2. **Restart development server**:
   ```bash
   npm run dev
   ```
3. **Open browser** to `http://localhost:3000`
4. **Check all changes** are visible
5. **Test responsive design** by resizing browser
6. **Test on mobile device**

---

## Next Steps

Once you've customized the gallery:

1. Upload your Sunday service photos to Cloudinary
2. Build and deploy (see [SETUP.md](./SETUP.md) Step 8-9)
3. Share the link with your congregation!

---

## Need Help?

If you're not comfortable making code changes, consider:
- Asking a tech-savvy church member for help
- Hiring a developer for a few hours to implement these changes
- Using the gallery as-is and just uploading your photos

Most customizations are simple text replacements and don't require programming knowledge!
