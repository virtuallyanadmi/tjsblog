# Jonathan Stewart Blog

A professional blog built with **Astro** and **Sanity CMS**, focused on cloud efficiencies, AI enablement, and leadership development.

**Live Site:** [thejonathanstewart.com](https://thejonathanstewart.com)

---

## 🚀 Features

- **Static Site Generation** with Astro for blazing-fast performance
- **Headless CMS** powered by Sanity for easy content management
- **Blog** with category filtering (Cloud, AI, Leadership)
- **Professional Design** with Tailwind CSS
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
cd thejonathanstewart-blog
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

## ☁️ Deploying to Cloudflare Pages

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
2. Navigate to **Pages** in the sidebar
3. Click **"Create a project"** → **"Connect to Git"**
4. Select your GitHub repository
5. Configure build settings:

   | Setting | Value |
   |---------|-------|
   | Framework preset | Astro |
   | Build command | `npm run build` |
   | Build output directory | `dist` |
   | Node.js version | `18` |

6. Add **Environment Variables**:
   - `PUBLIC_SANITY_PROJECT_ID`
   - `PUBLIC_SANITY_DATASET`
   - `PUBLIC_SANITY_API_VERSION`
   - `PUBLIC_WEB3FORMS_ACCESS_KEY` (or `PUBLIC_FORMSPREE_ID`)
   - `PUBLIC_SITE_URL`

7. Click **"Save and Deploy"**

### Step 3: Set Up Custom Domain

1. In Cloudflare Pages, go to your project
2. Click **"Custom domains"** tab
3. Click **"Set up a custom domain"**
4. Enter `thejonathanstewart.com`
5. Follow the DNS configuration instructions
6. Also add `www.thejonathanstewart.com` if desired

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
│   │   └── FocusAreas.astro
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

---

## 🌐 Future Enhancements

This codebase is designed to be easily extended. Here are some planned features:

- [ ] **Newsletter Subscription** - Integration with ConvertKit/Mailchimp
- [ ] **Services Page** - Showcase consulting services
- [ ] **Testimonials** - Client testimonials section
- [ ] **Dark Mode** - Toggle between light/dark themes
- [ ] **Search** - Full-text search across posts
- [ ] **RSS Feed** - For blog syndication
- [ ] **Comments** - Blog post comments (Disqus/Giscus)

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
