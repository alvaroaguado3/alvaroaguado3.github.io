# alvaroaguado3.github.io

Personal site for Alvaro Aguado, PhD — served by GitHub Pages from the `master` branch at
[alvaroaguado3.github.io](https://alvaroaguado3.github.io/).

---

## Adding a new post (the 30-second version)

When you publish something on LinkedIn (or anywhere else) and want it on the site:

1. Go to **[Issues → New issue](https://github.com/alvaroaguado3/alvaroaguado3.github.io/issues/new/choose)**
   and pick **"Add a post to the website"**. This works from the GitHub mobile app too.
2. Paste the URL and a title. Source, date, summary and tags are optional —
   the date defaults to today.
3. Submit.

A GitHub Action then appends the entry to `posts.json`, pushes the commit, comments on the
issue to confirm, and closes it. The Writing section of the site picks it up on the next
page load, usually a minute or two later once Pages redeploys.

If something is wrong with the input (bad URL, malformed date), the Action comments on the
issue explaining what to fix and leaves it open — edit the issue and it runs again.

Only issues opened by the repository owner are processed.

### Editing or removing a post

Edit `posts.json` directly and commit. It is a plain array, newest first:

```json
{
  "title": "What happens when your forecast knows it might be wrong?",
  "url": "https://www.linkedin.com/posts/...",
  "source": "LinkedIn",
  "date": "2026-09-05",
  "summary": "One or two sentences shown under the title.",
  "tags": ["Forecasting", "Conformal Prediction"]
}
```

`source` is one of `LinkedIn`, `Medium`, `Website`, `Talk`, `Paper`, `Other`.
Entries are sorted by `date` descending at render time, so order in the file does not matter.

---

## Layout

| Path | What it is |
|---|---|
| `index.html` | The whole single-page site: About, Experience, Case Studies, Research, Projects, Writing, Publications, Blog, Contact. |
| `styles.css` | All styling. CSS custom properties for the palette live at the top. |
| `script.js` | Smooth scrolling, scroll animations, and the renderer that turns `posts.json` into the Writing section. |
| `posts.json` | The Writing feed. Maintained by the Action described above. |
| `og-image.png` | 1200×630 link preview card. Referenced by the Open Graph tags in `<head>`. |
| `case-studies/` | Sanitized one-page case-study PDFs and the PhD defense deck. |
| `Alvaro_Aguado_Resume.pdf` | Current résumé, linked from the hero. |
| `scripts/add_post.py` | Parses the issue form and writes `posts.json`. Runs in CI; also runnable locally. |
| `.github/workflows/add-post.yml` | The Action. |
| `.github/ISSUE_TEMPLATE/new-post.yml` | The issue form. |
| `post/`, `page/`, `tags/`, `topics/`, `2020/`, and the per-article folders | Legacy Hugo/blogdown output for the 2020 blog posts. Static; leave alone. |

---

## Keeping content consistent

The site, the résumé and the LinkedIn profile must agree on titles, dates and employers.
The source of truth is the master résumé and the live LinkedIn profile. When a role,
title or date changes, update all three — the Experience section of `index.html`,
`Alvaro_Aguado_Resume.pdf`, and LinkedIn.

The `<head>` of `index.html` also carries a JSON-LD `Person` block with the current
job title and employer. Update it alongside the Experience section.

---

## Local preview

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

The Writing section uses `fetch()` on `posts.json`, so it needs to be served over HTTP —
opening `index.html` from the filesystem will show the fallback message instead.

## Testing the post workflow locally

```bash
ISSUE_BODY="$(cat some-issue-body.md)" python3 scripts/add_post.py
```

It prints the outputs it would hand to the Action and rewrites `posts.json` in place.
