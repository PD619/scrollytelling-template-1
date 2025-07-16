# Scrollytelling Website

A high-quality scrollytelling website built with Next.js 14, featuring advanced scroll animations, parallax effects, and immersive user interactions.

## Features

### Core Scrollytelling Elements
- **Sticky Scroll Progress Indicator** - Visual progress tracking with percentage display
- **Parallax Scrolling** - Multi-layered depth effects with different scroll speeds
- **Video Scroll Integration** - Viewport-controlled video playback with custom controls
- **Horizontal Scroll Section** - Smooth side-scrolling content with mouse interaction
- **Morphing Animations** - Shape-changing elements that transform on scroll
- **Scroll-Triggered Reveals** - Elements that animate into view based on scroll position
- **Viewport Animations** - Responsive animations triggered by element visibility

### Interactive Components
- **Carousel Cards** - 3D-effect card carousel with mouse hover interactions
- **Gooey Effects** - Fluid, organic animations with SVG filters
- **3D Animations** - True 3D transformations with perspective and depth
- **Animated SVG** - Scalable vector graphics with path animations and morphing
- **Mouse Hover Effects** - Interactive elements that respond to cursor movement

### Technical Features
- **Mobile-First Responsive Design** - Optimized for all device sizes
- **Smooth Scroll Integration** - Lenis smooth scrolling for buttery performance
- **Performance Optimized** - Framer Motion animations with proper optimization
- **TypeScript Support** - Full type safety throughout the codebase
- **Modern React Patterns** - Hooks, context, and component composition

## Technology Stack

### Core Framework
- **Next.js 14** - React framework with App Router
- **React 18** - Latest React features and concurrent rendering
- **TypeScript** - Type-safe development

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality component library
- **Custom CSS** - Advanced animations and effects

### Animation Libraries
- **Framer Motion** - Production-ready motion library
- **Lenis** - Smooth scrolling library
- **GSAP** - Advanced animation capabilities
- **Intersection Observer** - Viewport detection

### Development Tools
- **ESLint** - Code linting and formatting
- **Prisma** - Database ORM (ready for future features)
- **Lucide React** - Modern icon library

## Project Structure

```
├── app/
│   ├── globals.css          # Global styles and utilities
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main scrollytelling page
├── components/
│   ├── animated-svg-section.tsx    # SVG animations
│   ├── carousel-section.tsx        # Interactive carousel
│   ├── footer.tsx                  # Footer component
│   ├── gooey-section.tsx          # Fluid animations
│   ├── hero-section.tsx           # Hero section with GSAP
│   ├── horizontal-scroll-section.tsx  # Side-scrolling
│   ├── parallax-section.tsx       # Parallax effects
│   ├── reveal-section.tsx         # Scroll reveals
│   ├── scroll-progress.tsx        # Progress indicator
│   ├── scrollytelling-section.tsx # Morphing animations
│   ├── threed-section.tsx         # 3D interactions
│   └── video-scroll-section.tsx   # Video controls
├── lib/                     # Utility functions
├── hooks/                   # Custom React hooks
└── public/                  # Static assets
```

## Key Features Implementation

### Scroll Progress Indicator
- Sticky position with smooth animation
- Circular progress display with percentage
- Responsive design with backdrop blur

### Parallax Effects
- Multi-layer parallax with different scroll speeds
- Depth-based opacity changes
- Smooth performance optimization

### Video Scroll Integration
- Custom video controls with play/pause
- Scroll-based video progression
- Responsive video container

### 3D Animations
- True CSS 3D transformations
- Mouse-responsive perspective changes
- Multiple cube animations with different timing

### Gooey Effects
- SVG filter-based morphing
- Mouse-interactive fluid animations
- Organic, life-like motion

### Mobile Responsiveness
- Touch-friendly interactions
- Optimized performance on mobile devices
- Adaptive layout for different screen sizes

## Performance Considerations

- **Lazy Loading** - Components load only when needed
- **Optimized Animations** - Hardware-accelerated transformations
- **Smooth Scrolling** - Lenis for 60fps scroll performance
- **Memory Management** - Proper cleanup of event listeners
- **Bundle Optimization** - Code splitting and tree shaking

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

4. **Start Production Server**
   ```bash
   npm start
   ```

## Browser Support

- Modern browsers with CSS Grid support
- WebGL for 3D effects
- Intersection Observer API
- CSS transforms and animations

## Future Enhancements

- WebGL-based 3D scenes
- Advanced particle systems
- Audio-visual synchronization
- Performance monitoring dashboard
- CMS integration for content management

## License

This project is created as a demonstration of modern web animation techniques and scrollytelling capabilities.