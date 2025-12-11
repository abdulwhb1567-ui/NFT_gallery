NFT GALLERY APPLICATION
=======================

PROJECT OVERVIEW
An interactive NFT gallery web application built with React and Vite. Showcases digital art
with filtering, sorting, and a dedicated detail page for each NFT.

CORE FEATURES

1. GALLERY PAGE
   - Display NFT cards in a responsive CSS grid layout
   - Each card shows image, name, artist, and price in ETH
   - Click any card to view full details

2. SEARCH & FILTERING
   - Search by NFT name or artist name (debounced 250ms for performance)
   - Filter by artist dropdown
   - Price range filtering (min/max ETH sliders)
   - Results update in real-time

3. SORTING OPTIONS
   - Newest (by minted date)
   - Price ascending / descending
   - Name alphabetical (A–Z)

4. PAGINATION
   - Configurable items per page (6, 12, or 24 per view)
   - Page navigation with Previous/Next buttons and number links
   - Total item count displayed

5. DETAIL PAGE
   - Click any NFT card to open full detail view
   - Shows large image, artist, price, and description
   - Back link returns to gallery
   - Route-based navigation with React Router

6. CLEAR FILTERS
   - One-click button to reset all filters to defaults
   - Returns to page 1 and full dataset

TECHNICAL STACK

Framework: React 19 + Vite 7
Routing: React Router v6
Styling: Plain CSS (Grid, Flexbox)
Build Tool: Vite (HMR hot module reloading)

DATA & MOCK SETUP

Mock NFT dataset in src/data/nfts.js:
  - 5 sample NFTs
  - Each entry: id, name, artist, price, image URL, description, minted date
  - Images served from picsum.photos placeholder service

GETTING STARTED

Install dependencies:
  npm install

Start development server:
  npm run dev
  
  Server runs on http://localhost:5173
  Supports hot module reloading (HMR)

Build for production:
  npm run build
  
  Output: dist/ folder (ready for deployment)

Preview production build:
  npm run preview

PROJECT STRUCTURE

/src
  /components
    NFTCard.jsx       - Reusable NFT card component for gallery grid
  /pages
    Gallery.jsx       - Main gallery page with filters and pagination
    Detail.jsx        - NFT detail view page
  /data
    nfts.js          - Mock NFT dataset
  App.jsx            - Root component with routing setup
  main.jsx           - React entry point
  index.css          - Global styles (grid, flexbox, layout)

vite.config.js       - Vite configuration with React plugin
index.html           - HTML entry point
package.json         - Dependencies and scripts

DESIGN PHILOSOPHY

Modern & Minimalist UI:
  - Clean typography with system fonts
  - Light background (#f7f7fb) for minimal visual noise
  - Subtle box shadows and rounded corners
  - Responsive grid that adapts to screen size

Accessibility:
  - Semantic HTML tags
  - Accessible form inputs with labels
  - Clear visual hierarchy

PERFORMANCE OPTIMIZATIONS

1. Debounced Search - 250ms delay prevents excessive re-renders on rapid typing
2. useMemo Hooks - Filtering and sorting logic cached until dependencies change
3. Vite HMR - Fast refresh during development
4. Lazy Pagination - Only renders visible page items

FUTURE ENHANCEMENTS

- Add favorite/wishlist functionality
- Integration with blockchain wallet (MetaMask)
- Backend API for real NFT metadata
- Image optimization and lazy loading
- Advanced filters (tags, rarity traits)
- Infinite scroll alternative to pagination
- Dark mode toggle
- Analytics tracking

BROWSER SUPPORT

Modern browsers with ES6+ support:
  - Chrome 90+
  - Firefox 88+
  - Safari 14+
  - Edge 90+

DEPLOYMENT

Build: npm run build
Output directory: dist/
Deploy to: Vercel, Netlify, GitHub Pages, or any static host

NOTES

- Mock images from picsum.photos may vary load time based on network
- For production, replace placeholder images with actual NFT artwork
- API integration requires backend service for real blockchain metadata
