# YelpCamp by rahimasalman

 - Go to website: - [https://rahima-yelpcamp.netlify.app](https://rahima-yelpcamp.netlify.app/) 
 - Welcome to website called Yelpcamp from Udemy instructor Colt Steele. Website was built using MongoDB, JavaScript, CSS, HTML, Express.js and Node.js.
- A full-stack campground review platform where users can discover, add, and review campgrounds from around the world. Built with Node.js, Express, MongoDB, and deployed to Netlify via serverless functions.

---

## Features

- **Browse campgrounds** on an interactive cluster map (Mapbox)
- **Create, edit & delete** campground listings with photo uploads
- **Leave reviews** with ratings on any campground
- **User authentication** — register, log in, log out (Passport.js)
- **Authorization** — only the author of a campground or review can edit/delete it
- **Image uploads** stored on Cloudinary
- **Geocoding** — type a location and it pins the map automatically
- **Security** — Helmet CSP headers, Mongo sanitization, input validation (Joi), HTML sanitization

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express 4 |
| Database | MongoDB Atlas + Mongoose 8 |
| Templating | EJS + EJS-Mate (layouts) |
| Auth | Passport.js + passport-local-mongoose |
| File uploads | Multer 2 + Cloudinary SDK v2 |
| Maps | Mapbox GL JS + @mapbox/mapbox-sdk |
| Session store | connect-mongo (MongoDB-backed sessions) |
| Security | Helmet, express-mongo-sanitize, sanitize-html, Joi |
| Deployment | Netlify Functions (serverless-http) |

---

## Getting Started Locally

### 1. Prerequisites

- [Node.js](https://nodejs.org/) v18+
- A free [MongoDB Atlas](https://mongodb.com/atlas) cluster
- A free [Cloudinary](https://cloudinary.com) account
- A free [Mapbox](https://mapbox.com) account

### 2. Clone & install

```bash
git clone https://github.com/your-username/rahima-yelpcamp.git
cd rahima-yelpcamp
npm install
```

### 3. Run locally

```bash
npm run dev
```

Visit `http://localhost:8000`

---

## Environment Variables

| Variable | Where to get it |
|---|---|
| `DB_URL` | [MongoDB Atlas](https://mongodb.com/atlas) → your cluster → **Connect** → *Drivers* → copy the string, replace `<password>` |
| `SECRET` | Any long random string — generate one: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| `CLOUDINARY_CLOUD_NAME` | [Cloudinary Console](https://cloudinary.com/console) → Dashboard |
| `CLOUDINARY_KEY` | Same Cloudinary Dashboard → **API Key** |
| `CLOUDINARY_SECRET` | Same Cloudinary Dashboard → **API Secret** |
| `MAPBOX_TOKEN` | [Mapbox Tokens](https://account.mapbox.com/access-tokens/) → copy your default public token or create a new one |

---
## Project Structure

```
├── app.js                  # Express app (entry point)
├── controllers/            # Route handler logic
│   ├── campgrounds.js
│   ├── reviews.js
│   └── users.js
├── models/                 # Mongoose schemas
│   ├── campground.js
│   ├── review.js
│   └── user.js
├── routes/                 # Express routers
│   ├── campgrounds.js
│   ├── reviews.js
│   └── users.js
├── views/                  # EJS templates
│   ├── campgrounds/
│   ├── users/
│   ├── partials/
│   └── layouts/
├── public/                 # Static assets (CSS, client JS)
├── cloudinary/             # Cloudinary + Multer storage config
├── middleware.js           # Auth & validation middleware
├── schemas.js              # Joi validation schemas
├── seeds/                  # Database seed scripts
├── utils/                  # Helpers (catchAsync, ExpressError)
├── .env.example            # Environment variable template
└── package.json
```

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Run locally with nodemon (auto-restart on file save) |
| `npm start` | Run with plain Node (used by Netlify / production) |

---

## License

ISC
