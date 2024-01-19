# Code Sync - A Realtime Code Editor

![screenshot](./screenshots/screenshot.png)

![Visitors](https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Fgithub.com%2Fsahilatahar%2FCode-Sync&label=Repo%20Views&countColor=%2337d67a&labelStyle=upper)

[![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)]()
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)]()
[![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)]()
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)]()
[![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)]()
[![ExpressJS](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)]()
[![Git](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white)]()
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)]()

Code Sync is a collaborative, real-time code editor where users can seamlessly code together. It provides a platform for multiple users to enter a room, share a unique room ID, and collaborate on code simultaneously.

## 🔮 Features
- Real-time collaboration on code editing
- Unique room generation with room ID for collaboration
- Syntax highlighting
- Instant updates and synchronization of code changes
- Notifications for user join and leave events

## 💻 Tech Stack
### 🖥️ Frontend
- **React JS:** A JavaScript library for building user interfaces, facilitating the creation of dynamic and efficient web applications.
- **React Router:** Enables navigation and routing in React applications, managing the UI based on the URL.
- **Tailwind CSS:** A utility-first CSS framework that streamlines the styling process with pre-defined classes.
- **Vite:** A build tool for modern web development, providing faster development and better performance.
- **PropTypes:** Runtime type checking for React props, helping to catch bugs early in development.
- **UUID:** Generates unique identifiers, useful for key assignments in databases or component instances.
- **Socket.io-client:** Implements real-time communication between the client and server using WebSockets.
- **React-hot-toast:** A React library for creating customizable and responsive toast notifications.
- **React-avatar:** Simplifies the display of avatars or profile pictures in React applications.
- **CodeMirror:** A versatile text editor implemented in JavaScript for embedding in web applications.

### 🌐 Backend
- **Node.js:** A server-side JavaScript runtime, allowing the execution of JavaScript code outside the browser.
- **Express:** A web application framework for Node.js, simplifying the creation of robust and scalable APIs.
- **Socket.io:** Facilitates real-time bidirectional communication between clients and servers using WebSockets.
- **Dotenv:** Loads environment variables from a .env file, enhancing the configuration of Node.js applications.
- **CORS:** Stands for Cross-Origin Resource Sharing, a mechanism that permits or restricts web page access to resources on another domain.


## 📂 Folder Structure
```
client/
├── public/
│      └──style.css
├── src/
│   ├── actions/
│   │   └── Actions.js
│   ├── assets/
│   ├── components/
│   │   ├── EditorPage/
│   │   │   ├── Client.jsx
│   │   │   ├── Editor.jsx
│   │   │   ├── MenuButton.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── Home/
│   │   │   ├── Footer.jsx
│   │   │   └── FormComponent.jsx
│   │   └── Loading.jsx
│   ├── context/
│   │   └── ContextProvider.jsx
│   ├── hooks/
│   │   └── useSocket.js
│   ├── layouts/
│   │   └── EditorLayout.jsx
│   ├── pages/
│   │   ├── EditorPage.jsx
│   │   └── Home.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   └── socket.js
├── .env
├── .eslintrc.cjs
├── .gitignore
├── index.html
├── package-lock.json
├── package.json
├── tailwind.config.js
└── vite.config.js

server/
├── actions/
│   └── Actions.js
├── .gitignore
├── Actions.js
├── package-lock.json
├── package.json
└── server.js

README.md
```

## ⚙️ Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/sahilatahar/Code-Sync.git
   ```
2. **Set .env file:**
    Inside the client and server directory, create or edit the .env file and add the following line:  
    Frontend:
    ```bash
    VITE_BACKEND_URL=<your_server_url>
    ```
    Backend:
    ```bash
    PORT=3000
    ```

1. **Install dependencies:**
    Navigate to the frontend and backend directories separately and run:
   ```bash
    npm install
   ```
2. **Start the frontend and backend servers:**  
    Frontend:
    ```bash
    cd client
    npm run dev
    ```
    Backend:  
    ```bash
    cd server
    npm run dev
    ```
3. **Access the application:**
   Open a browser and enter the following URL:
   ```bash
   http://localhost:5173/
   ```

## 🔮 Features for next release
- Implementation of syntax highlighting across various programming languages 
- Multiple themes for editor

## 🤝 Contribute

We welcome contributions to make Code Sync even better! Whether you're reporting a bug, suggesting a new feature, or fixing a typo, your input is valuable to us. Follow the [contribution guidelines](CONTRIBUTING.md) to get started.

## 🧾 License
This project is licensed under the [MIT License](LICENSE).

## ✍️ About Developer
- Sahil Atahar (Aspiring Full Stack Developer)    
[![GitHub](https://img.shields.io/badge/GitHub-100000.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/sahilatahar)
[![LinkedIn-social](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/sahilatahar)