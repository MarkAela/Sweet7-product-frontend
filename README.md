# Sweet7 – Product Frontend

Sweet7 is a bakery-themed e-commerce frontend built using React and Vite.

## Technologies Used
- React 19
- Vite
- Material UI (MUI)
- Axios
- React Router

## Features
- Product listing and details
- Product search and filtering
- Product creation, editing, and deletion
- Login and registration pages
- Cart interface
- Laravel REST API integration

## Installation

1. Clone the repository.
2. Install dependencies:

   `npm install`

3. Start the development server:

   `npm run dev`

## Backend API Connection

The Sweet7 frontend connects to the Laravel REST API backend using Axios.

### API Configuration

Create a `.env` file in the frontend root directory and configure:

```env
VITE_API_URL=http://127.0.0.1:8090/api
```

The `.env.example` file provides the example API configuration.

### Start the Backend

Make sure the Laravel backend is running:

```bash
php artisan serve --port=8090
```

### Start the Frontend

In another terminal, run:

```bash
npm run dev
```

The React frontend will communicate with the Laravel API at:

`http://127.0.0.1:8090/api`
