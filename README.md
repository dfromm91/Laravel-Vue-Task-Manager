# Task Manager Fullstack Application

This is a fullstack Task Manager application built with a Laravel backend and a Vue.js frontend. The backend handles authentication, task management, and API endpoints, while the frontend provides a responsive user interface for managing tasks.

---

## Features

- **Backend (Laravel):**

  - Login, and logout with token-based authentication (Sanctum).
  - CRUD operations for tasks.
  - CSRF protection.

- **Frontend (Vue.js):**
  - Login and logout functionality.
  - Responsive task list with sorting and filtering.
  - Create, edit, and delete tasks.
  - Pagination for tasks.

---

## Prerequisites

- **Backend:**

  - PHP 8.1 or later
  - Composer
  - SQLite or another database supported by Laravel

- **Frontend:**
  - Node.js 14+ and npm/yarn

---

## Installation Instructions

### 1. Setting Up the Backend (Laravel)

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-repo/task-manager-backend.git
   cd task-manager-backend
   ```

2. **Install dependencies**:

   ```bash
   composer install
   ```

3. **Set up the environment**:

   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Update `.env` with your database and app configurations:
     ```plaintext
     DB_CONNECTION=sqlite
     DB_DATABASE=/absolute/path/to/database.sqlite
     ```

4. **Generate the SQLite database file**:

   ```bash
   touch database/database.sqlite
   ```

5. **Generate the application key**:

   ```bash
   php artisan key:generate
   ```

6. **Run migrations and seed the database**:

   ```bash
   php artisan migrate --seed
   ```

7. **Serve the backend**:
   ```bash
   php artisan serve
   ```
   - The backend will be accessible at `http://localhost:8000`.

---

### 2. Setting Up the Frontend (Vue.js)

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-repo/task-manager-frontend.git
   cd task-manager-frontend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   - The frontend will be accessible at `http://localhost:5173`.

---
