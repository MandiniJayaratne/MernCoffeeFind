# CoffeeFind ☕

**CoffeeFind** is a MERN web application where locals can share and explore favorite coffee spots. All users can view coffee places, while logged-in users can create, update, and delete entries in their accounts. Each user has a profile, with passwords securely hashed for privacy and security. 💡This project was my first practice in the MERN stack.

## Features ✨

- **View Coffee Places**: All users can browse coffee places shared by others.
- **User Accounts**: Registered users can create, edit, and remove their coffee places.
- **Profile Management**: Each user has a profile, with passwords securely stored using hashing.
- **Authentication and Authorization**: Access to specific actions (create, update, delete) is restricted to logged-in users.

## Technologies Used 🛠️

- **Frontend**: React.js ⚛️
- **Backend**: Node.js 🌐, Express.js 🚀
- **Database**: MongoDB 🗄️ (with Mongoose for ORM)
- **Authentication**: JWT (JSON Web Tokens) 🔐 for secure access control
- **Password Hashing**: bcrypt 🔑 for secure storage

- ## Installation and Setup 🛠️

### Prerequisites

- Node.js and npm
- MongoDB (or a cloud-based MongoDB service)

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/coffeeFind.git
   cd coffeeFind

2. **Backend Setup**:

    ```bash
   cd backend
   npm install

  **Configure the MongoDB connection - MONGODB_URI=your_mongodb_connection_string**:
    ```bash
   npm start
   
3. **Frontend Setup**

   ```bash
  cd frontend
  npm install
  npm start


