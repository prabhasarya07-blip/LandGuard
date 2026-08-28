# 🏞️ LandGuard

**LandGuard** is a modern web application built with React, TypeScript, and Vite for land management and conservation. It provides a comprehensive platform for tracking, managing, and protecting land resources with real-time updates and Supabase integration.

## 🚀 Features

- **Real-time Data Management** - Powered by Supabase for seamless backend integration
- **Responsive UI** - Built with React 18 and styled with TailwindCSS
- **Type-Safe Development** - Full TypeScript support for robust code
- **Modern Build Tools** - Vite for lightning-fast development and optimized production builds
- **Component Library** - Radix UI components for accessible and customizable UI
- **Routing** - React Router v7 for smooth navigation

## 📋 Tech Stack

- **Frontend Framework**: React 18.3.1
- **Language**: TypeScript 5.5.3
- **Build Tool**: Vite 5.4.0
- **Styling**: TailwindCSS 3.4.19
- **UI Components**: Radix UI
- **Database**: Supabase 2.112.4
- **Routing**: React Router DOM 7.18.2
- **Icons**: Lucide React 1.34.0

## 📦 Dependencies

### Main Dependencies
```json
{
  "@radix-ui/react-dialog": "^1.1.23",
  "@radix-ui/react-dropdown-menu": "^2.1.24",
  "@radix-ui/react-label": "^2.1.15",
  "@radix-ui/react-progress": "^1.1.16",
  "@radix-ui/react-select": "^2.3.7",
  "@radix-ui/react-slot": "^1.3.3",
  "@supabase/supabase-js": "^2.112.4",
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "lucide-react": "^1.34.0",
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^7.18.2",
  "tailwind-merge": "^3.6.0"
}
```

### Dev Dependencies
- **Vite**: ^5.4.0
- **TypeScript**: ^5.5.3
- **ESLint**: ^9.8.0 (with TypeScript and React plugins)
- **TailwindCSS**: ^3.4.19
- **PostCSS**: ^8.5.26

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ and npm/yarn installed
- Git for version control

### 1. Clone the Repository
```bash
git clone https://github.com/prabhasarya07-blip/LandGuard.git
cd LandGuard
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory and add your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📖 Available Scripts

- **`npm run dev`** - Start the development server with HMR (Hot Module Replacement)
- **`npm run build`** - Build TypeScript and create optimized production build
- **`npm run lint`** - Run ESLint to check code quality
- **`npm run preview`** - Preview the production build locally

## 🏗️ Project Structure

```
LandGuard/
├── src/                    # Source code
│   ├── components/        # React components
│   ├── pages/            # Page components
│   ├── hooks/            # Custom React hooks
│   ├── services/         # API and external services
│   ├── utils/            # Utility functions
│   ├── styles/           # Global styles
│   ├── App.tsx           # Main App component
│   └── main.tsx          # Entry point
├── public/               # Static assets
├── supabase/            # Supabase configuration and migrations
├── screenshots/         # Project screenshots
├── index.html           # HTML template
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript configuration
├── tailwind.config.js   # TailwindCSS configuration
├── postcss.config.js    # PostCSS configuration
├── eslint.config.js     # ESLint configuration
└── package.json         # Project metadata and dependencies
```

## 🚀 Development Workflow

### Starting Development Server
```bash
npm run dev
```
The app will be available at `http://localhost:5173` (or another port if 5173 is in use).

### Building for Production
```bash
npm run build
```
This will:
1. Compile TypeScript code
2. Bundle with Vite
3. Generate optimized production build in the `dist/` folder

### Code Quality
```bash
npm run lint
```
Ensures all code follows ESLint rules and TypeScript standards.

## 📝 ESLint Configuration

The project uses TypeScript-aware ESLint rules for production-ready code:
- Recommended TypeScript rules for type safety
- React best practices
- React Hooks linting
- React Refresh optimization

To enable stricter type checking, update `eslint.config.js`:
```js
...tseslint.configs.strictTypeChecked  // More strict than recommended
```

## 🌐 Deployment

### Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
1. Push to GitHub
2. Connect your repository to Netlify
3. Set Build Command: `npm run build`
4. Set Publish Directory: `dist`

### Deploy to GitHub Pages
Configure `vite.config.ts`:
```ts
export default defineConfig({
  base: '/LandGuard/',
  plugins: [react()],
})
```

Then build and deploy:
```bash
npm run build
# Push dist/ to gh-pages branch
```

## 🔐 Environment Variables

Required environment variables for Supabase integration:
- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous key

> ⚠️ **Note**: VITE_ prefix makes variables accessible in the browser. Never expose sensitive keys.

## 📚 Learn More

- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org)
- [Vite Documentation](https://vitejs.dev)
- [TailwindCSS Documentation](https://tailwindcss.com)
- [Supabase Documentation](https://supabase.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/docs)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source. See LICENSE file for details.

## 📧 Support

For issues, questions, or suggestions, please open an [issue](https://github.com/prabhasarya07-blip/LandGuard/issues) on GitHub.

---

**Last Updated**: August 2026  
**Maintainer**: prabhasarya07-blip
