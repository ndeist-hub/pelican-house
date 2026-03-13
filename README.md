# 🦤 Pelican House Website

Your holiday rental website for Pelican House, San Sebastian, Mozambique.

---

## 🚀 How to Deploy on Vercel (Step-by-Step)

### Option A — Drag & Drop (Easiest, no coding needed)

1. Go to [vercel.com](https://vercel.com) and create a free account
2. From your Vercel dashboard, click **"Add New Project"**
3. Choose **"Deploy from your computer"** or drag this entire `pelican-house` folder into the upload area
4. Vercel will detect it's a React app automatically
5. Click **Deploy** — your site will be live in ~2 minutes!
6. You'll get a URL like `pelican-house.vercel.app`

### Option B — Via GitHub (Recommended for easy future updates)

1. Create a free account at [github.com](https://github.com)
2. Create a new repository called `pelican-house`
3. Upload all these files to the repository
4. Go to [vercel.com](https://vercel.com), sign in with GitHub
5. Click **"Add New Project"** → select your `pelican-house` repo
6. Click **Deploy** — done!

---

## 🌐 Connecting Your Custom Domain

Once deployed on Vercel:
1. In your Vercel project, go to **Settings → Domains**
2. Type in your domain (e.g. `pelicanhouse.com`) and click Add
3. Vercel will show you two DNS records to copy
4. Log into [Namecheap](https://namecheap.com), go to your domain → **Advanced DNS**
5. Paste in the records Vercel gave you
6. Wait 10–30 minutes — your site will be live at your domain! 🎉

---

## 🖼️ Updating Your Images & Video

The hero image (`hero.png`) and flyover video (`flyover.mov`) are in the `public/` folder.
To swap them out, simply replace those files with your new ones (keeping the same filenames).

---

## ✏️ Editing Your Content

All the text content (recommendations, checklist, property description) lives in `src/App.jsx`.
Open it in any text editor (like Notepad or TextEdit) and search for the text you want to change.

---

## 📧 Updating Your Contact Email

In `src/App.jsx`, search for `hello@pelicanhouse.com` and replace with your real email address.

---

Need help? The Vercel support docs are at [vercel.com/docs](https://vercel.com/docs)
