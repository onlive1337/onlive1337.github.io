# Personal Portfolio Website

A modern, responsive portfolio website built with Next.js, React, and TypeScript, featuring real-time integrations with Discord, Spotify, and Steam.

## ✨ Features

- **Real-time Status Integration**
  - Discord presence status
  - Currently playing track on Spotify
  - Steam gaming activity

- **Modern Tech Stack**
  - Next.js 13+ with App Router
  - React 18 with Server Components
  - TypeScript for type safety
  - Tailwind CSS for styling
  - Cloudflare for CDN and optimization

- **Design Features**
  - Responsive design for all devices
  - Dark/Light mode support
  - Smooth animations and transitions
  - Dynamic background effects

- **Performance**
  - Optimized images and assets
  - Component-level code splitting
  - Efficient data fetching with caching
  - 99+ Lighthouse performance score

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Installation

1. Clone the repository:

```bash
git clone https://github.com/onlive1337/onlive1337.github.io.git
cd onlive1337.github.io
```

1. Install dependencies:

```bash
npm install
# or
yarn install
```

1. Create a `.env` file in the root directory and add your API keys:

```env
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REFRESH_TOKEN=your_spotify_refresh_token
STEAM_API_KEY=your_steam_api_key
STEAM_ID=your_steam_id
```

1. Run the development server:

```bash
npm run dev
# or
yarn dev
```

1. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Project Structure

```text
├── src/
│   ├── app/               # Next.js app directory
│   ├── components/        # React components
│   │   ├── layout/       # Layout components
│   │   └── sections/     # Page sections
│   ├── lib/              # Utility functions
│   ├── types/            # TypeScript types
│   └── utils/            # Helper functions
├── public/               # Static assets
└── README.md            # Project documentation
```

## 🔧 Configuration

### API Integration

The project uses several APIs for real-time data:

- **Discord**: Uses Discord API for status updates
- **Spotify**: Requires Spotify API credentials for music tracking
- **Steam**: Uses Steam API for game activity

### Environment Variables

Required environment variables:

```env
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
SPOTIFY_REFRESH_TOKEN=
STEAM_API_KEY=
STEAM_ID=
```

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run analyze` - Analyze bundle size

### Code Style

The project uses:

- ESLint for code linting
- Prettier for code formatting
- TypeScript for type checking

## 📱 Deploy

This website is deployed using GitHub Pages. The deployment is automated through GitHub Actions.

To deploy your own version:

1. Fork this repository
2. Enable GitHub Pages in repository settings
3. Configure deployment secrets in repository settings
4. Push changes to the main branch

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Contact

Onlive - [@onswix](https://t.me/onswix)

Project Link: [https://github.com/onlive1337/onlive1337.github.io](https://github.com/onlive1337/onlive1337.github.io)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
