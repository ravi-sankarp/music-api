# Favorites API

## Overview
The Music Library Management API allows users within an organization to manage and interact with their collection of Artists, Tracks, and Albums. It supports Role-Based Access Control (RBAC), with distinct roles for users, such as Admin, Editor, and Viewer, ensuring proper permissions based on responsibilities. The API also allows users to personalize their experience by marking Artists, Albums, and Tracks as favorites.

## How to Run

### Prerequisites
- Node.js (>= 16.x)
- PostgreSQL (>= 14.x)
- Supertokens for authentication

### Steps
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd favorites-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the `.env` file:
   ```bash
   cp .env.example .env
   ```
   Update the file with your database credentials.

4. Run database migrations:
   ```bash
   npx sequelize-cli db:migrate
   ```

5. Start the server:
   ```bash
   npm start
   ```

The API will be accessible at `http://localhost:5000`. Adjust the port if needed in the `.env` file.

