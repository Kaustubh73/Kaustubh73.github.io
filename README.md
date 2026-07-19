# Kaustubh Gupta — Personal Academic Website

A minimal, static single-page academic website for GitHub Pages. No build step, no
frameworks, no external dependencies (system fonts, inline SVG icons) — just
`index.html` + `styles.css` + `theme.js` served directly.

## Structure

```
index.html          # Single-page site (all sections + nav + footer)
styles.css          # All styling, dark-mode via data-theme
theme.js            # Dark-mode toggle + back-to-top + footer year
images/profile.jpg  # Profile photo
files/Kaustubh_Gupta_CV.pdf  # Downloadable CV
```

## Deployment (GitHub Pages)

1. Create a repository named `<your-github-username>.github.io` (e.g. `Kaustubh73.github.io`).
2. Push this folder to the `main` branch:
   ```bash
   git init
   git add .
   git commit -m "Initial website"
   git remote add origin https://github.com/<username>/<username>.github.io.git
   git push -u origin main
   ```
3. In the repository **Settings → Pages**, set:
   - **Source:** Deploy from a branch
   - **Branch:** `main`
   - **Folder:** `/ (root)`
4. The site will be live at `https://<username>.github.io/` within a few minutes.

No GitHub Actions or build step is required — the raw files are served as-is.

## Customizing

- **Text / sections:** edit `index.html`.
- **Colors, width, fonts:** edit the CSS variables at the top of `styles.css`.
- **Photo:** replace `images/profile.jpg`.
- **CV:** replace `files/Kaustubh_Gupta_CV.pdf`.
