# 🏕️ YelpCamp

A full-stack campground review web application where users can discover, add, and review campgrounds from around the world. Built with Node.js, Express, and MongoDB as part of a comprehensive web development curriculum.

---

## 🌐 Live Demo

> _yet to come_

---

## 📸 Screenshots

> _yet to come_

---

## ✨ Features

- **Browse Campgrounds** — View all campgrounds on a paginated index page with interactive cluster maps
- **Campground Details** — See full info, photo gallery, location map, and all user reviews for each campground
- **Create & Edit Campgrounds** — Authenticated users can add new campgrounds with multiple image uploads
- **Review System** — Leave star-rated text reviews on any campground; delete your own reviews
- **User Authentication** — Register, log in, and log out securely with hashed passwords
- **Authorization** — Only the campground/review author can edit or delete their own content
- **Image Uploads** — Photos uploaded directly to Cloudinary via Multer
- **Interactive Maps** — Per-campground map and a clustered index map powered by MapTiler
- **Flash Messages** — Success and error notifications on every action
- **Input Validation** — Server-side validation with Joi; client-side Bootstrap validation
- **Security Hardening** — Mongo injection sanitization, HTML sanitization on user content
- **Persistent Sessions** — Sessions stored in MongoDB via connect-mongo

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express 5 |
| Database | MongoDB + Mongoose 9 |
| Templating | EJS + ejs-mate (layouts) |
| Authentication | Passport.js (passport-local + passport-local-mongoose) |
| Image Storage | Cloudinary v1 + multer-storage-cloudinary |
| Maps | MapTiler (@maptiler/client) |
| Session Store | connect-mongo |
| Validation | Joi |
| Security | express-mongo-sanitize, sanitize-html |
| Styling | Bootstrap 5 |
| Other | method-override, connect-flash, dotenv |

---

## 📁 Project Structure

```
YelpCamp/
├── app.js                  # Express app entry point
├── middleware.js            # Custom middleware (isLoggedIn, isAuthor, validateCampground, etc.)
├── schemas.js               # Joi validation schemas
├── package.json
│
├── models/
│   ├── campground.js        # Campground Mongoose model
│   ├── review.js            # Review Mongoose model
│   └── user.js              # User model (passport-local-mongoose plugin)
│
├── controllers/
│   ├── campgrounds.js       # Controller logic for campground routes
│   ├── reviews.js           # Controller logic for review routes
│   └── users.js             # Controller logic for auth routes
│
├── routes/
│   ├── campgrounds.js       # /campgrounds routes
│   ├── reviews.js           # /campgrounds/:id/reviews routes
│   └── users.js             # /register, /login, /logout routes
│
├── cloudinary/
│   └── index.js             # Cloudinary config + multer storage setup
│
├── seeds/
│   └── index.js             # Database seeding script
│
├── views/
│   ├── layouts/
│   │   └── boilerplate.ejs  # Base layout (navbar, flash, footer)
│   ├── partials/
│   │   ├── navbar.ejs
│   │   └── flash.ejs
│   ├── campgrounds/
│   │   ├── index.ejs
│   │   ├── show.ejs
│   │   ├── new.ejs
│   │   └── edit.ejs
│   ├── users/
│   │   ├── login.ejs
│   │   └── register.ejs
│   └── error.ejs
│
├── public/
│   ├── javascripts/
│   │   ├── clusterMap.js    # MapTiler cluster map (index page)
│   │   └── showPageMap.js   # MapTiler single-campground map
│   └── stylesheets/
│       └── app.css
│
└── utils/
    ├── ExpressError.js      # Custom error class
    └── catchAsync.js        # Async error wrapper
```

---

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [MongoDB](https://www.mongodb.com/) running locally or a MongoDB Atlas URI
- A [Cloudinary](https://cloudinary.com/) account (free tier works)
- A [MapTiler](https://www.maptiler.com/) account (free tier works)

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/satyams8092/YelpCamp.git
cd YelpCamp
```

**2. Install dependencies**

```bash
npm install
```

**3. Set up environment variables**

Create a `.env` file in the root directory:

```env
# MongoDB
DB_URL=mongodb://127.0.0.1:27017/yelp-camp

# Session
SECRET=yoursupersecretkey

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret

# MapTiler
MAPTILER_API_KEY=your_maptiler_key
```

**4. Seed the database** _(optional, populates sample campgrounds)_

```bash
node seeds/index.js
```

**5. Start the server**

```bash
node app.js
```

The app will be running at **http://localhost:3000**.

---

## 🔐 Environment Variables Reference

| Variable | Description |
|---|---|
| `DB_URL` | MongoDB connection string |
| `SECRET` | Session secret key |
| `CLOUDINARY_CLOUD_NAME` | Your Cloudinary cloud name |
| `CLOUDINARY_KEY` | Cloudinary API key |
| `CLOUDINARY_SECRET` | Cloudinary API secret |
| `MAPTILER_API_KEY` | MapTiler API key for maps |

---

## 🗺️ Routes

### Campgrounds

| Method | Path | Description |
|---|---|---|
| GET | `/campgrounds` | List all campgrounds |
| GET | `/campgrounds/new` | New campground form |
| POST | `/campgrounds` | Create campground |
| GET | `/campgrounds/:id` | Show campground detail |
| GET | `/campgrounds/:id/edit` | Edit form |
| PUT | `/campgrounds/:id` | Update campground |
| DELETE | `/campgrounds/:id` | Delete campground |

### Reviews

| Method | Path | Description |
|---|---|---|
| POST | `/campgrounds/:id/reviews` | Add a review |
| DELETE | `/campgrounds/:id/reviews/:reviewId` | Delete a review |

### Users

| Method | Path | Description |
|---|---|---|
| GET | `/register` | Registration form |
| POST | `/register` | Register user |
| GET | `/login` | Login form |
| POST | `/login` | Log in |
| GET | `/logout` | Log out |

---

## 🔒 Security Features

- **express-mongo-sanitize** — Strips `$` and `.` from user-supplied input to prevent NoSQL injection
- **sanitize-html** — Sanitizes review body and campground description content
- **Joi validation** — Server-side schema validation on all POST/PUT requests
- **Passport.js** — Secure local authentication with bcrypt-hashed passwords (via passport-local-mongoose)
- **Session security** — Sessions stored in MongoDB, not in-memory; configurable secret

---

## 📦 Key Dependencies

```json
{
  "express": "^5.2.1",
  "mongoose": "^9.1.6",
  "passport": "^0.7.0",
  "passport-local-mongoose": "^9.1.0",
  "cloudinary": "^1.41.3",
  "multer-storage-cloudinary": "^3.0.0",
  "@maptiler/client": "^3.0.2",
  "connect-mongo": "^6.0.0",
  "ejs-mate": "^4.0.0",
  "joi": "^18.1.2",
  "express-mongo-sanitize": "^2.2.0",
  "sanitize-html": "^2.17.4"
}
```

---

## 🤝 Contributing

This is a learning project, but pull requests are welcome! Feel free to open an issue if you find a bug or have a suggestion.

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a pull request

---

## 📄 License

This project is open source and available under the [ISC License](LICENSE).

---

## 🙏 Acknowledgements

- Inspired by the [Web Developer Bootcamp](https://www.udemy.com/course/the-web-developer-bootcamp/) by Colt Steele
- Sample campground images sourced from [Unsplash](https://unsplash.com/)
- Map tiles provided by [MapTiler](https://www.maptiler.com/)
- Image hosting by [Cloudinary](https://cloudinary.com/)
