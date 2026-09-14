# Cocoa Notes

A simple notes app for writing things down before you forget them. You can create notes, find them again with search, and edit or delete them whenever you like. It's built with the MERN stack: MongoDB, Express, React and Node.js.

**Live app:** [cocoa-notes.up.railway.app](https://cocoa-notes.up.railway.app/)

## What you can do

- Write a note, preview it, and save it. Edit or delete it later.
- Keep typing without worry. While you write a new note, the draft is saved in your browser, so a refresh won't wipe it.
- Search through titles and content, sort by date, title or length, and switch between a grid and a list.
- Pick a light or dark theme. The app remembers your choice.
- Use it on a phone, tablet or laptop.
- Move faster with shortcuts: `Ctrl/⌘ + K` to search, `N` for a new note, `E` to edit, `Ctrl/⌘ + S` to save.

There's also a limit of 100 requests per minute for each visitor. If you hit it, the app tells you how long to wait and picks up again on its own.

## Built with

**Frontend:** React 19, Vite, Tailwind CSS, daisyUI, React Router, Axios and Lucide icons

**Backend:** Node.js, Express 5, MongoDB with Mongoose, and Upstash Redis for rate limiting

**Hosting:** Railway

## Running it on your machine

You'll need:

- Node.js 20 or newer
- A MongoDB database (the free MongoDB Atlas tier is enough)
- An Upstash Redis database, if you want rate limiting. Without it the app still runs, it just skips the limit.

**1. Clone the project**

```bash
git clone https://github.com/Subhanjavaid13/Mern-App.git
cd Mern-App
```

**2. Add your environment variables**

Create a file called `backend/.env`:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
UPSTASH_REDIS_REST_URL=your_upstash_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_token
```

**3. Install the packages**

```bash
npm install --prefix backend
npm install --prefix frontend
```

**4. Start both parts**

Open two terminals. In the first one, start the API:

```bash
npm run dev --prefix backend
```

In the second one, start the frontend:

```bash
npm run dev --prefix frontend
```

Now open [http://localhost:5173](http://localhost:5173). The frontend passes every `/api` request through to the backend on port 5000, so there's nothing else to set up.

### Trying the production build

If you want to run it the same way it runs online:

```bash
npm run build
npm start
```

This builds the frontend and serves it together with the API from a single server. Open [http://localhost:5000](http://localhost:5000).

## API

| Method | Endpoint          | What it does            |
| ------ | ----------------- | ----------------------- |
| GET    | `/api/notes`      | Get all notes           |
| GET    | `/api/notes/:id`  | Get one note            |
| POST   | `/api/notes`      | Create a note           |
| PUT    | `/api/notes/:id`  | Update a note           |
| DELETE | `/api/notes/:id`  | Delete a note           |
| GET    | `/api/health`     | Check the server is up  |

A note only needs a `title` and some `content`:

```json
{ "title": "Groceries", "content": "Eggs, bread, coffee" }
```

## How the project is laid out

```
Mern-App/
├── backend/
│   └── src/
│       ├── config/        database, environment and rate limit setup
│       ├── controllers/   what each route actually does
│       ├── middleware/    the rate limiter
│       ├── models/        the Note schema
│       ├── routes/        API routes
│       └── server.js      starts the app
├── frontend/
│   └── src/
│       ├── components/    buttons, cards, forms and other pieces
│       ├── pages/         home, new note, note details
│       ├── lib/           Axios setup and API calls
│       └── hooks/         small reusable bits of logic
└── package.json           build and start scripts for deployment
```

For more detail on the frontend, see [`frontend/README.md`](frontend/README.md).

## Deploying

The live version runs on Railway. If you'd like to host your own copy, use these settings:

- **Build command:** `npm run build`
- **Start command:** `npm start`
- **Health check path:** `/api/health`
- **Variables:** `MONGO_URI`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, `PORT` and `NODE_ENV=production`

Every push to the `main` branch deploys automatically.

If you use MongoDB Atlas, go to **Network Access** and allow `0.0.0.0/0`, since hosts like Railway don't use a fixed IP address.

## Author

Made by [Subhan Javaid](https://github.com/Subhanjavaid13).
