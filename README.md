# Task Management Application

This is a full-stack Task Management application built with Laravel (backend) and Vue.js (frontend). The application allows users to manage tasks with full CRUD functionality and includes authentication.

## Features

- **Frontend**
  - Display a list of tasks with their titles, descriptions, and completion status.
  - Add new tasks via a form.
  - Edit or delete existing tasks.
  - Toggle task completion status.
  - Responsive design for both desktop and mobile screens.

- **Backend**
  - RESTful API endpoints for managing tasks.
  - SQLite database included with dummy data and a test user.
  - Authentication (login and logout).

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- [PHP](https://www.php.net/) (>=8.0)
- [Composer](https://getcomposer.org/)
- [Node.js/npm](https://nodejs.org/) (>=16.0)

### Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone https://github.com/dfromm91/Laravel-Vue-Task-Manager.git
   cd Laravel-Vue-Task-Manager
   ```

2. **Backend Setup**

   Navigate to the backend folder:

   ```bash
   cd task-manager-backend
   ```

   Install PHP dependencies:

   ```bash
   composer install
   ```

   Copy the environment configuration:

   ```bash
   cp env.txt .env
   ```

   Generate the application key:

   ```bash
   php artisan key:generate
   ```

   Start the Laravel development server:

   ```bash
   php artisan serve
   ```

3. **Frontend Setup**

   Open a new terminal window and navigate to the frontend folder:

   ```bash
   cd task-manager-frontend
   ```

   Install JavaScript dependencies:

   ```bash
   npm install
   ```

   Start the Vue.js development server:

   ```bash
   npm run serve
   ```

4. **Access the Application**

   Open your browser and navigate to:

   ```
   http://localhost:8080
   ```

   Use the included test user to log in:

   - **Email:** `user@test.com`
   - **Password:** `password`

## Included Data

The SQLite database included in the repository contains:
- Dummy tasks to demonstrate CRUD functionality.
- A test user account for authentication.

## License

This project is open-source and available under the [MIT License](LICENSE).
