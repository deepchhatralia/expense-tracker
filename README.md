# Expense Tracker

The Expense Tracker is a web application that helps users track their expenses. It allows users to perform CRUD operations on expenses under different categories.

## Features

- <b>User Authentication</b>: Users can sign up and log in to the application using their email and password. The application uses JSON Web Tokens (JWT) for user authentication.
- <b>Dashboard</b>: Upon logging in, users are presented with a dashboard that displays their expenses and provides insights into their spending habits.
- <b>Categories</b>: The application allows users to categorize their expenses, making it easier to organize and analyze their spending.
- <b>Charts and Analytics</b>: The dashboard provides visual representations of expenses using charts, allowing users to track and analyze their spending patterns.
- <b>Responsive Design</b>: The application is designed to be responsive.

## Technologies Used

- <b>Frontend</b>: React.js, React Router DOM, Chart.js
- <b>Backend</b>: Node.js, Express.js, MongoDB (via Mongoose)
- <b>User Authentication</b>: JSON Web Tokens (JWT)
- <b>Styling</b>: CSS, Bootstrap

## Installation and Usage

1. Clone the repository from GitHub.
2. Navigate to the project directory in your terminal or command prompt.
3. Install the required dependencies by running `npm install` in both the `client` and `server` directories.
4. Start the backend server by running `node app.js` in the `api` directory.
5. Start the frontend development server by running `npm start` in the `client` directory.
6. Open your web browser and access the application at `http://localhost:3000/`.

Please note that for the backend to work correctly, you may need to set up a MongoDB database and provide the necessary credentials in the backend configuration file.
