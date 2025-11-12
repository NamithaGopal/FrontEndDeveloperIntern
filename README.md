🚀 Frontend Developer Internship Assignment
📌 Project Title

Scalable Web App with Authentication & Dashboard

🧩 Tech Stack

Frontend: Next.js 13 + React + Tailwind CSS

Backend: Node.js + Express + MongoDB + JWT

Authentication: Secure JWT-based login/register

Database: MongoDB Community Server (local)

⚙️ Features Implemented

✅ User Signup / Login / Logout
✅ Password Hashing using bcrypt
✅ JWT Authentication & Protected Routes
✅ User Profile Fetch + Update
✅ CRUD Operations on “Notes” (Create, Read, Update, Delete)
✅ Search & Filter for notes
✅ Responsive Dashboard UI (TailwindCSS)
✅ Error Handling & Validation

🛠️ Project Setup (Windows)
🔹 1. Clone the repository
git clone https://github.com/<your-username>/frontend-developer-intern.git
cd frontend-developer-intern

🔹 2. Setup Backend
cd backend
npm install


Create a .env file:

PORT=4000
MONGO_URI=mongodb://localhost:27017/frontend_intern_db
JWT_SECRET=mysecret
JWT_EXPIRES_IN=7d


Start MongoDB service (Admin PowerShell):

net start MongoDB


Run backend:

npm run dev

🔹 3. Setup Frontend
cd ../frontend
npm install


Create .env.local:

NEXT_PUBLIC_API_URL=http://localhost:4000/api


Run frontend:

npm run dev


Open http://localhost:3000

🧪 Test Endpoints (optional)

Use Postman or PowerShell:

# Register
Invoke-RestMethod -Method Post -Uri http://localhost:4000/api/auth/register -ContentType 'application/json' -Body (@{name='Test';email='test@example.com';password='secret123'} | ConvertTo-Json)

# Login
Invoke-RestMethod -Method Post -Uri http://localhost:4000/api/auth/login -ContentType 'application/json' -Body (@{email='test@example.com';password='secret123'} | ConvertTo-Json)

📁 Folder Structure
frontend-developer-intern/
 ┣ backend/
 ┃ ┣ config/
 ┃ ┣ models/
 ┃ ┣ routes/
 ┃ ┣ server.js
 ┃ ┣ .env.example
 ┃ ┗ ...
 ┣ frontend/
 ┃ ┣ pages/
 ┃ ┣ components/
 ┃ ┣ lib/
 ┃ ┣ styles/
 ┃ ┗ .env.local
 ┗ README.md

🧠 How to Scale for Production

Use MongoDB Atlas for cloud DB

Deploy backend on Render / Railway / AWS EC2

Deploy frontend on Vercel / Netlify

Use environment variables for secrets

Add rate-limiting & helmet middleware for security

👩‍💻 Author

Namitha G
Frontend Developer Intern | CS Engineer
📧 namitha@example.com

"# FrontEndDeveloperIntern" 
