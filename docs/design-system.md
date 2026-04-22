# Design System - Ola Spa

## 🎨 Color Palette

### Primary Colors
```
Warm Beige (Primary)     #9B8B6D
Sage Green (Secondary)   #8FAF7A
Gold (Accent)            #D4AF37
```

### Neutral Colors
```
Warm White              #F5F3F0
Light Beige             #F9F7F4
Soft Gray               #E8E5E0
Medium Gray             #9B9B9B
Dark Gray               #4A4A4A
Rich Dark               #2C2416
```

### Semantic Colors
```
Success                 #5FB878
Warning                 #F5A623
Error                   #E85D75
Info                    #4A90E2
```

## 📝 Typography

### Font Families
- **Headings**: `Playfair Display` (serif) - for elegance and luxury
- **Body**: `Inter` (sans-serif) - for clarity and readability
- **Accents**: `Playfair Display` for special emphasis

### Font Sizes & Hierarchy

```
h1: 48px / 64px (desktop/mobile) - font-weight: 700
h2: 36px / 48px - font-weight: 700
h3: 28px / 32px - font-weight: 600
h4: 24px / 28px - font-weight: 600
Body: 16px - font-weight: 400
Small: 14px - font-weight: 400
Tiny: 12px - font-weight: 400
```

### Line Heights
```
Headings: 1.2
Body: 1.6
```

## 🎛️ UI Components

### Buttons

**Primary Button**
```css
background: #8FAF7A;
color: #FFFFFF;
padding: 12px 32px;
border-radius: 8px;
font-weight: 600;
transition: all 0.3s ease;
cursor: pointer;

/* Hover */
background: #7A9563;
box-shadow: 0 4px 12px rgba(143, 175, 122, 0.3);

/* Active */
transform: translateY(2px);
box-shadow: 0 2px 6px rgba(143, 175, 122, 0.2);
```

**Secondary Button**
```css
background: transparent;
border: 2px solid #8FAF7A;
color: #8FAF7A;
padding: 10px 30px;
border-radius: 8px;
font-weight: 600;
transition: all 0.3s ease;

/* Hover */
background: #8FAF7A;
color: #FFFFFF;
```

**Accent Button (CTA)**
```css
background: #D4AF37;
color: #2C2416;
font-weight: 700;
/* Same padding and effects as primary */
```

### Cards

```css
background: #FFFFFF;
border-radius: 12px;
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
padding: 24px;
transition: all 0.3s ease;

/* Hover */
box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
transform: translateY(-4px);
```

### Input Fields

```css
background: #F9F7F4;
border: 1px solid #E8E5E0;
border-radius: 8px;
padding: 12px 16px;
font-family: 'Inter', sans-serif;
font-size: 16px;
transition: all 0.3s ease;

/* Focus */
border-color: #8FAF7A;
outline: none;
box-shadow: 0 0 0 3px rgba(143, 175, 122, 0.1);

/* Error */
border-color: #E85D75;
box-shadow: 0 0 0 3px rgba(232, 93, 117, 0.1);
```

## 🎬 Animations & Transitions

### Fade In (For page loads)
```css
animation: fadeIn 0.6s ease-in;

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

### Slide Up (For elements entering)
```css
animation: slideUp 0.6s ease-out;

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Scale Hover (For interactive elements)
```css
transition: transform 0.3s ease, box-shadow 0.3s ease;

&:hover {
  transform: scale(1.02);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}
```

### Smooth Scroll
```css
html {
  scroll-behavior: smooth;
}
```

## 📐 Spacing System

Base unit: 8px

```
xs:  4px  (0.5rem)
sm:  8px  (1rem)
md:  16px (2rem)
lg:  24px (3rem)
xl:  32px (4rem)
2xl: 48px (6rem)
3xl: 64px (8rem)
```

## 📏 Breakpoints (Mobile First)

```
Mobile:   0px (base)
Tablet:   768px
Desktop:  1024px
Wide:     1440px
```

### Responsive Guidelines
- Prioritize mobile experience
- Touch-friendly buttons: min 44px × 44px
- Maximum content width: 1200px on desktop
- 16px margins on mobile, 24px+ on desktop

## 🌑 Shadows

```
Subtle:  0 2px 4px rgba(0, 0, 0, 0.05)
Light:   0 2px 8px rgba(0, 0, 0, 0.08)
Medium:  0 4px 12px rgba(0, 0, 0, 0.12)
Strong:  0 8px 24px rgba(0, 0, 0, 0.16)
Hover:   0 12px 32px rgba(0, 0, 0, 0.2)
```

## 🎯 Component Variations

### Service Card
```
- Image (16:9 aspect ratio)
- Service name (h3)
- Category badge
- Description (body text)
- Duration + Price
- "Book Now" button
- Hover effect: lift + shadow
```

### Testimonial Card
```
- Quote (italic)
- Client name
- Client photo (circle)
- Star rating (⭐⭐⭐⭐⭐)
- Soft background color
```

### Hero Section
```
- Full viewport height (min-height: 100vh)
- Background image or video (dark overlay)
- Centered content
- Large heading (Playfair Display)
- Subheading
- CTA button
- Subtle scroll indicator at bottom
```

## ✨ Premium Touches

1. **Font Smoothing**: `-webkit-font-smoothing: antialiased`
2. **Subtle Textures**: Subtle background patterns (optional)
3. **Micro-interactions**: Button ripple effects, loading spinners
4. **White Space**: Generous padding and margins
5. **Depth**: Layered shadows and z-index management
6. **Transitions**: All interactive elements should have smooth transitions
7. **Loading States**: Skeleton screens, loading bars
8. **Empty States**: Friendly messages when no content

---

**Implementation**: Use Tailwind CSS with custom configuration to enforce these standards.
