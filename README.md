# 🪑 Furniture Recommender System — Frontend

This is the **frontend** of the Furniture Recommender Web App.
It provides a beautiful, responsive interface for users to explore AI-based furniture recommendations powered by the FastAPI backend.

---

## 🚀 Tech Stack

* **React + Vite** — Fast and modern frontend setup
* **Material UI (MUI)** — Clean, responsive components
* **Framer Motion** — Smooth animations and transitions
* **Axios** — For communicating with the FastAPI backend
* **Render** — For deployment as a static site

---

## 🧩 Folder Structure

```
frontend/
├── src/
│   ├── components/          # UI components (ChatUI, Analytics, etc.)
│   ├── pages/               # Main pages (Home, Analytics)
│   ├── App.jsx              # Main React component
│   └── main.jsx             # Entry point
├── public/                  # Static assets
├── package.json             # Frontend dependencies
├── vite.config.js           # Vite proxy setup for local API calls
└── README.md
```

---

## ⚙️ Setup (Local Development)

1. **Clone the repo**

   ```bash
   git clone https://github.com/<your-username>/furniture-recommender-frontend.git
   cd furniture-recommender-frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Connect backend for local dev**

   In `vite.config.js`, set up a proxy:

   ```js
   export default {
     server: {
       proxy: {
         '/api': 'http://localhost:8000',
       },
     },
   };
   ```

   Then, in your frontend code, call:

   ```js
   axios.post('/api/recommend', { query: userInput });
   ```

4. **Run the app**

   ```bash
   npm run dev
   ```

5. **View in browser**

   ```
   http://localhost:5173
   ```

---

## 🌐 Deployment (Render)

1. Build the project:

   ```bash
   npm run build
   ```

2. Push to GitHub.

3. Go to [Render.com](https://render.com) → **New → Static Site**.

4. Connect your repo and configure:

   * **Build Command:** `npm run build`
   * **Publish Directory:** `dist`
   * **Environment Variable (optional):**

     ```
     VITE_API_BASE_URL = https://your-backend.onrender.com
     ```

   Then in your code:

   ```js
   const API_URL = import.meta.env.VITE_API_BASE_URL || '/api';
   ```

5. Deploy! 🚀

---

## 🧠 Pages & Features

| Page                 | Description                                         |
| -------------------- | --------------------------------------------------- |
| **Home / Recommend** | Enter furniture details to get AI-based suggestions |
| **Analytics**        | Visualizes recommendation performance and trends    |
| **Navbar**           | Smooth navigation between app sections              |

---

## 🧰 Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start dev server         |
| `npm run build`   | Build production bundle  |
| `npm run preview` | Preview production build |

---

## 🪶 Example `.env` (optional)

```env
VITE_API_BASE_URL=https://furniture-recommender-backend.onrender.com
```

---

## 📈 Future Enhancements

* Add authentication & personalized dashboards
* Include “View More” furniture details page
* Connect live database with backend

---

## 👨‍💻 Author

**Shivansh Gupta**
