# Image Gallery Web Application

A beautiful, modern photo gallery built with Next.js and Cloudinary. Perfect for showcasing event photos, church services, conferences, or any photo collection with a professional, responsive masonry layout.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/njokusomto/abf2025-gallery&project-name=photo-gallery&repository-name=photo-gallery&env=NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,CLOUDINARY_API_KEY,CLOUDINARY_API_SECRET,CLOUDINARY_FOLDER&envDescription=API%20Keys%20from%20Cloudinary%20needed%20to%20run%20this%20application.)

## 🎯 Live Demo

Currently showcasing Africa Blockchain Festival 2025 photos. Can be easily customized for any use case.

## ✨ Features

- 📸 **Automatic Image Loading** from Cloudinary folders
- 🎨 **Responsive Masonry Layout** that adapts to any screen size
- 🖼️ **Full-Screen Modal Viewer** with smooth transitions
- ⌨️ **Keyboard Navigation** (arrow keys, ESC to close)
- 📱 **Mobile-Optimized** with touch gestures
- ⚡ **Optimized Performance** with blur placeholders and lazy loading
- 🎭 **Smooth Animations** powered by Framer Motion
- 🎨 **Fully Customizable** colors, text, and branding

## 🚀 Quick Start for Churches

**Want to use this for your church?** We've created comprehensive guides:

### 📚 Documentation

1. **[QUICKSTART.md](./QUICKSTART.md)** - Get started in 30 minutes
2. **[SETUP.md](./SETUP.md)** - Complete setup and deployment guide
3. **[CHURCH_CUSTOMIZATION.md](./CHURCH_CUSTOMIZATION.md)** - Customize for your church
4. **[RECOMMENDED_NAMES.md](./RECOMMENDED_NAMES.md)** - App naming suggestions for Dominion City Church

### ⚡ Quick Setup (TL;DR)

```bash
# 1. Clone the repository
git clone https://github.com/njokusomto/abf2025-gallery.git
cd abf2025-gallery

# 2. Install dependencies
npm install

# 3. Configure environment (add your Cloudinary credentials)
cp .env.local.example .env.local
# Edit .env.local with your credentials

# 4. Run locally
npm run dev

# 5. Build for production
npm run build

# 6. Deploy to Vercel
vercel
```

See **[SETUP.md](./SETUP.md)** for detailed instructions.

## 🛠️ Tech Stack

- **[Next.js 16](https://nextjs.org/)** - React framework with server-side rendering
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Cloudinary](https://cloudinary.com/)** - Cloud-based image storage and optimization
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library
- **[Headless UI](https://headlessui.dev/)** - Accessible UI components

## 📋 Prerequisites

- Node.js 18 or higher
- npm or yarn
- Cloudinary account (free tier available)
- Vercel account for deployment (optional, free tier available)

## 🔧 Configuration

1. **Sign up for Cloudinary** at [cloudinary.com](https://cloudinary.com)
2. **Create a folder** in your Cloudinary Media Library
3. **Upload your photos** to that folder
4. **Copy your credentials** from the Cloudinary dashboard
5. **Set environment variables** in `.env.local`:

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
CLOUDINARY_FOLDER=your-folder-name
```

## 🎨 Customization

This gallery is highly customizable. You can easily change:

- **Colors and Branding** - Update Tailwind classes or theme
- **Logo** - Replace in `components/Icons/Logo.tsx`
- **Text Content** - Update in `pages/index.tsx`
- **Favicon** - Replace files in `public/` folder
- **Layout** - Modify the masonry grid columns

See **[CHURCH_CUSTOMIZATION.md](./CHURCH_CUSTOMIZATION.md)** for detailed customization instructions.

## 📱 Use Cases

Perfect for:

- ✝️ **Churches** - Sunday service photos, events, baptisms
- 🎤 **Conferences** - Event coverage, speaker photos
- 🎓 **Schools** - Campus events, graduations, activities  
- 🏢 **Organizations** - Team photos, company events
- 🎉 **Events** - Weddings, parties, celebrations
- 🎨 **Portfolios** - Photography showcases

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy! 🎉

### Other Options

- **Netlify** - Works great with Next.js
- **Custom Server** - Deploy to any server with Node.js

See **[SETUP.md](./SETUP.md)** for detailed deployment instructions.

## 💰 Cost

- **Cloudinary Free Tier**: 25GB storage, 25GB bandwidth/month - FREE ✅
- **Vercel Free Tier**: Unlimited personal sites - FREE ✅
- **Optional Domain**: $10-15/year

**Total**: FREE (or $10-15/year with custom domain)

## 📸 Adding Photos

Simply:
1. Upload photos to your Cloudinary folder
2. Rebuild your site (automatic on Vercel)
3. Photos appear automatically!

## 🐛 Troubleshooting

**Images not showing?**
- Verify Cloudinary credentials in `.env.local`
- Check folder name matches exactly (case-sensitive)
- Restart dev server after changing `.env.local`

**Build errors?**
```bash
rm -rf node_modules .next
npm install
npm run dev
```

See **[SETUP.md](./SETUP.md)** for more troubleshooting help.

## 📄 License

Open source and free to use. Originally based on the Next.js Cloudinary example.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 📞 Support

- Check the documentation guides in this repository
- Review [Next.js documentation](https://nextjs.org/docs)
- Review [Cloudinary documentation](https://cloudinary.com/documentation)

## ⭐ Credits

Built with Next.js and Cloudinary. Customized for the Africa Blockchain Festival 2025.

---

**Ready to create your own gallery?** Start with **[QUICKSTART.md](./QUICKSTART.md)** or **[SETUP.md](./SETUP.md)**!
