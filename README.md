# Data Science Portfolio

A clean, professional portfolio website optimized for GitHub Pages.

## Setup Instructions

### Step 1: Prepare Your Profile Image

1. Get a professional photo of yourself (headshot works best)
2. Crop it to a square (1:1 aspect ratio)
3. Name it `profile.jpg` (or `profile.png`)
4. Recommended size: 400x400 pixels minimum

### Step 2: Customize the Content

Edit `index.html` and replace the following placeholders:

**Personal Information:**
- `Your Full Name` - Your actual name
- `Data Scientist | Machine Learning Researcher` - Your title/role
- `your.email@example.com` - Your email address
- `yourusername` - Your GitHub username
- `yourprofile` - Your LinkedIn profile URL

**About Section:**
- Replace the placeholder text with your actual bio
- Keep it professional but personal
- 2-3 paragraphs is ideal

**Research Interests:**
- Customize the 4 research cards with your actual interests
- Feel free to add or remove cards (just copy/paste the HTML structure)
- Be specific about your focus areas

**Projects:**
- Replace the 3 example projects with your actual projects
- Update project titles, descriptions, and links
- Add relevant tags for each project
- You can add more projects by duplicating the `<article class="project-card">` block

### Step 3: Create Your GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the `+` icon in the top-right corner
3. Select "New repository"
4. Name it: `yourusername.github.io` (replace `yourusername` with your actual GitHub username)
   - **Important**: The name MUST be exactly `yourusername.github.io` for GitHub Pages to work
5. Set it to **Public**
6. Do NOT initialize with README, .gitignore, or license
7. Click "Create repository"

### Step 4: Upload Your Files

**Option A: Using Git (Recommended)**

```bash
# Navigate to the folder containing your portfolio files
cd /path/to/your/portfolio/folder

# Initialize git repository
git init

# Add all files
git add .

# Commit the files
git commit -m "Initial portfolio commit"

# Add your GitHub repository as remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_USERNAME.github.io.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Option B: Using GitHub Web Interface (Easier for beginners)**

1. On your new repository page, click "uploading an existing file"
2. Drag and drop all four files:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `profile.jpg` (your image)
3. Scroll down and click "Commit changes"

### Step 5: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click "Settings" (top right)
3. Click "Pages" in the left sidebar
4. Under "Source", select "Deploy from a branch"
5. Under "Branch", select `main` and `/root`
6. Click "Save"

### Step 6: Access Your Site

Your site will be live at: `https://yourusername.github.io`

**Note**: It may take 1-2 minutes for the site to go live after your first deployment.

## Customization Tips

### Colors
Edit the CSS variables in `styles.css` (lines 1-11):
```css
:root {
    --color-bg: #fafaf8;           /* Background color */
    --color-text: #1a1a1a;         /* Main text color */
    --color-accent: #2c5f9e;       /* Accent color (links, buttons) */
    /* ... etc */
}
```

### Fonts
The site uses:
- **Crimson Pro** for body text (serif, elegant)
- **IBM Plex Mono** for accents (monospace, technical)

To change fonts, edit line 8 in `index.html` and update the CSS variables.

### Adding More Projects
Copy this block and paste it in the projects section:

```html
<article class="project-card">
    <div class="project-header">
        <h3 class="project-title">Your Project Name</h3>
        <div class="project-links">
            <a href="your-github-link" target="_blank" class="project-link">
                <!-- SVG icon here -->
                Code
            </a>
        </div>
    </div>
    <p class="project-description">
        Your project description
    </p>
    <div class="project-tags">
        <span class="tag">Technology</span>
        <span class="tag">Another Tag</span>
    </div>
</article>
```

### Adding Causes/Hobbies Section

When ready, uncomment and customize the template section in `index.html`, or add a new section:

```html
<section id="hobbies" class="section section-alt">
    <div class="container">
        <h2 class="section-title">Interests & Causes</h2>
        <div class="about-content">
            <p>Your content here...</p>
        </div>
    </div>
</section>
```

Don't forget to add a nav link for it in the navigation.

## Updating Your Site

After making changes:

**Using Git:**
```bash
git add .
git commit -m "Update portfolio content"
git push
```

**Using GitHub Web Interface:**
1. Click on the file you want to edit
2. Click the pencil icon (Edit)
3. Make your changes
4. Scroll down and click "Commit changes"

Changes will be live within 1-2 minutes.

## Troubleshooting

**Site not loading?**
- Double-check repository name is exactly `yourusername.github.io`
- Wait 2-3 minutes after first deployment
- Check Settings > Pages to confirm it's enabled

**Images not showing?**
- Make sure image file is named exactly as referenced in HTML
- Check that image was uploaded to repository
- Image names are case-sensitive

**Styling looks broken?**
- Ensure `styles.css` is in the same folder as `index.html`
- Check browser console (F12) for errors
- Clear browser cache and refresh

## Best Practices

1. **Keep it updated** - Add new projects as you complete them
2. **Be specific** - Detailed project descriptions are better than vague ones
3. **Quality over quantity** - 3-5 excellent projects beat 20 mediocre ones
4. **Include metrics** - "Improved accuracy by 15%" is better than "improved accuracy"
5. **Link to papers** - If you have publications, add them to relevant projects
6. **Test on mobile** - The site is responsive, but always check how it looks

## Advanced: Custom Domain (Optional)

If you want to use a custom domain (e.g., `yourname.com`):

1. Buy a domain from a registrar (Namecheap, Google Domains, etc.)
2. In your repository, create a file named `CNAME`
3. Add your domain name to this file (just the domain, nothing else)
4. In your domain registrar's DNS settings, add these records:
   - Type: `A`, Host: `@`, Value: `185.199.108.153`
   - Type: `A`, Host: `@`, Value: `185.199.109.153`
   - Type: `A`, Host: `@`, Value: `185.199.110.153`
   - Type: `A`, Host: `@`, Value: `185.199.111.153`
5. Wait 24-48 hours for DNS propagation

## License

Feel free to use this template for your own portfolio. No attribution required.

---

**Questions?** Open an issue in your repository or consult the [GitHub Pages documentation](https://docs.github.com/en/pages).
