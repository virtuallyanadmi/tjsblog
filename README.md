# Jonathan Stewart Blog

A professional blog built with **Astro** and **Sanity CMS**, focused on cloud efficiencies, AI enablement, and leadership development.

**Live Site:** [thejonathanstewart.com](https://thejonathanstewart.com)

---

## 🚀 Features

- **Static Site Generation** with Astro for blazing-fast performance
- **Headless CMS** powered by Sanity for easy content management
- **Blog** with category filtering (Cloud, AI, Leadership)
- **Professional Design** with Tailwind CSS
- **Dark Mode** with system preference detection and manual toggle
- **Fully Responsive** mobile-first design
- **SEO Optimized** with meta tags, Open Graph, and sitemap
- **Contact Form** with email notifications
- **Easy Deployment** to Cloudflare Pages

---

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js** 18+ installed ([Download](https://nodejs.org/))
- **npm** or **pnpm** package manager
- A **Sanity.io** account (free tier available)
- A **Web3Forms** or **Formspree** account for contact form emails
- A **GitHub** account for deployment
- A **Cloudflare** account (free tier available)

---

## 🛠️ Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/virtuallyanadmi/tjsblog.git
cd tjsblog
```

### 2. Install Dependencies

```bash
# Install Astro dependencies
npm install

# Install Sanity Studio dependencies
cd sanity
npm install
cd ..
```

### 3. Set Up Sanity CMS

#### Create a Sanity Project

1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Click **"Create new project"**
3. Name it "Jonathan Stewart Blog"
4. Choose **"Create empty project"**
5. Note your **Project ID** (you'll need this)

#### Configure Sanity Studio

```bash
# Navigate to sanity folder
cd sanity

# Create environment file
cp .env.example .env
```

Edit `sanity/.env`:
```env
SANITY_STUDIO_PROJECT_ID=your_project_id_here
SANITY_STUDIO_DATASET=production
```

#### Run Sanity Studio Locally

```bash
cd sanity
npm run dev
```

Sanity Studio will be available at `http://localhost:3333`

#### Add Initial Content

1. Open Sanity Studio at `http://localhost:3333`
2. Create categories:
   - **Cloud Efficiencies** (slug: `cloud`, icon: `cloud`, color: `blue`)
   - **AI Enablement** (slug: `ai`, icon: `ai`, color: `purple`)
   - **Leadership Development** (slug: `leadership`, icon: `leadership`, color: `green`)
3. Create an **Author** profile for Jonathan Stewart
4. Create **Site Settings** with the mission statement
5. Create your first **Blog Post**!

### 4. Configure Astro Frontend

```bash
# In the root directory
cp .env.example .env
```

Edit `.env`:
```env
PUBLIC_SANITY_PROJECT_ID=your_project_id_here
PUBLIC_SANITY_DATASET=production
PUBLIC_SANITY_API_VERSION=2024-01-01

# Contact Form (choose one)
PUBLIC_WEB3FORMS_ACCESS_KEY=your_web3forms_key
# OR
PUBLIC_FORMSPREE_ID=your_formspree_id

PUBLIC_SITE_URL=https://thejonathanstewart.com
```

### 5. Run the Development Server

```bash
npm run dev
```

The site will be available at `http://localhost:4321`

---

## 📧 Contact Form Email Setup

You have two options for receiving contact form submissions:

### Option 1: Web3Forms (Recommended)

1. Go to [web3forms.com](https://web3forms.com/)
2. Enter the email where you want to receive notifications: `going2timbutku@gmail.com`
3. Check your email and verify your access key
4. Copy the **Access Key**
5. Add it to your `.env` file:
   ```env
   PUBLIC_WEB3FORMS_ACCESS_KEY=your_access_key_here
   ```

**Features:**
- ✅ Free tier: 250 submissions/month
- ✅ No account required
- ✅ Spam protection included
- ✅ Custom redirect support

### Option 2: Formspree

1. Sign up at [formspree.io](https://formspree.io/)
2. Create a new form
3. Set the recipient email to `going2timbutku@gmail.com`
4. Copy your **Form ID** (format: `xyzabc`)
5. Add it to your `.env` file:
   ```env
   PUBLIC_FORMSPREE_ID=your_form_id_here
   ```

**Features:**
- ✅ Free tier: 50 submissions/month
- ✅ Dashboard for viewing submissions
- ✅ File upload support

---

## 💬 Setting Up Giscus Comments

Giscus is a comments system powered by GitHub Discussions. It's free, requires no database, and integrates seamlessly with GitHub.

### Step 1: Enable GitHub Discussions

1. Go to your GitHub repository settings
2. Scroll to the **Features** section
3. Check **"Discussions"** to enable it
4. Click **"Set up discussions"** when prompted

### Step 2: Create a Discussion Category

1. Go to your repository's **Discussions** tab
2. Click the **gear icon** ⚙️ next to Categories
3. Create a new category called **"Blog Comments"**:
   - **Category name:** `Blog Comments`
   - **Discussion Format:** Choose **"Announcement"** (only maintainers can create, but anyone can reply)
   - **Description:** `Comments on blog posts`
4. Click **"Create category"**

### Step 3: Configure Giscus

1. Visit [giscus.app](https://giscus.app)
2. Fill in the configuration form:
   - **Repository:** Enter your repo (e.g., `yourusername/thejonathanstewart-blog`)
   - **Page ↔️ Discussions Mapping:** Select **"Discussion title contains page `pathname`"**
   - **Discussion Category:** Select **"Blog Comments"**
   - **Features:** Enable **"Enable reactions for the main post"**
   - **Theme:** Select **"GitHub Light"** (matches the blog's light theme)
3. Scroll down to see the generated `<script>` tag
4. Copy these values from the script:
   - `data-repo` → `PUBLIC_GISCUS_REPO`
   - `data-repo-id` → `PUBLIC_GISCUS_REPO_ID`
   - `data-category` → `PUBLIC_GISCUS_CATEGORY`
   - `data-category-id` → `PUBLIC_GISCUS_CATEGORY_ID`

### Step 4: Add Environment Variables

Add to your `.env` file:

```env
# Giscus Comments
PUBLIC_GISCUS_REPO=yourusername/thejonathanstewart-blog
PUBLIC_GISCUS_REPO_ID=R_kgDO...  # From giscus.app
PUBLIC_GISCUS_CATEGORY=Blog Comments
PUBLIC_GISCUS_CATEGORY_ID=DIC_kwDO...  # From giscus.app
```

### Step 5: Add to Cloudflare Pages

Don't forget to add these environment variables to your Cloudflare Pages deployment settings as well.

**Features:**
- ✅ Free and open source
- ✅ No tracking, no ads
- ✅ Lazy loading for performance
- ✅ Powered by GitHub Discussions
- ✅ Supports reactions and replies

---

## ☁️ Deploying to Cloudflare Pages

> **Note:** This site is deployed using **Cloudflare Pages** (not Cloudflare Workers). Cloudflare Pages is optimized for static sites and provides automatic builds from Git. No `wrangler.toml` or `wrangler deploy` commands are needed for static Astro sites.

### Step 1: Push to GitHub

```bash
# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Create repository on GitHub and push
git remote add origin https://github.com/yourusername/thejonathanstewart-blog.git
git branch -M main
git push -u origin main
```

### Step 2: Connect to Cloudflare Pages

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Workers & Pages** in the sidebar
3. Click **"Create"** → Select the **"Pages"** tab → **"Connect to Git"**
4. Authorize Cloudflare to access your GitHub account (if not already)
5. Select the repository: `virtuallyanadmi/tjsblog`

### Step 3: Configure Build Settings

After selecting your repository, configure the build settings:

| Setting | Value |
|---------|-------|
| **Project name** | `tjsblog` (or your preferred name) |
| **Production branch** | `main` |
| **Framework preset** | `Astro` |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Root directory** | `/` (leave empty or `/`) |

#### Important Build Settings Notes:

- **Framework preset:** Selecting "Astro" auto-fills the build command and output directory
- **Build output directory:** Must be `dist` (Astro's default output folder)
- **Root directory:** Leave as `/` since `package.json` is in the repository root
- **Do NOT use** `npx wrangler deploy` - that's for Cloudflare Workers, not Pages

### Step 4: Add Environment Variables

Click **"Environment variables"** to expand the section and add:

| Variable | Value | Required |
|----------|-------|----------|
| `PUBLIC_SANITY_PROJECT_ID` | Your Sanity project ID | ✅ Yes |
| `PUBLIC_SANITY_DATASET` | `production` | ✅ Yes |
| `PUBLIC_SANITY_API_VERSION` | `2024-01-01` | ✅ Yes |
| `PUBLIC_SITE_URL` | `https://thejonathanstewart.com` | ✅ Yes |
| `PUBLIC_WEB3FORMS_ACCESS_KEY` | Your Web3Forms key | Conditional |
| `PUBLIC_FORMSPREE_ID` | Your Formspree ID | Conditional |
| `PUBLIC_GISCUS_REPO` | `virtuallyanadmi/tjsblog` | Optional |
| `PUBLIC_GISCUS_REPO_ID` | From giscus.app | Optional |
| `PUBLIC_GISCUS_CATEGORY` | `Blog Comments` | Optional |
| `PUBLIC_GISCUS_CATEGORY_ID` | From giscus.app | Optional |

> **Tip:** You can add environment variables for both "Production" and "Preview" environments. Variables prefixed with `PUBLIC_` are exposed to the browser.

### Step 5: Deploy

1. Click **"Save and Deploy"**
2. Wait for the build to complete (usually 1-3 minutes)
3. Once deployed, you'll get a URL like `https://tjsblog.pages.dev`

### Step 6: Set Up Custom Domain

1. In Cloudflare Pages, go to your project
2. Click **"Custom domains"** tab
3. Click **"Set up a custom domain"**
4. Enter `thejonathanstewart.com`
5. Follow the DNS configuration instructions:
   - If your domain is already on Cloudflare: DNS records are added automatically
   - If your domain is elsewhere: Add the CNAME record shown
6. Also add `www.thejonathanstewart.com` as an additional domain

### Automatic Deployments

Once connected, Cloudflare Pages automatically:
- ✅ Builds and deploys when you push to `main`
- ✅ Creates preview deployments for pull requests
- ✅ Provides unique URLs for each preview deployment

---

## 🔧 Troubleshooting Cloudflare Pages

### Common Build Issues

#### Build fails with "npm ERR!"
- **Cause:** Dependency installation issues
- **Fix:** Ensure `package-lock.json` is committed to the repository

#### Build fails with "astro check" errors
- **Cause:** TypeScript errors in the code
- **Fix:** Run `npm run build` locally first to identify and fix errors

#### Environment variables not working
- **Cause:** Variables not prefixed with `PUBLIC_` or not added in Cloudflare
- **Fix:** 
  - Ensure all client-side variables start with `PUBLIC_`
  - Verify variables are added in Cloudflare Pages dashboard
  - Redeploy after adding/updating variables

#### Sanity content not showing
- **Cause:** Missing or incorrect Sanity environment variables
- **Fix:**
  1. Verify `PUBLIC_SANITY_PROJECT_ID` is correct
  2. Check that CORS is configured in Sanity for your Cloudflare Pages URL
  3. In Sanity dashboard → API → CORS Origins, add:
     - `https://tjsblog.pages.dev`
     - `https://thejonathanstewart.com`

#### 404 errors on page refresh
- **Cause:** This shouldn't happen with static output mode
- **Fix:** Ensure `astro.config.mjs` has `output: 'static'`

### Clearing Build Cache

If you encounter persistent build issues:
1. Go to your Cloudflare Pages project
2. Navigate to **Settings** → **Builds & deployments**
3. Click **"Clear build cache"**
4. Trigger a new deployment

### Viewing Build Logs

To debug build failures:
1. Go to your Cloudflare Pages project
2. Click on the failed deployment
3. Click **"View logs"** to see detailed build output

---

## 📝 Deploy Sanity Studio (Optional)

You can deploy Sanity Studio to access it from anywhere:

```bash
cd sanity

# Deploy to Sanity's hosting
npm run deploy
```

Your studio will be available at: `https://jonathanstewart-blog.sanity.studio`

---

## 📁 Project Structure

```
thejonathanstewart-blog/
├── public/                 # Static assets
│   ├── favicon.svg
│   └── robots.txt
├── sanity/                 # Sanity CMS Studio
│   ├── schemas/            # Content schemas
│   │   ├── post.ts
│   │   ├── category.ts
│   │   ├── author.ts
│   │   ├── siteSettings.ts
│   │   └── blockContent.ts
│   ├── sanity.config.ts
│   └── package.json
├── src/
│   ├── components/         # Reusable components
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Hero.astro
│   │   ├── BlogCard.astro
│   │   ├── CategoryFilter.astro
│   │   ├── ContactForm.astro
│   │   ├── FocusAreas.astro
│   │   ├── Giscus.astro    # Comments component
│   │   └── ThemeToggle.astro # Dark mode toggle
│   ├── layouts/            # Page layouts
│   │   └── BaseLayout.astro
│   ├── lib/                # Utilities & Sanity client
│   │   ├── sanity.ts
│   │   ├── portableText.ts
│   │   └── utils.ts
│   ├── pages/              # Route pages
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── contact.astro
│   │   └── blog/
│   │       ├── index.astro
│   │       └── [slug].astro
│   └── styles/
│       └── global.css
├── .env.example            # Environment template
├── astro.config.mjs        # Astro configuration
├── tailwind.config.mjs     # Tailwind configuration
├── tsconfig.json           # TypeScript config
└── package.json
```

---

## 📜 Available Scripts

### Root Directory (Astro)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Astro development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run sanity:dev` | Start Sanity Studio locally |
| `npm run sanity:deploy` | Deploy Sanity Studio |

### Sanity Directory

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Sanity Studio |
| `npm run build` | Build Sanity Studio |
| `npm run deploy` | Deploy to Sanity hosting |

---

## 🔧 Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `PUBLIC_SANITY_PROJECT_ID` | Yes | Your Sanity project ID |
| `PUBLIC_SANITY_DATASET` | Yes | Sanity dataset (usually `production`) |
| `PUBLIC_SANITY_API_VERSION` | Yes | API version (`2024-01-01`) |
| `PUBLIC_WEB3FORMS_ACCESS_KEY` | Conditional | Web3Forms access key |
| `PUBLIC_FORMSPREE_ID` | Conditional | Formspree form ID |
| `PUBLIC_SITE_URL` | Yes | Production site URL |
| `PUBLIC_GISCUS_REPO` | No | GitHub repo for comments (owner/repo) |
| `PUBLIC_GISCUS_REPO_ID` | No | Giscus repository ID |
| `PUBLIC_GISCUS_CATEGORY` | No | Discussion category name |
| `PUBLIC_GISCUS_CATEGORY_ID` | No | Giscus category ID |

---

## 🌐 Future Enhancements

This codebase is designed to be easily extended. Here are some planned features:

- [ ] **Newsletter Subscription** - Integration with ConvertKit/Mailchimp
- [ ] **Services Page** - Showcase consulting services
- [ ] **Testimonials** - Client testimonials section
- [x] **Dark Mode** - Toggle between light/dark themes with system preference support
- [ ] **Search** - Full-text search across posts
- [ ] **RSS Feed** - For blog syndication
- [x] **Comments** - Blog post comments via Giscus (GitHub Discussions)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 📞 Support

If you have any questions or need help, please [open an issue](https://github.com/yourusername/thejonathanstewart-blog/issues) or reach out via the contact form on the website.

---

Built with ❤️ using [Astro](https://astro.build) and [Sanity](https://sanity.io)
