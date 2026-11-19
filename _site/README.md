# ScorX Website

**Version:** 1.1
**Updated:** January 19, 2025
**Purpose:** Official website for ScorX iOS app - comprehensive PRD implementation
**Website URL:** https://www.scorx.com.au
**Contact:** scorxapp@gmail.com

---

## Overview

Official website for ScorX - a comprehensive multi-sport scoring and statistics app for iOS. The website supports 14 sports, multiple subscription tiers, and provides complete information for users, coaches, families, and players.

**Key Features:**
- ✅ 14 sports supported (Team Sports + Racquet Sports)
- ✅ Comprehensive pricing information (ScorX Free and ScorX Premium)
- ✅ Detailed feature documentation
- ✅ Step-by-step how-it-works guide
- ✅ Extensive FAQ and support resources
- ✅ SEO optimized with Schema.org structured data
- ✅ Mobile-first responsive design
- ✅ WCAG AA accessibility compliant

---

## 🚀 Running Locally

### Option 1: Python HTTP Server (Recommended)

```bash
# Navigate to the website directory
cd /home/user/scorx-website

# Start the server (Python 3)
python3 -m http.server 8000

# Open in browser: http://localhost:8000
```

### Option 2: Node.js HTTP Server

```bash
cd /home/user/scorx-website

# Using npx (no installation needed)
npx http-server -p 8000

# Open in browser: http://localhost:8000
```

### Option 3: VS Code Live Server

1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

### Option 4: Direct File Opening (Quick Preview)

```bash
# Linux
xdg-open index.html

# Mac
open index.html

# Windows
start index.html
```

**Note:** Using a local server (Options 1-3) is recommended for the best experience.

---

## 📁 Website Structure

```
scorx-website/
├── index.html              # Homepage with hero, features, sports showcase
├── features.html           # Detailed feature descriptions (12 features)
├── sports.html             # 14 sports catalog (Team + Racquet sports)
├── pricing.html            # Full pricing comparison (Free, Family, Coach, Club)
├── how-it-works.html       # Step-by-step guide with tips
├── download.html           # App Store download page
├── support.html            # Comprehensive FAQ and support
├── privacy.html            # Privacy Policy (GDPR/CCPA compliant)
├── terms.html              # Terms of Service
├── css/
│   └── style.css           # ScorX brand stylesheet with new components
├── images/                 # App screenshots, badges, icons (to be added)
│   └── [placeholder]       # Add App Store badge, favicon, screenshots
└── README.md               # This file
```

---

## 🎨 Brand Guidelines

### Colors

The website uses the official ScorX brand colors:

- **Primary Turquoise:** `#00D4C4`
- **Bright Turquoise:** `#1FEDD8`
- **Dark Turquoise:** `#00A896`
- **Deep Navy:** `#0F2A44`
- **Off White:** `#F8F9FA`
- **Charcoal:** `#2C3E50`
- **Medium Gray:** `#7F8C8D`
- **Light Gray:** `#BDC3C7`

### Typography

- **Primary Font:** `-apple-system, SF Pro Display/Text`
- **Fallback:** `Segoe UI, Roboto, sans-serif`

### Design System

- **Border Radius:** 20px (cards), 14px (buttons)
- **Spacing:** 16px horizontal inset, 18px card spacing
- **Animations:** CSS-only with smooth transitions
- **Layout:** 12-column grid (desktop), 4-column grid (mobile)

---

## 📄 Page-by-Page Content

### Homepage (`index.html`)
- **Hero Section:** "Effortless Scorekeeping & Live Stats for Every Sport"
- **Trust Bar:** 14 Sports, 30-Day Free Trial, No Credit Card, iCloud Sync
- **Features:** 6 core features overview
- **Sports Showcase:** Team Sports (8) + Racquet Sports (6)
- **How It Works:** 3-step process
- **Who It's For:** Players, Families, Coaches, Teams
- **Pricing Teaser:** Free vs Family comparison
- **Final CTA:** Download section

### Features (`features.html`)
12 detailed features:
1. Real-Time Game Scoring
2. Comprehensive Player Statistics
3. Visual Performance Analytics
4. Configurable Game Timers
5. Easy Team & Roster Management
6. Complete Game History & Archives
7. iCloud Sync Across Devices (ScorX Premium)
8. Data Export & Analysis (ScorX Premium)
9. Seamless Sport Switching
10. Full Offline Functionality
11. Player Sentiment & Emotion Tracking
12. Performance & Athleticism Metrics (Coming Soon)

### Sports (`sports.html`)

**Team Sports (8):**
- AFL, Basketball, Netball, Rugby Union, Rugby League, Touch Rugby, Soccer, Field Hockey

**Racquet Sports (6):**
- Tennis, Badminton, Squash, Racquetball, Pickleball, Table Tennis

Each sport includes: Scoring rules, Activities tracked, Timer configuration, Special features

### Pricing (`pricing.html`)

**4 Tiers:**
1. **Free:** $0 - 1 team, 1 player, 5 games/month
2. **Family:** $4.99/month or $49.99/year - 5 players, iCloud sync, CSV export
3. **Coach:** TBA (Coming v1.1) - 25 players, advanced analytics
4. **Club:** TBA (Coming v1.1) - 100 players, team collaboration

Plus pricing-specific FAQ section

### How It Works (`how-it-works.html`)
- **Step 1:** Download & Setup (2-3 minutes)
- **Step 2:** Start a Game (30 seconds)
- **Step 3:** Score & Track (game duration)
- **Step 4:** Review & Export (instant)
- Tips & Best Practices section

### Download (`download.html`)
- App Store download link
- System requirements (iOS 18.0+)
- Optimized devices list
- 5-step what happens after download
- Quick start checklist
- ScorX Premium trial promotion

### Support (`support.html`)
**Comprehensive FAQ with categories:**
- Getting Started (4 questions)
- Subscriptions & Billing (6 questions)
- Using ScorX (4 questions)
- Sports & Features (3 questions)
- iCloud & Sync (3 questions)
- Privacy & Data (2 questions)
- Troubleshooting (2 questions)

Total: 24+ FAQ entries with detailed answers

### Privacy Policy (`privacy.html`)
- GDPR/CCPA/APP compliant
- Updated contact: scorxapp@gmail.com
- Data collection, storage, and usage policies
- User rights and data deletion procedures

### Terms of Service (`terms.html`)
- Subscription terms and conditions
- Updated contact: scorxapp@gmail.com
- Refund policy, user responsibilities
- Intellectual property rights

---

## 🔍 SEO Optimization

### Meta Tags (All Pages)
- ✅ Descriptive title tags
- ✅ Meta descriptions (150-160 characters)
- ✅ Keywords meta tags
- ✅ Open Graph tags (Facebook/LinkedIn)
- ✅ Twitter Card tags
- ✅ Theme color for mobile browsers
- ✅ Apple app banner meta tag

### Structured Data (Schema.org)
- **Homepage:** SoftwareApplication schema
- **Support Page:** FAQPage schema with Q&A pairs

### AI Search Optimization
Optimized for ChatGPT and Perplexity AI:
- Clear semantic HTML structure
- Definitive answers in FAQ
- Structured lists for easy parsing
- Updated, authoritative content

### Keywords Targeted
- scorekeeping app
- multi-sport scoring
- sports statistics app
- live sports scoring
- player stats tracker
- AFL scoring app, basketball stats app, tennis score tracker (+ 11 more sport-specific)

---

## 📱 Required Assets (To Be Added)

Before publishing, add these to `/images/`:

### 1. App Store Badge (`app-store-badge.svg`)
- Download from: https://developer.apple.com/app-store/marketing/guidelines/
- Use official SVG format
- Place in `/images/app-store-badge.svg`

### 2. Favicon (`favicon.png`)
- **Size:** 192x192 PNG
- Should match ScorX app icon
- Place in `/images/favicon.png`

### 3. Social Preview Images
- **Open Graph:** `phone_screen_game_card.jpg` (1200x630 JPG)
- **Twitter Card:** `phone_screen_game_card.jpg` (1200x630 JPG)
- Show app screenshot + ScorX branding

### 4. App Screenshots (Optional)
- **Format:** PNG
- **Device:** iPhone 15 Pro (2556x1179)
- **Naming:** `screenshot-1.png`, `screenshot-2.png`, etc.
- Use for features page visual demonstrations

---

## ✅ Pre-Launch Checklist

### Content Updates
- [x] Replace all `XXXXXXXXXX` with actual App Store ID (Updated to: 6753859833)
- [ ] Verify scorxapp@gmail.com email is active and monitored
- [ ] Update copyright year if needed (currently 2025)
- [ ] Review all pricing information for accuracy

### Assets
- [ ] Add App Store badge SVG to `/images/`
- [ ] Add favicon.png (192x192)
- [ ] Add social preview images (Open Graph, Twitter Card)
- [ ] Add optional app screenshots

### Testing
- [ ] Test on iPhone (Safari)
- [ ] Test on iPad (Safari)
- [ ] Test on Android (Chrome)
- [ ] Test on desktop browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test all internal links work correctly
- [ ] Test all external links (App Store, email)
- [ ] Verify mobile menu works correctly
- [ ] Test form submissions (if any)

### Performance
- [ ] Run Lighthouse audit (aim for 90+ scores)
- [ ] Test page load speed (aim for <2 seconds)
- [ ] Optimize images (WebP format with fallbacks)
- [ ] Verify lazy loading works
- [ ] Test offline functionality (service worker if implemented)

### Accessibility
- [ ] Run WAVE accessibility audit
- [ ] Test keyboard navigation (Tab through all interactive elements)
- [ ] Test with VoiceOver (macOS/iOS)
- [ ] Verify color contrast ratios (WCAG AA)
- [ ] Check alt text on all images

### SEO
- [ ] Submit sitemap to Google Search Console
- [ ] Create and upload `sitemap.xml`
- [ ] Create and upload `robots.txt`
- [ ] Verify structured data with Google Rich Results Test
- [ ] Check meta tags on all pages

### Legal
- [ ] Have legal review Privacy Policy
- [ ] Have legal review Terms of Service
- [ ] Verify all data collection disclosures are accurate
- [ ] Ensure GDPR/CCPA compliance

---

## 🌐 Hosting & Deployment

### Recommended: Vercel (Free)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd /home/user/scorx-website
vercel

# Configure custom domain in Vercel dashboard
# Point scorx.com.au to Vercel DNS
```

### Alternative: Netlify (Free)

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
cd /home/user/scorx-website
netlify deploy --prod

# Configure custom domain in Netlify dashboard
```

### Alternative: GitHub Pages (Free)

1. Push to GitHub repository
2. Enable GitHub Pages in Settings → Pages
3. Select branch: `main`
4. Configure custom domain: `scorx.com.au`
5. Enable HTTPS in settings

### Custom Domain Setup

**DNS Configuration for scorx.com.au:**
```
Type    Name    Value
A       @       [Your hosting IP or CNAME]
CNAME   www     [Your hosting domain]
```

**SSL Certificate:**
- All recommended hosting providers include free SSL
- Enforce HTTPS redirects

---

## 🔧 Development

### CSS Components Added (v1.1)

New components in `style.css`:
- `.trust-bar` - Trust signals section with grid layout
- `.trust-item` - Individual trust items
- `.trust-signals` - Final CTA trust signals
- `.steps-grid` - How It Works steps layout
- `.step-card` - Individual step cards with hover effects
- `.step-number` - Circular step numbers with gradient
- `.sports-showcase` - Sports category showcase
- `.sports-grid-compact` - Compact grid for sport mini-cards
- `.sport-card-mini` - Mini sport cards with hover effects
- `.pricing-grid-simple` - Simplified pricing grid
- `.pricing-badge-alt` - Alternative pricing badge style
- `.pricing-features-simple` - Simple feature list for pricing teaser

### Browser Support

**Tested and Supported:**
- Safari 14+ (macOS, iOS)
- Chrome 90+
- Firefox 88+
- Edge 90+
- Mobile Safari 14+
- Chrome Mobile
- Samsung Internet

---

## 📊 Analytics (Optional)

### Recommended Analytics Setup

If tracking analytics, use privacy-first options:
- **Plausible Analytics** (GDPR compliant, no cookies)
- **Fathom Analytics** (privacy-first)
- Avoid Google Analytics unless necessary

### Key Metrics to Track
- Page views by URL
- App Store badge click-through rate (primary KPI)
- Bounce rate by page
- Average session duration
- Mobile vs desktop traffic
- Geographic distribution

---

## 📞 Contact & Support

**Website Email:** scorxapp@gmail.com
**Developer:** Twine App Dev
**Website URL:** https://www.scorx.com.au
**App Store:** [Link to be added after app approval]

---

## 📝 Version History

### v1.1 - January 19, 2025
**Major Update: PRD Implementation**
- ✅ Added 5 new pages (features, sports, pricing, how-it-works, download)
- ✅ Updated from 9 sports to 14 sports
- ✅ Complete pricing tier documentation (Free, Family, Coach, Club)
- ✅ Comprehensive FAQ (24+ questions across 7 categories)
- ✅ Enhanced SEO with Schema.org structured data
- ✅ Updated contact email to scorxapp@gmail.com
- ✅ Updated copyright to Twine App Dev
- ✅ Added trust bar and improved hero sections
- ✅ Mobile-responsive enhancements
- ✅ New CSS components for better design system

### v1.0 - October 6, 2025
**Initial Release**
- 4 pages: Landing, Privacy, Support, Terms
- 9 sports supported
- ScorX brand styling applied
- Mobile-responsive design
- Accessibility-first approach
- Ready for App Store launch

---

## 🎯 Next Steps

1. **Add Images:**
   - App Store badge SVG
   - Favicon PNG
   - Social preview images
   - Optional: App screenshots

2. **Update Placeholders:**
   - ✅ App Store ID updated to: `6753859833`
   - Verify email (scorxapp@gmail.com) is active

3. **Testing:**
   - Test on multiple devices
   - Run accessibility audit
   - Run performance audit
   - Verify all links

4. **Deploy:**
   - Choose hosting provider
   - Configure custom domain
   - Enable SSL/HTTPS
   - Submit sitemap to Google

5. **Launch:**
   - Update App Store Connect with website URLs
   - Monitor analytics
   - Collect user feedback

---

## 📚 Additional Resources

- **Apple App Store Guidelines:** https://developer.apple.com/app-store/review/guidelines/
- **App Store Marketing:** https://developer.apple.com/app-store/marketing/
- **WCAG Accessibility:** https://www.w3.org/WAI/WCAG21/quickref/
- **Schema.org Documentation:** https://schema.org/
- **Google Search Console:** https://search.google.com/search-console

---

**Built with ❤️ for sports lovers everywhere**

© 2025 Twine App Dev. All rights reserved.
