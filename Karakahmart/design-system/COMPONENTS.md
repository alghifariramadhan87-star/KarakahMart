# Design System - Component Library

## Overview
Comprehensive component library based on the portfolio's design system. All components follow the Stitch Design Taste methodology with focus on minimalist elegance and responsive design.

---

## Color System

### Primary Brand (Teal Modern)
- **Primary**: #14B8A6 (Brand 500)
- **Dark**: #0D9488 (Brand 600)
- **Light**: #5EEAD4 (Brand 300)

### Neutrals (Zinc/Slate)
- **Background**: #F8FAFC (Slate 50)
- **Surface**: #FFFFFF
- **Text**: #0F172A (Slate 900)
- **Subtle**: #94A3B8 (Slate 400)

### Semantic Colors
- Success: #10B981
- Warning: #F59E0B
- Error: #EF4444
- Info: #0EA5E9

---

## Typography

### Font Family
- **Display**: Geist Display (Bold, 700)
- **Body**: Geist (Regular, 400)
- **Mono**: Geist Mono (Code)

### Scale Hierarchy
| Level | Size | Weight | Use |
|-------|------|--------|-----|
| Display 2XL | 72px | 700 | Hero titles |
| Display XL | 56px | 700 | Page titles |
| Display LG | 48px | 700 | Section titles |
| H1 | 32px | 700 | Main headings |
| H2 | 24px | 700 | Subheadings |
| H3 | 20px | 600 | Tertiary headings |
| Body LG | 18px | 400 | Lead paragraphs |
| Body | 16px | 400 | Default text |
| Body SM | 14px | 400 | Secondary text |
| Caption | 12px | 500 | Labels, hints |

---

## Spacing System

| Token | Value | Usage |
|-------|-------|-------|
| XS | 4px | Small gaps, borders |
| SM | 8px | Padding, margins |
| MD | 12px | Button padding |
| LG | 16px | Component padding |
| XL | 24px | Section padding |
| 2XL | 32px | Large spacing |
| 3XL | 40px | Gutter |
| 4XL | 60px | Large sections |
| 5XL | 80px | Section spacing |
| 6XL | 120px | Major sections |

---

## Component Examples

### Button Component

#### Primary Button
```
Background: #14B8A6
Text: White
Padding: 12px 24px
Border Radius: 12px
Font Weight: 600
Hover: #0D9488
Active: Scale 95%
Transition: 200ms ease
```

#### Secondary Button
```
Background: Transparent
Border: 2px #14B8A6
Text: #14B8A6
Padding: 10px 24px
Hover: Light teal background
```

### Card Component
```
Background: #FFFFFF
Border: 1px #E2E8F0
Border Radius: 12px
Shadow: 0 2px 8px rgba(0, 0, 0, 0.05)
Padding: 24px
Hover: Shadow increase
```

### Input Component
```
Background: #FFFFFF
Border: 1px #E2E8F0
Text: #0F172A
Placeholder: #94A3B8
Padding: 10px 16px
Focus: 2px ring #14B8A6
Border Radius: 12px
```

### Badge Component
```
Background: #CCF BF1
Text: #0D9488
Padding: 4px 12px
Border Radius: 9999px
Font Size: 12px
Font Weight: 600
```

---

## Animation & Motion

### Duration Scale
- **Instant**: 0ms
- **Fast**: 100ms (Quick interactions)
- **Base**: 200ms (Default)
- **Slow**: 300ms (Hover states)
- **Slower**: 500ms (Page transitions)

### Easing Functions
- **Ease**: cubic-bezier(0.4, 0, 0.2, 1) - Default
- **Spring**: cubic-bezier(0.34, 1.56, 0.64, 1) - Playful
- **Ease-out**: cubic-bezier(0, 0, 0.2, 1) - Natural enter

### Micro-interactions
- Buttons: Scale down on active
- Cards: Subtle shadow increase on hover
- Links: Color transition on hover
- Navigation: Smooth scroll behavior

---

## Responsive Design

### Breakpoints
- **Mobile**: 0px - 640px (Default)
- **Tablet**: 640px - 1024px (SM)
- **Desktop**: 1024px+ (MD)
- **Large**: 1280px+ (LG)

### Mobile-First Approach
1. Design for mobile first
2. Add complexity at larger breakpoints
3. Test touch targets (44px minimum)
4. Ensure readable text sizes (16px+ mobile)

---

## Accessibility Standards

### WCAG AA Compliance
- ✓ Color contrast ratio: 4.5:1 (text)
- ✓ Touch targets: 44px minimum
- ✓ Focus indicators: Visible ring
- ✓ Keyboard navigation: Full support
- ✓ Semantic HTML: Proper structure
- ✓ Alt text: All images described

### Focus States
```
Focus Ring: 2px solid #14B8A6
Ring Offset: 2px
Applies to: Buttons, Inputs, Links
```

---

## Dark Mode

### Theme Switching
- Class-based: `dark:` prefix in Tailwind
- Stored in localStorage
- Respects system preference as fallback

### Dark Mode Colors
- Background: #0F172A (Slate 900)
- Surface: #1E293B (Slate 800)
- Text: #F8FAFC (Slate 50)
- Accent: #5EEAD4 (Brand 300)

---

## Implementation Guidelines

### Do's ✓
- Use semantic HTML
- Follow spacing scale
- Maintain color contrast
- Test on real devices
- Use the motion tokens
- Implement focus states
- Validate form inputs

### Don'ts ✗
- Mix font families
- Use pure black (#000000)
- Overlap interactive elements
- Ignore responsive needs
- Skip accessibility checks
- Use generic color names
- Hardcode values (use tokens)

---

## Component Inventory

| Component | Status | File |
|-----------|--------|------|
| Button | ✓ Ready | components/button.html |
| Card | ✓ Ready | components/card.html |
| Input | ✓ Ready | components/input.html |
| Badge | ✓ Ready | components/badge.html |
| Navigation | ✓ Ready | components/nav.html |
| Hero | ✓ Ready | components/hero.html |
| Footer | ✓ Ready | components/footer.html |

---

## Usage Examples

### HTML Components
All components are available in the `components/` directory with `.html` files. Each component includes:
- Default state
- Hover state
- Active state
- Disabled state (where applicable)

### CSS Classes
```html
<!-- Button -->
<button class="btn btn-primary">Action</button>

<!-- Card -->
<div class="card">
  <div class="card-header">Title</div>
  <div class="card-body">Content</div>
</div>

<!-- Input -->
<input type="text" class="input" placeholder="Type here...">

<!-- Badge -->
<span class="badge">Label</span>
```

---

## Design Tokens Reference

For programmatic access, import from `tokens.js`:

```javascript
import { colors, typography, spacing, components } from './tokens.js';

// Access token
const primaryColor = colors.brand[500];
const bodyFont = typography.family.body;
const defaultSpacing = spacing.lg;
```

---

Last Updated: 2026-09-30
Design System Version: 1.0
Maintained by: Design Team
