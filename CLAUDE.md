# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Project Overview

This is the official marketing website for **ScorX**, a multi-sport scoring and statistics iOS app. The site is a **static HTML/CSS website** with no build process, frameworks, or server-side code.

**Key Information:**
- **Website URL:** https://scorx.com.au
- **Target Platform:** iOS 18.0+
- **Contact Email:** scorxapp@gmail.com
- **Developer:** Twine App Dev
- **Tech Stack:** Pure HTML5, CSS3, vanilla JavaScript (minimal)

---

## Development Commands

### Running the Website Locally

**Recommended Method - Python HTTP Server:**
```bash
python3 -m http.server 8000
# Open browser to http://localhost:8000
```

**Alternative - Node.js:**
```bash
npx http-server -p 8000
```

**Alternative - Direct File Opening:**
```bash
# macOS
open index.html

# Linux
xdg-open index.html
```

### Validation & Testing

```bash
# Check for broken links (requires npm)
npx link-check index.html

# Validate HTML (requires validator)
npx html-validate *.html

# Check file sizes
ls -lh css/ images/
```

### Deployment

**Current Hosting:** GitHub Pages (assumed based on CNAME file)

```bash
# Commit and push to deploy (GitHub Pages auto-deploys from main branch)
git add .
git commit -m "Update website content"
git push origin main
```

**Alternative hosting platforms mentioned in README:**
- Vercel: `vercel` (requires Vercel CLI)
- Netlify: `netlify deploy --prod` (requires Netlify CLI)

---

## Code Architecture

### File Structure

```
scorx/
├── index.html              # Homepage - hero, features, sports showcase
├── features.html           # 12 detailed features
├── sports.html             # 14 sports (8 team + 6 racquet)
├── pricing.html            # 4 pricing tiers (Free, Family, Coach, Club)
├── how-it-works.html       # 4-step guide
├── download.html           # App Store download page
├── support.html            # FAQ with 24+ questions
├── privacy.html            # Privacy policy (GDPR/CCPA compliant)
├── terms.html              # Terms of service
├── css/
│   └── style.css           # Single stylesheet (~1600 lines)
├── images/                 # App screenshots, badges, icons
├── robots.txt              # SEO directives
├── llms.txt                # AI/LLM structured data
└── CNAME                   # Custom domain config
```

### Design System

**Brand Colors (CSS Variables in `style.css`):**
- Primary: `--scorx-turquoise` (#00D4C4)
- Accent: `--scorx-bright-turquoise` (#1FEDD8)
- Dark: `--scorx-deep-navy` (#0F2A44)
- Neutrals: `--scorx-off-white`, `--scorx-charcoal`

**Layout System:**
- Max container width: `1280px`
- Card spacing: `24px`
- Border radius: `16px` (cards), `12px` (buttons)
- Responsive breakpoints in CSS (no framework)

**Typography:**
- Font stack: Inter, -apple-system, SF Pro Display/Text, Segoe UI
- Headings: Clamp-based fluid sizing
- Line height: 1.7 for body text

### CSS Architecture

The `style.css` file uses a **modular component structure**:

1. **CSS Variables** (lines 1-53): Brand colors, spacing, shadows, transitions
2. **Global Reset** (lines 55-76): Box-sizing, scroll behavior
3. **Typography** (lines 78-120): Headings, paragraphs, links
4. **Layout Components**: Container, sections, grids
5. **UI Components**: Buttons, cards, badges, forms
6. **Page-Specific Styles**: Hero, features, pricing, sports
7. **Utilities**: Spacing, colors, responsive helpers
8. **Media Queries**: Bottom of file (~line 1400+)

**Key Components:**
- `.hero-section` - Above-the-fold hero
- `.trust-bar` - Trust signals (4-column grid)
- `.feature-card` - Individual feature boxes
- `.sport-card`, `.sport-card-mini` - Sports showcase
- `.pricing-card` - Pricing tier comparison
- `.step-card` - How-it-works steps
- `.faq-item` - Collapsible FAQ entries

### HTML Patterns

**Consistent Structure Across All Pages:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Meta tags: charset, viewport, description, keywords -->
    <!-- Open Graph & Twitter Card tags -->
    <!-- Apple app banner -->
    <!-- Structured data (Schema.org JSON-LD) -->
    <link rel="stylesheet" href="./css/style.css">
    <link rel="icon" href="./images/favicon.png">
</head>
<body>
    <!-- Navigation header -->
    <main>
        <!-- Page content -->
    </main>
    <!-- Footer with links -->
</body>
</html>
```

**Navigation Menu:** Present on all pages, links to 9 main pages

**Footer:** Consistent across all pages with legal links, contact email, copyright

### SEO Implementation

**Every page includes:**
- Descriptive `<title>` tags (unique per page)
- Meta description (150-160 characters)
- Keywords meta tag
- Open Graph tags (Facebook/LinkedIn preview)
- Twitter Card tags
- Theme color for mobile browsers

**Structured Data (Schema.org):**
- Homepage: `SoftwareApplication` + `Organization` schemas
- Support page: `FAQPage` schema with Q&A pairs
- All pricing/feature data structured for AI parsing

**llms.txt File:**
- Structured data specifically for LLMs (ChatGPT, Claude, etc.)
- Key facts, pricing, use cases in plain text format
- Links to all major pages

---

## Important Constraints

### No Build Process
This is a **static site with zero build tooling**. When making changes:
- Edit HTML/CSS files directly
- No compilation, bundling, or preprocessing
- Changes are immediately visible on refresh
- No package.json, no dependencies to install

### Placeholder Content to Replace

**Before production deployment:**
1. **App Store ID:** ✅ COMPLETED - Updated to `6753859833`
   - App Store ID has been updated in: `index.html`, `download.html`, `match/index.html`
   - Search pattern: `app-id=6753859833`

2. **Missing Images:** Add to `/images/` directory
   - `app-store-badge.svg` - Official Apple badge
   - `favicon.png` - 192x192 app icon
   - `social-preview.png` - 1200x630 Open Graph image
   - `twitter-card.jpg` - 1200x628 Twitter preview
   - Optional: App screenshots (screenshot-1.png, etc.)

### Brand Consistency Rules

**MUST preserve:**
- ScorX brand colors (turquoise #00D4C4, navy #0F2A44)
- Clean, modern iOS-inspired design aesthetic
- Mobile-first responsive approach
- Accessibility (WCAG AA compliance)

**Content tone:**
- Professional but approachable
- Sports-focused audience (parents, coaches, players)
- Australian English spelling
- Avoid technical jargon unless explaining features

---

## Content Guidelines

### Sports Coverage
**14 Sports Supported** (DO NOT add/remove without product team approval):

**Team Sports (8):**
- AFL, Basketball, Netball, Rugby Union, Rugby League, Touch Rugby, Soccer, Field Hockey

**Racquet Sports (6):**
- Tennis, Badminton, Squash, Racquetball, Pickleball, Table Tennis

### Pricing Tiers
**Current Structure** (verify before updating):
1. **Free:** $0 - 1 team, 1 player, 5 games/month
2. **Family:** $4.99/month or $49.99/year - 5 players, iCloud sync, CSV export
3. **Coach:** TBA (Coming v1.1)
4. **Club:** TBA (Coming v1.1)

### Key Statistics & Claims
When updating content, maintain these established claims:
- "Track 100+ customizable statistical activities"
- "Setup takes less than 2 minutes"
- "Works completely offline"
- "30-day free trial, no credit card required"
- "14 sports supported"

---

## Common Tasks

### Updating Content

**To update pricing:**
1. Edit `pricing.html` - main pricing page
2. Edit `index.html` - pricing teaser section
3. Update Schema.org JSON-LD in `index.html` head
4. Update `llms.txt` pricing section

**To add a new feature:**
1. Add to `features.html` in the features grid
2. Add summary to `index.html` features section
3. Update feature count in meta descriptions if needed
4. Update `llms.txt` if it's a major feature

**To update FAQ:**
1. Edit `support.html`
2. Add new `<div class="faq-item">` with question/answer
3. Update FAQPage schema in `<script type="application/ld+json">`

### Updating Styles

**CSS editing approach:**
1. Locate the component in `css/style.css` (check CSS architecture map above)
2. Use existing CSS variables wherever possible
3. Test responsive behavior at 3 breakpoints: mobile (375px), tablet (768px), desktop (1280px+)
4. Maintain consistency with existing components

**Adding new components:**
- Follow BEM-like naming: `.component-name`, `.component-name__element`, `.component-name--modifier`
- Use CSS variables for colors, spacing, shadows
- Add mobile-first media queries at bottom of file
- Document major additions with CSS comments

### Testing Checklist

Before committing changes:
- [ ] Test in Safari (iOS and macOS)
- [ ] Test in Chrome (desktop and mobile)
- [ ] Verify responsive design at 375px, 768px, 1280px widths
- [ ] Check all internal links work
- [ ] Validate HTML (no broken tags)
- [ ] Check for color contrast issues (WCAG AA)
- [ ] Verify meta tags are present on new pages
- [ ] Test with screen reader if modifying navigation/semantics

---

## Version History

**v1.1 - January 2025** (Current)
- Added 5 new pages (features, sports, pricing, how-it-works, download)
- Expanded from 9 to 14 sports
- Complete pricing tier documentation
- Comprehensive FAQ (24+ questions)
- Enhanced SEO with Schema.org structured data
- Mobile-responsive enhancements

**v1.0 - October 2024**
- Initial release with 4 pages
- 9 sports supported
- Basic pricing structure

---

## Quick Reference

### File Locations
- **CSS Variables:** `css/style.css` lines 1-53
- **Navigation HTML:** Top of every `.html` file
- **Footer HTML:** Bottom of every `.html` file
- **Schema.org Data:** `<script type="application/ld+json">` in `<head>`

### App Store Information
✅ App Store ID has been updated to: **6753859833**
- Updated in: `index.html`, `download.html`, `match/index.html`
- App Store URL: `https://apps.apple.com/app/6753859833`

### Contact Information
- **Support Email:** scorxapp@gmail.com
- **Domain:** scorx.com.au
- **Company:** Twine App Dev
- **Copyright:** © 2025 Twine App Dev

---

## Notes for Future Development

**Performance Optimization:**
- Consider adding WebP images with PNG fallbacks
- Implement lazy loading for images below fold
- Minify CSS for production (currently un-minified for readability)
- Consider adding service worker for offline functionality

**Conversion Rate Optimization:**
- Refer to `scorx-website-improvement-plan.md` for detailed CRO recommendations
- Test hero video/animation (mentioned in improvement plan)
- A/B test CTA copy variations
- Add testimonials/social proof when available

**Analytics Recommendations:**
- Use privacy-first analytics (Plausible or Fathom recommended in README)
- Track App Store badge click-through rate as primary KPI
- Monitor bounce rate by page
- Track mobile vs desktop traffic split
