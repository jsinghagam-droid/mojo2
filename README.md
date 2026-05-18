# For Isha — Always
### A romantic website by Agam

---

## How to use

1. **Add your photos**
   - Create a folder called `photos/` next to `index.html`
   - Add your images and name them:
     - `photo1.jpg` → Hero background
     - `photo2.jpg` → First gallery polaroid + Final section background
     - `photo3.jpg` → Gallery card
     - `photo4.jpg` → Small polaroid
     - `photo5.jpg` → Wide gallery card
     - `photo6.jpg` → Gallery polaroid "golden"
   - You can use any image format (jpg, png, webp)

2. **Add ambient music** *(optional)*
   - Create a folder called `audio/` next to `index.html`
   - Add a soft ambient audio file named `ambient.mp3`
   - In `index.html`, uncomment this line inside the `<audio>` tag:
     ```html
     <source src="audio/ambient.mp3" type="audio/mpeg" />
     ```

3. **Open the site**
   - Simply double-click `index.html` to open it in your browser
   - No server needed — it works offline

---

## Customising text

All the letter text, reasons, and captions are in `index.html`.
Search for the section comments (e.g. `SECTION 2 — LOVE LETTER`) to find them quickly.

To change polaroid captions, edit the `<p class="polaroid-caption">` lines.

---

## File structure

```
romantic-site/
├── index.html       ← Main page
├── style.css        ← All styles
├── script.js        ← Particles, cursor, scroll effects
├── photos/          ← Add your photos here
│   ├── photo1.jpg
│   ├── photo2.jpg
│   └── ...
└── audio/           ← Optional ambient music
    └── ambient.mp3
```

---

Made with love, for Isha. — Agam
