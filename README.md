# Stuttgart International

Premium website for Stuttgart International Auto Body - Porsche Approved Collision Center in Fort Lauderdale, FL.

## About

Stuttgart International is a Porsche Certified Collision Center specializing in precision European auto body repair. This website showcases their services, portfolio, and provides a contact interface for potential clients.

**Business Information:**
- Location: 1055 NW 51st Ct, Fort Lauderdale, FL 33309
- Phone: (954) 563-5011
- Hours: Monday - Friday: 8:00 AM - 5:00 PM
- Google Rating: 4.8 stars

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **GSAP** - Animation library with ScrollTrigger
- **PostCSS** - CSS processing

## Design System

### Color Palette (Porsche-Inspired)
- **Gold**: `#CDA434` - Primary accent color
- **Red**: `#B12B28` - Porsche racing red for accents
- **Black**: `#0a0a0a` - Primary background
- **Charcoal**: `#1a1a1a` - Secondary background
- **Steel**: `#2d2d2d` - Tertiary elements
- **Silver**: `#c0c0c0` - Body text
- **White**: `#f5f5f5` - Headings

### Typography
- **Display Font**: Cormorant Garamond (headings, elegant serif)
- **Body Font**: Outfit (body text, modern sans-serif)

## Project Structure

```
stuttgartinternational/
├── src/
│   ├── components/
│   │   ├── contact/          # Contact form components
│   │   ├── gallery/          # Gallery grid and lightbox
│   │   ├── home/             # Homepage sections
│   │   ├── layout/           # Header, footer, intro animation
│   │   ├── services/         # Service cards and details
│   │   └── ui/               # Reusable UI components
│   ├── data/
│   │   └── reviews.json      # Real Google reviews data
│   ├── pages/                # Route pages
│   ├── App.jsx               # Main app component
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles
├── public/
│   └── images/               # All website images
├── index.html                # HTML entry point
├── vite.config.js            # Vite configuration
├── tailwind.config.js        # Tailwind configuration
└── package.json              # Dependencies
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/KevinTheGoat/Stuttgart-International.git
cd stuttgartinternational
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## Features

### Pages
- **Home** - Hero section, services preview, gallery preview, reviews
- **Services** - Detailed service offerings with imagery
- **Gallery** - Filterable portfolio of completed work
- **About** - Company history, stats, values, facility showcase
- **Contact** - Contact form, location map, business info, social media

### Key Features
- ✨ Intro splash animation on first visit (session-based)
- 🎨 GSAP animations throughout (scroll-triggered and page load)
- 📱 Fully responsive design
- 🎯 Porsche-inspired color scheme and aesthetics
- ⭐ Real Google reviews integration (4.8 rating)
- 🖼️ Gallery with category filtering
- 📍 Embedded Google Maps
- 📧 Contact form with validation
- 🔗 Social media integration (Instagram, Facebook, TikTok)

## Social Media

The contact page includes links to Stuttgart International's social media:
- Instagram: [@stuttgartinternational](https://instagram.com/stuttgartinternational)
- Facebook: [Stuttgart International](https://facebook.com/stuttgartinternational)
- TikTok: [@stuttgartinternational](https://tiktok.com/@stuttgartinternational)

*Note: Update these URLs in `src/pages/Contact.jsx` if handles change*

## Credits

**Website designed & developed by:**
Kevin Moreau
Email: [kevinmoreau@kevco.co](mailto:kevinmoreau@kevco.co)

---

© 2026 Stuttgart International. All rights reserved.
