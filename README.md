# Felix Y Lingam — Personal Developer Portfolio

A premium, fully dark-mode personal portfolio built with HTML5, CSS3, and Vanilla JavaScript.

## 📁 Folder Structure

```
portfolio/
├── index.html                  # Main HTML
├── css/
│   └── style.css               # All styles
├── js/
│   └── script.js               # All JavaScript
├── assets/
│   ├── images/
│   │   └── profile.jpg         # Your profile photo (replace placeholder)
│   └── FelixResume.pdf         # Your resume PDF (add this file)
└── README.md
```

## 🚀 Getting Started

### Option A — Open directly in browser
Just open `index.html` in any modern browser. No build step needed.

### Option B — Use a local dev server (recommended)
```bash
# Using VS Code Live Server extension (right-click index.html → Open with Live Server)
# Or with Python:
python -m http.server 8000
# Then visit http://localhost:8000
```

## 📸 Replacing the Profile Photo Placeholder

1. Crop your photo to a **square (1:1)** aspect ratio.
2. Resize to at least **600×600 px**.
3. Save as `portfolio/assets/images/profile.jpg`.
4. The site will automatically display your photo.
5. Optionally remove the `onerror` attribute from the `<img>` tag in `index.html` once confirmed.

## 📄 Adding Your Resume

1. Save your resume PDF as `portfolio/assets/FelixResume.pdf`.
2. The "Download Resume" button in the hero section will serve it automatically.

## 🔗 Updating Social Links

Search `index.html` for these comments to update configurable links:

| Link | Comment to find | Where |
|------|----------------|-------|
| LinkedIn | `LINKEDIN: Replace href` | Hero & Contact sections |
| Weather Advisor source | `SOURCE CODE: Replace '#'` | Projects section |
| Resume PDF | `RESUME: Place your resume PDF` | Hero section |

## 🎨 Sections

| # | Section | Content |
|---|---------|---------|
| 1 | Hero | Name, headline, CTA buttons, social links, profile photo |
| 2 | About | Bio, interests (Full-Stack, AI/ML, Software Engineering, Problem Solving) |
| 3 | Experience | Future Interns (Intern), GirlScript Summer of Code (Contributor) |
| 4 | Projects | ExoVision AI, SecureVault, Weather Advisor |
| 5 | Skills | 7 categories with interactive chips |
| 6 | Education | Jain College of Engineering, BE CSE, 2023–2027, CGPA 8.4 |
| 7 | Achievements | Ideathon 1st Place, NASA Space Apps, Fine Arts Club |
| 8 | Contact | Email, GitHub, LinkedIn, contact form with mailto fallback |

## ✅ Features

- 100% dark mode — no light mode
- Responsive (mobile, tablet, desktop)
- Particle network animation on hero canvas
- Subtle scroll-reveal animations
- Scroll progress indicator
- Active section highlighting in navbar
- Mobile hamburger menu
- Project card tilt effect
- Copy-to-clipboard email button
- Client-side form validation with mailto fallback
- Accessible (ARIA labels, keyboard navigation, ESC to close menu)
- SEO meta tags (title, description, Open Graph)
- Respects `prefers-reduced-motion`

## 🛠 Customization Notes

- **Colors**: Edit CSS custom properties in `:root` inside `style.css`
- **Font**: Uses Inter + JetBrains Mono from Google Fonts
- **Animations**: All keyframes are in `style.css`, easily adjustable

---

Built by Felix Y Lingam · [felixlingam@gmail.com](mailto:felixlingam@gmail.com) · [github.com/FelixDevX](https://github.com/FelixDevX)
