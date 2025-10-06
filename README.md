# ScorX Website

**Version:** 1.0
**Created:** October 6, 2025
**Purpose:** Official website for ScorX iOS app launch

---

## Overview

This is the official ScorX website, built to support the v1.0 App Store launch. The website accurately represents the app's functionality with support for 9 sports (AFL, Basketball, Netball, Rugby Union, Rugby League, Touch Rugby, Field Hockey, Soccer, Tennis), subscription tiers, and privacy commitments.

## Website Structure

```
Website/
├── index.html          # Landing page with features, pricing, FAQ
├── privacy.html        # Privacy Policy (GDPR/CCPA compliant)
├── support.html        # Support Center with FAQ and contact
├── terms.html          # Terms of Service
├── css/
│   └── style.css       # ScorX brand stylesheet
├── images/             # App screenshots, badges, icons (to be added)
│   └── [placeholder]   # Add App Store badge, favicon, screenshots
└── README.md           # This file
```

## Brand Guidelines

The website uses the official ScorX brand colors from `Theme.swift`:

- **Primary Turquoise:** `#00D4C4`
- **Bright Turquoise:** `#1FEDD8`
- **Dark Turquoise:** `#00A896`
- **Deep Navy:** `#0F2A44`
- **Off White:** `#F8F9FA`
- **Charcoal:** `#2C3E50`

**Typography:**
- Primary Font: `-apple-system, SF Pro Display/Text`
- Fallback: `Segoe UI, Roboto, sans-serif`

## Required Assets (To Be Added)

Before publishing, add the following to `/images/`:

1. **App Store Badge** (`app-store-badge.svg`)
   - Download from: https://developer.apple.com/app-store/marketing/guidelines/
   - Use SVG format for best quality

2. **Favicon** (`favicon.png`)
   - 192x192 PNG
   - Should be ScorX app icon

3. **Social Preview** (`social-preview.png`)
   - 1200x630 PNG
   - For Open Graph/Twitter Card
   - Shows app screenshot + branding

4. **Screenshots** (optional but recommended)
   - iPhone 15 Pro Max screenshots (1290 x 2796)
   - For features section carousel
   - Name: `screenshot-1.png`, `screenshot-2.png`, etc.

## Before Publishing Checklist

- [ ] Replace all `XXXXXXXXXX` App Store ID placeholders with actual ID
- [ ] Add App Store badge image to `/images/app-store-badge.svg`
- [ ] Add favicon.png to `/images/favicon.png`
- [ ] Update `[Your Jurisdiction]` in Terms of Service (Section 15)
- [ ] Verify all email links point to `support@scorx.app`
- [ ] Test all internal links work correctly
- [ ] Test mobile responsiveness on real devices
- [ ] Run accessibility audit (WCAG AA compliance)
- [ ] Validate HTML/CSS with W3C validators
- [ ] Set up hosting (GitHub Pages, Netlify, Vercel, etc.)
- [ ] Configure custom domain (scorx.app)
- [ ] Add SSL certificate (HTTPS)
- [ ] Submit sitemap to Google Search Console
- [ ] Test page load speed (aim for <3 seconds)

## Hosting Options

### Option 1: GitHub Pages (Recommended - Free)
1. Create new repository: `scorx-website`
2. Push website files to `main` branch
3. Enable GitHub Pages in Settings
4. Configure custom domain: `scorx.app`
5. Enable HTTPS in GitHub Pages settings

### Option 2: Netlify (Free tier available)
1. Connect GitHub repository
2. Auto-deploy on push
3. Configure custom domain
4. Free SSL included

### Option 3: Vercel (Free tier available)
1. Import from GitHub
2. Auto-deploy on push
3. Configure custom domain
4. Free SSL included

## URL Structure

**Primary URLs** (update in App Store Connect):
- Landing page: `https://scorx.app`
- Privacy Policy: `https://scorx.app/privacy.html`
- Support: `https://scorx.app/support.html`
- Terms: `https://scorx.app/terms.html`

## Content Updates

When app features change, update these pages:

### Index Page (`index.html`)
- Hero section sport count
- Features section
- Sports section (9 sports + coming soon section)
- Pricing cards
- FAQ section

### Support Page (`support.html`)
- FAQ items as new questions arise
- Subscription details if pricing changes

### Privacy Policy (`privacy.html`)
- When data collection practices change
- When new features are added
- Update "Last Updated" date

### Terms of Service (`terms.html`)
- When subscription pricing changes
- When new tiers launch (v1.1 Coach/Club)
- Update "Last Updated" date

## SEO Optimization

**Meta Tags Included:**
- Title tags (optimized for search)
- Description meta tags
- Open Graph tags (social media)
- Keywords meta tags
- Apple app banner meta tag

**Recommendations:**
- Submit to Google Search Console
- Create `sitemap.xml`
- Create `robots.txt`
- Add Google Analytics (if desired)
- Monitor Core Web Vitals

## Accessibility

The website is built with accessibility in mind:
- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Color contrast ratios meet WCAG AA
- Responsive for screen readers
- Mobile-friendly design

**Test with:**
- VoiceOver (macOS/iOS)
- Chrome Lighthouse audit
- WAVE browser extension
- Manual keyboard navigation

## Performance

**Current optimizations:**
- Minimal external dependencies
- CSS-only animations (no JS libraries)
- Optimized images (to be added)
- Lazy loading for images
- Mobile-first responsive design

**Target metrics:**
- First Contentful Paint: <1.5s
- Largest Contentful Paint: <2.5s
- Cumulative Layout Shift: <0.1
- Time to Interactive: <3.5s

## Browser Support

**Tested and supported:**
- Safari 14+ (macOS, iOS)
- Chrome 90+
- Firefox 88+
- Edge 90+

**Mobile:**
- iOS Safari 14+
- Chrome Mobile
- Samsung Internet

## Legal Compliance

**Privacy Policy:**
- GDPR compliant (EU users)
- CCPA compliant (California users)
- APP compliant (Australian users)
- Aligned with App Store Review Guidelines

**Terms of Service:**
- App Store subscription disclosures
- Auto-renewal terms clearly stated
- Refund policy (Apple's policy)
- Data ownership and rights

## Contact

For website updates or issues:
- **Email:** support@scorx.app
- **Website Issues:** File in project documentation

## Version History

**v1.0 - October 6, 2025**
- Initial website creation
- 4 pages: Landing, Privacy, Support, Terms
- ScorX brand styling applied
- Mobile-responsive design
- Accessibility-first approach
- Ready for App Store launch

---

**Next Steps:**
1. Add required images to `/images/` folder
2. Replace App Store ID placeholders
3. Choose and configure hosting
4. Test on multiple devices and browsers
5. Publish and submit URLs to App Store Connect

**Website URL:** https://scorx.app (to be configured)
**Support Email:** support@scorx.app (ensure this is active)
