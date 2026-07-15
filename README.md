# Face Attendance Management System

An AI-powered Face Attendance Management System built using the **MERN Stack** with facial recognition for secure and contactless attendance management.

---

## 🚀 Features

- Employee & Admin Login
- Face Registration
- Face Recognition Attendance
- Check In & Check Out
- Leave Management
- Attendance History
- Admin Approval System
- Email OTP Authentication
- Notifications
- Dashboard & Reports

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- React Router
- Face API.js
- MediaPipe

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt.js
- Nodemailer

---

## 📂 Project Structure

```
Face-Attendance-System/
│
├── frontend/
├── backend/
├── README.md
└── package.json
```

---

## ⚙️ Installation

### 1. Clone Repository

```bash
git clone https://github.com/your-username/face-attendance-system.git
cd face-attendance-system
```

### 2. Install Backend

```bash
cd backend
npm install
```

### 3. Install Frontend

```bash
cd ../frontend
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file inside the **backend** folder.

```env
PORT=5000

MONGO_URI=your_mongodb_uri

JWT_SECRET=your_secret_key

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_gmail_app_password

FRONTEND_URL=http://localhost:5173

ADMIN_EMAIL=admin@example.com
```

---

## 👨‍💼 Create Admin Account

Before logging in as an administrator, create the admin account.

### Run the Seed File

```bash
cd backend
node seeds/seedAdmin.js
```

If successful, you'll see:

```text
✅ Admin created successfully
Email: admin@example.com
Password: Admin@123
```

### Default Admin Login

| Email | Password |
|--------|----------|
| admin@example.com | Admin@123 |

> **Note:** Change the default password after the first login.

---

## ▶️ Run the Project

### Backend

```bash
cd backend
npm run dev
```

### Frontend

```bash
cd frontend
npm run dev
```

Frontend:

```
http://localhost:5173
```

Backend:

```
http://localhost:5000
```

---

## 📷 Modules

- Authentication
- Employee Management
- Face Registration
- Face Recognition
- Attendance
- Leave Management
- Notifications
- Admin Dashboard

---

## 📁 Folder Structure

```
backend
│── config
│── controllers
│── middlewares
│── models
│── routes
│── validators
│── utils
│── seeds
│   └── seedAdmin.js
│── server.js

frontend
│── src
│── public
│── package.json
```

---

## 📸 Screenshots

### Login Page

![Login](https://raw.githubusercontent.com/dev-himanshu-sharma/face-attendance/main/screenshots/login.png.png)

### Employee Dashboard

![Employee Dashboard](https://raw.githubusercontent.com/dev-himanshu-sharma/face-attendance/main/screenshots/employee.png.png)

### Admin Dashboard

![Admin Dashboard](https://raw.githubusercontent.com/dev-himanshu-sharma/face-attendance/main/screenshots/admin.png.png)

### Face Recognition

![Face Recognition](https://raw.githubusercontent.com/dev-himanshu-sharma/face-attendance/main/screenshots/face-ai.png.png)

### Notifications

![Notifications](https://raw.githubusercontent.com/dev-himanshu-sharma/face-attendance/main/screenshots/notification.png.png)

---

## 📈 Future Improvements

- Mobile Application
- QR Code Attendance
- Face Anti-Spoofing
- Cloud Deployment
- Analytics Dashboard

---

## 📄 License

This project is licensed under the MIT License.
---

## 📥 Download Project

If you don't want to clone the repository, you can download the complete project from Google Drive.

**Google Drive:**  
(https://drive.google.com/drive/folders/1k0Nd6IwLoLQmgz2z0ok0zuCcMsyP-zit?usp=sharing)

After downloading:

1. Extract the ZIP file.
2. Open the project folder.
3. Install the backend dependencies.
4. Install the frontend dependencies.
5. Configure the `.env` file.
6. Create the admin account using the seed script.
7. Run the backend and frontend servers.

---



## 👨‍💻 Author

**Himanshu Sharma**

- MERN Stack Developer
- Computer Science Engineer

GitHub: https://github.com/dev-himanshu-sharma

---
