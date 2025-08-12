# 🎨 Manga Portfolio

A modern, manga-themed portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features a unique comic book aesthetic with fully editable content through an intuitive UI.

![Manga Portfolio Screenshot](https://manga-portfolio-477tgh6pv-jamal-hintons-projects.vercel.app)

## ✨ Features

- 🎭 **Manga-themed design** with comic book panels and speech bubbles
- 📝 **Fully editable content** - Edit everything directly through the UI
- 🎨 **Dynamic project showcase** with editable images and repository links
- 📱 **Responsive design** that works on all devices
- ⚡ **Fast performance** with Next.js static generation
- 🔗 **Social media integration** with real working links
- 🎯 **Clean architecture** with reusable components

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Malgsx/manga-portfolio.git
   cd manga-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser Environments**
   
Local Development
- **URL**:Check local host in order to run.
- **Purpose**: Development, testing, and contributions
- **Database**: Local SQLite or development database

### Production (Vercel)
- **URL**: Your custom Vercel domain
- **Purpose**: Live application for end users  
- **Database**: Production database connection


## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Deployment:** [Vercel](https://vercel.com/)

## 🎨 Customization & Styling

### Quick Personalization

1. **Update your information** in the components:
   - Edit social media links in `components/profile-section.tsx`
   - Update contact details in `app/page.tsx`
   - Modify about me content in `components/about-section.tsx`

2. **Add your projects** using the UI:
   - Click edit buttons on project cards
   - Update GitHub repository URLs
   - Upload custom project images

### Advanced Styling with shadcn/ui

This project uses [shadcn/ui](https://ui.shadcn.com/) for components. Add new components:

```bash
npx shadcn@latest add [component-name]
```

**Popular components to enhance your portfolio:**
```bash
# Add a contact form
npx shadcn@latest add form

# Add data tables for detailed project info
npx shadcn@latest add table

# Add a theme switcher
npx shadcn@latest add switch

# Add animated loading states
npx shadcn@latest add skeleton
```

### Color Customization with Tweakcn

Use [Tweakcn](https://www.tweakcn.com/) to easily customize the color scheme:

1. Visit [tweakcn.com](https://www.tweakcn.com/)
2. Choose your preferred color palette
3. Copy the generated CSS variables
4. Update `app/globals.css` with your new colors

### Custom Comic Book Effects

The manga theme uses custom CSS classes in `styles/globals.css`:

- `.comic-panel` - Speech bubble containers
- `.speech-bubble` - Individual speech bubbles  
- `.halftone-bg` - Comic book halftone patterns
- `.action-lines` - Dynamic action line backgrounds
- `.tech-*` - Technology badge color schemes

## 📁 Project Structure

```
manga-portfolio/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles and comic effects
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main page with tabs
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── about-section.tsx # About me with speech bubbles
│   ├── manga-showcase.tsx # Featured project showcase
│   ├── profile-section.tsx # Profile with social links
│   └── projects-grid.tsx  # Project cards grid
├── public/               # Static assets
│   └── images/          # Comic book images
├── styles/              # Additional styles
└── lib/                 # Utility functions
```

## 🎯 Editable Features

All content can be edited directly through the UI:

### Profile Section
- Profile picture upload
- Name and bio editing
- Social media links (GitHub, Twitter, Substack)

### Featured Project
- Project title and description
- Demo and source code URLs
- Technologies used
- Key features list
- Project image

### Projects Grid
- Individual project repository URLs
- Project images
- Show/hide additional projects

### About Me Section
- Multiple speech bubble content
- Personal story sections

## 📦 Building for Production

```bash
# Build the application
npm run build

# Start production server locally
npm start
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com/)
3. Deploy with zero configuration

### Deploy to Netlify

1. Build the project: `npm run build`
2. Upload the `out` folder to Netlify
3. Configure for static hosting

### Deploy to Other Platforms

This is a standard Next.js application and can be deployed to any platform that supports Node.js applications.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🎮 Inspiration

This portfolio draws inspiration from:
- Japanese manga and comic book aesthetics
- Modern web design principles
- Interactive storytelling elements

## 📞 Support

If you have any questions or need help customizing your portfolio:

- 📧 Email: [jamal.hinton@gmail.com](mailto:jamal.hinton@gmail.com)
- 🐦 Twitter: [@MalGsx](https://x.com/MalGsx)
- 💼 LinkedIn: [jamalhinton](https://www.linkedin.com/in/jamalhinton/)

---

⭐ **Star this repository if you found it helpful!**

Built with ❤️ using [v0](https://v0.dev) by Vercel
# Trigger deployment - Tue Aug 12 12:57:25 EDT 2025
