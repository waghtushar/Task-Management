# Task Management System

## 📝 Overview
The Task Management System is a user-friendly web application designed to help you manage your tasks efficiently. It provides tools to view, create, organize, and filter tasks, ensuring optimal productivity.

## 🌟 Features
- 🔒 **User Authentication**: Secure login and logout functionality.
- ✅ **Task Management**:
  - View assigned tasks.
  - Create new tasks with detailed descriptions.
  - Filter tasks in ascending or descending order and also with title or due date.
  - Modify tasks by name or date.

## 💻 Technologies Used
- **Frontend**:
  - ⚛️ React.js
  - 🎨 Bootstrap 5
- **Routing**:
  - 🛣️ React Router
- **State Management**:
  - 📊 React hooks
- **Backend**:
  - 🟢 Node.js
  - 🍃 MongoDB

## 🛠️ Installation

### Prerequisites
- 🛠️ Node.js (v14 or above)
- 📦 npm or yarn
- 🗄️ MongoDB Database

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/waghtushar/Task-Management
   ```
2. Navigate to the project directory:
   ```bash
   cd Task-Management
   ```
3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
4. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```env
   MONGO_URL=<your-mongodb-connection-string>
   PORT=5000
   JWT_SECRET=<your-jwt-secret>
   SMTP_EMAIL=<your-smtp-email>
   SMTP_PASSWORD=<your-smtp-password>
   ```
5. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

The application will be available at `http://localhost:3000`.


## 🚀 Usage
1. **🔑 Login**:
   - Use your credentials to log in to the system.
2. **📋 View Tasks**:
   - Navigate to the "My Tasks" section to view assigned tasks.
3. **➕ Add Tasks**:
   - Use the "Add New Tasks" section to create new tasks with details.
4. **🔃 Filter Tasks**:
   - Sort tasks in ascending or descending order by name or date.
5. **✏️ Modify Tasks**:
   - Edit existing tasks by updating their all data.
6. **🚪 Logout**:
   - Use the logout button in the sidebar to securely exit the system.


## 🤝 Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.


## 📬 Contact
For any inquiries or support, please contact:
- 📧 Email: waghtushar2005@gmail.com
- 🌐 GitHub: https://github.com/waghtushar/Task-Management

---

Thank you for using the Task Management System! Your productivity is our priority.

