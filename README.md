# MongoDB Express.js Template

A well-structured, production-ready Express.js backend template with MongoDB integration, user authentication with bcryptjs, and RESTful API endpoints.

## 📋 Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Configuration](#environment-configuration)
- [Running the Project](#running-the-project)
- [API Endpoints](#api-endpoints)
- [Database Models](#database-models)
- [File Descriptions](#file-descriptions)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

- **Express.js Framework**: Lightweight and flexible Node.js framework
- **MongoDB Integration**: NoSQL database with Mongoose ODM
- **Password Hashing**: Secure password encryption using bcryptjs
- **CORS Support**: Cross-Origin Resource Sharing enabled
- **Environment Variables**: Secure configuration management with dotenv
- **RESTful API**: Well-organized API routes and controllers
- **Timestamps**: Automatic created and updated timestamps on data
- **Error Handling**: Comprehensive error handling in controllers
- **Hot Reload**: Nodemon for development with automatic server restart

---

## 📁 Project Structure

```
MongoDB_Template/
├── app.js                          # Main application entry point
├── package.json                    # Project dependencies and scripts
├── package-lock.json               # Locked dependency versions
├── .env.example                    # Environment variables template
├── .env                           # Environment variables (local)
├── .gitignore                     # Git ignore rules
├── .git/                          # Git repository metadata
├── config/
│   └── db.js                      # MongoDB connection configuration
├── models/
│   └── user.model.js              # User schema and model definition
├── controllers/
│   └── user.controller.js         # User business logic and handlers
├── routes/
│   └── user.routes.js             # User API endpoints routing
└── node_modules/                  # Project dependencies
```

---

## 🔧 Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v14.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** (v6.0.0 or higher) - Comes with Node.js
- **MongoDB** (v4.0 or higher) - [Download](https://www.mongodb.com/try/download/community)
  - OR a MongoDB Atlas account for cloud database - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Git** - [Download](https://git-scm.com/)

---

## 📥 Installation

### Step 1: Clone the Repository

```bash
# Clone the project repository
git clone https://github.com/Zohaibhasan904/MongoDB_Templete.git

# Navigate to the project directory
cd MongoDB_Templete
```

### Step 2: Install Dependencies

```bash
# Install all project dependencies
npm install
```

### Step 3: Configure Environment Variables

```bash
# Copy the environment template file
cp .env.example .env

# Edit the .env file with your configuration
nano .env
# or use your preferred editor
```

---

## 🔐 Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
# MongoDB Connection URI
# Local MongoDB: mongodb://localhost:27017/mongodb_template
# MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/database_name
MONGO_URI=mongodb://localhost:27017/mongodb_template

# Server Port (default: 3000)
PORT=3000
```

### Example Environment Setup:

**For Local MongoDB:**
```env
MONGO_URI=mongodb://localhost:27017/mongodb_template
PORT=3000
```

**For MongoDB Atlas:**
```env
MONGO_URI=mongodb+srv://your_username:your_password@cluster0.xxxxx.mongodb.net/database_name?retryWrites=true&w=majority
PORT=3000
```

---

## 🚀 Running the Project

### Development Mode (with Hot Reload)

```bash
# Start the server with nodemon (automatic restart on file changes)
npm run dev
# or
npm start
```

The server will start on the configured PORT (default: `http://localhost:3000`)

Output:
```
 Server running on port http://localhost:3000
 MongoDB Connected
```

### Production Mode

```bash
# Start the server without nodemon
node app.js
```

---

## 🔌 API Endpoints

### Base URL
```
http://localhost:3000/api/v1
```

### User Endpoints

#### 1. Register a New User
```
POST /register
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Success Response (201):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error Response (400):**
```json
{
  "message": "All fields are required"
}
```

**Error Response (409):**
```json
{
  "message": "User already exists"
}
```

---

#### 2. Get All Users
```
GET /
```

**Request:**
```bash
curl http://localhost:3000/api/v1/
```

**Success Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
]
```

---

## 📊 Database Models

### User Model

Located in: `models/user.model.js`

```javascript
{
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false  // Password hidden by default
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}
```

**Model Properties:**
- `name`: User's full name (required, minimum 2 characters)
- `email`: User's email address (required, unique, lowercase)
- `password`: Hashed password (required, minimum 6 characters, hidden by default)
- `createdAt`: Timestamp of user creation
- `updatedAt`: Timestamp of last update

---

## 📄 File Descriptions

### `app.js`
Main application entry point. Configures Express server, loads routes, establishes database connection, and starts the server.

**Key Configurations:**
- CORS enabled for cross-origin requests
- JSON middleware for parsing request bodies
- Environment variables loaded via dotenv
- MongoDB connection management
- Server listening on configured PORT

### `config/db.js`
Database connection configuration using Mongoose.

**Exports:**
- `connectDB()`: Async function that connects to MongoDB using MONGO_URI

### `models/user.model.js`
User schema and model definition using Mongoose.

**Exports:**
- `User` model with validation rules and constraints

### `controllers/user.controller.js`
Business logic and request handlers for user operations.

**Exported Functions:**
- `registerUser`: Handles user registration with password hashing
- `getUsers`: Retrieves all users from database

### `routes/user.routes.js`
API route definitions and middleware configuration.

**Routes:**
- `POST /register`: User registration endpoint
- `GET /`: Get all users endpoint

### `.env.example`
Template file showing required environment variables.

### `.gitignore`
Specifies which files and directories should not be tracked by Git (node_modules, .env, etc.)

---

## 🛠️ Technologies Used

| Technology | Version | Purpose |
|------------|---------|---------|
| Express.js | ^5.2.1 | Web framework for Node.js |
| Mongoose | ^9.0.1 | MongoDB object modeling |
| MongoDB | Latest | NoSQL database |
| bcryptjs | ^3.0.3 | Password hashing and encryption |
| CORS | ^2.8.5 | Cross-origin resource sharing |
| dotenv | ^17.2.3 | Environment variable management |
| Nodemon | ^3.1.11 | Development server with auto-reload |

---

## 🔒 Security Features

- **Password Hashing**: Passwords are hashed using bcryptjs before storage
- **CORS Protection**: CORS is enabled to control cross-origin requests
- **Environment Variables**: Sensitive data stored in .env file (never commit)
- **Input Validation**: Email uniqueness and required field validation
- **Data Sanitization**: Email is automatically lowercased and trimmed

---

## 📝 Usage Examples

### Example: Register a User

```bash
curl -X POST http://localhost:3000/api/v1/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Smith",
    "email": "alice@example.com",
    "password": "securePass123"
  }'
```

### Example: Get All Users

```bash
curl http://localhost:3000/api/v1/
```

---

## 🚧 Development Workflow

1. **Start Development Server:**
   ```bash
   npm run dev
   ```

2. **Make Changes:**
   - Edit files in controllers, models, or routes
   - Server automatically restarts with nodemon

3. **Test Endpoints:**
   - Use cURL, Postman, or Insomnia
   - Test with provided endpoint examples

4. **Commit Changes:**
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```

---

## 📦 Extending the Project

### Adding a New Route

1. Create a controller in `controllers/` directory
2. Define routes in `routes/` directory
3. Import routes in `app.js` and use with `app.use()`

Example:
```javascript
const productRoutes = require('./routes/product.routes');
app.use('/api/v1/products', productRoutes);
```

### Adding a New Model

Create a new file in `models/` directory following the User model structure:

```javascript
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  // ... more fields
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
```

---

## 🐛 Troubleshooting

### MongoDB Connection Failed
- Ensure MongoDB is running locally or MongoDB Atlas credentials are correct
- Check MONGO_URI in .env file
- Verify network connectivity for MongoDB Atlas

### Port Already in Use
```bash
# Find process using the port
lsof -i :3000

# Kill the process
kill -9 <PID>
```

### Module Not Found Error
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Nodemon Not Starting
```bash
# Install nodemon globally (optional)
npm install -g nodemon

# Or use npx
npx nodemon app.js
```

---

## 📚 Resources

- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [bcryptjs Documentation](https://github.com/dcodeIO/bcrypt.js)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

---

## 👤 Author

**Zohaib Hasan**
- GitHub: [@Zohaibhasan904](https://github.com/Zohaibhasan904)

---

## 📄 License

This project is open source and available under the MIT License.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request or open an issue for any improvements or bug fixes.

**Steps to Contribute:**
1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## ⭐ Support

If you find this template helpful, please consider giving it a star on GitHub!

---

**Last Updated:** December 2024
