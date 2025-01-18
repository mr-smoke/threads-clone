# Threads Clone - Fullstack

![Banner](https://i.ibb.co/RP6K7wm/banner.png)

## Table of Contents

- [About The Project](#about-the-project)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## About The Project

Threads Clone is a full-stack social media application inspired by Threads.net, built with React, Node.js, Express.js, MongoDB, Zustand, Socket.io, Tailwind CSS, Shadcn.ui, and Cloudinary. This project offers a seamless platform for users to share posts with images, comment or like on others' posts, and engage in real-time messaging. It includes user authentication and authorization for secure access, and features profile management, allowing users to update their information or temporarily deactivate their accounts. It leverages the power of React for building a dynamic and responsive user interface, MongoDB for reliable and robust data storage, Express.js for handling server-side logic and API endpoints, Zustand for state management, Socket.io for real-time communication, Tailwind CSS for styling and responsive design, Shadcn.ui for pre-designed, customizable components and Cloudinary for uploading images.

### Larger Devices

- Click to play the gif.

<a href="https://i.ibb.co/gdyNSsB/chat-app.gif" target="_blank"><img src="https://i.ibb.co/kJKj4YW/chat-app.gif" alt="blog-app" border="0" /></a>

### Smaller Devices

- Click to play the gif.

<a href="https://i.ibb.co/GMBGfZQ/mobile-chat-app.gif" target="_blank"><img src="https://i.ibb.co/gWHQb0Z/mobile-chat-app.gif" alt="blog-app" border="0" /></a>

### Key Use Cases:

- User authentication and authorization using JWT and cookies.
- Sharing posts and commenting on others'posts with image support using Cloudinary.
- Profile management, including updating user information and account deactivation.
- Following other users, displaying follower and following counts dynamically.
- Real-time messaging with image support using Socket.io.
- Display online users.
- Infinite scroll for posts and messages to enhance performance and user experience.
- State management using Zustand for a predictable and maintainable state.
- Efficient data querying and management with MongoDB.
- Responsive and modern UI designed with Tailwind CSS and Shadcn.ui.
- Server-side rendering with Express.js.
- Managing cross-origin requests with cors, enabling smooth frontend-backend communication.
- Real-time updates.

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/mr-smoke/threads-clone.git
   ```

2. Navigate to the project directory:

   ```bash
   cd threads-clone
   ```

3. Install the [dependencies](#dependencies) for the backend:

   ```bash
   npm install
   ```

4. Set up environment variables:

   - Create a `.env` file in the root directory and add the necessary environment variables.

   ```bash
   MONGO_URI= your_mongodb_connection_string
   JWT_SECRET= your_jwt_key
   CLOUDINARY_CLOUD_NAME= your_cloudinary_name
   CLOUDINARY_API_KEY= your_cloudinary_key
   CLOUDINARY_API_SECRET= your_cloudinary_secret
   PORT= 3000
   ```

5. Start the backend development server:

   ```bash
   npm run dev
   ```

6. Open a new terminal and navigate to the frontend directory in project:

   ```bash
   cd threads-clone/frontend
   ```

7. Install the [dependencies](#dependencies) for the frontend:

   ```bash
   npm install
   ```

8. Start the frontend development server:

   ```bash
   npm run dev
   ```

Now both the backend and frontend servers should be running, and you can use the application.

## Usage

To use the threads clone, follow these steps:

1. Open your browser and navigate to `http://localhost:5173`.
2. Register for a new account or log in with an existing account.
3. Start exploring; create posts, comment on posts, like posts, send message or follow to other users.

### Example Commands

- To add a new post:

  1. Click the "Create Post" button on the sidebar.
  2. Add images or text, then click "Post".

- To add a new conversation:

  1. Click the "Create Post" button on the sidebar.
  2. Add an image and text, then click "Share".

- To manage your profile:

  1. Click the "Profile" button on the sidebar.
  2. Use the dialog options to update your profile or deactivate your account.

## Features

- **Authentication**: Secure login and session management using JSON Web Tokens (JWT). Includes login, logout, and sign up functionality.
- **Content Management**:
- **User Management**:
- **Interaction Users**:
- **Real-time Messaging**: Real-time communication using Socket.io, allowing users to send and receive messages instantly without page reloads.
- **Online Users**: Display online users in real-time, providing visibility into who is currently active and available for chat.
- **Infinite Scroll**: Seamless data loading with infinite scroll for better performance.
- **Database Integration**: MongoDB for flexible and scalable data storage.
- **State Management**: Efficient state management using Zustand, which simplifies the handling of application state and improves performance.
- **Server-side Rendering**: Improved performance and SEO with server-side rendering using Express.js.
- **Error Handling**: Comprehensive error handling and validation to ensure data integrity and provide meaningful feedback to users.
- **Security**: Implemented security best practices, including password hashing, input validation, and secure authentication mechanisms.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Real-time Updates**: Dynamic updates without page reloads.
- **Image Upload**: Upload images for post, comments and messages using Cloudinary.
- **Cors Origin**: Managing cross-origin requests with cors, enabling smooth frontend-backend communication.

## Technologies Used

- [![React][React.js]][React-url]
- [![Express][Express.js]][Express-url]
- [![MongoDB][MongoDB]][Mongo-url]
- [![Node][Node.js]][Node-url]
- [![Socket][Socket.io]][Socket-url]
- [![Zustand][Zustand]][Zustand-url]
- [![Tailwind][Tailwind.css]][Tailwind-url]
- [![Shadcn][Shadcn.ui]][Shadcn-url]
- [![Cloudinary][Cloudinary]][Cloudinary-url]

## Dependencies

### Backend Dependencies

- **bcrypt**: For hashing passwords and ensuring secure authentication.
- **cloduinary**:
- **cookie-parser**: Parse HTTP request cookies.
- **cors**: Enable Cross-Origin Resource Sharing.
- **dotenv**: Load environment variables from a .env file.
- **express**: Web framework for Node.js.
- **jsonwebtoken**: For generating and verifying JSON Web Tokens.
- **mongoose**: MongoDB object modeling tool designed to work in an asynchronous environment.
- **socket.io**: For real-time communication.

### Frontend Dependencies

- **react**: JavaScript library for building user interfaces.
- **react-dom**: Entry point of the DOM-related rendering paths.
- **react-icons**: Include popular icons in your React projects easily.
- **react-router-dom**: DOM bindings for React Router.
- **socket-io-client**: Client library for Socket.io.
- **tailwind-merge**: A utility-first CSS framework for rapid UI development.
- **zustand**: State management library.

## Contributing

Contributions are welcome! To contribute to this project, follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m 'Add some feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more information.

## Contact

For questions or feedback, feel free to reach out:

- Email: [muhammetbakiduman@gmail.com](mailto:muhammetbakiduman@gmail.com)
- LinkedIn: [Baki Duman](https://www.linkedin.com/in/muhammet-baki-duman-019451195/)

---

[React.js]: https://img.shields.io/badge/react-000000?style=for-the-badge&logo=react&logoColor=white
[React-url]: https://react.dev
[Express.js]: https://img.shields.io/badge/express-20232A?style=for-the-badge&logo=express&logoColor=61DAFB
[Express-url]: https://expressjs.com
[MongoDB]: https://img.shields.io/badge/mongodb-000000?style=for-the-badge&logo=mongodb&logoColor=white
[Mongo-url]: https://www.mongodb.com
[Node.js]: https://img.shields.io/badge/nodejs-20232A?style=for-the-badge&logo=nodedotjs&logoColor=61DAFB
[Node-url]: https://nodejs.org/en
[Socket.io]: https://img.shields.io/badge/Socket.io-20232A?style=for-the-badge&logo=Socket.io&logoColor=61DAFB
[Socket-url]: https://socket.io
[Zustand]: https://img.shields.io/badge/Zustand-000000?style=for-the-badge&logo=Zustand&logoColor=white
[Zustand-url]: https://zustand-demo.pmnd.rs
[Tailwind.css]: https://img.shields.io/badge/tailwindcss-20232A?style=for-the-badge&logo=tailwindcss&logoColor=61DAFB
[Tailwind-url]: https://tailwindcss.com
[Shadcn.ui]: https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&logo=shadcn/ui&logoColor=white
[Shadcn-url]: https://ui.shadcn.com
[Cloudinary]: https://img.shields.io/badge/cloudinary-20232A?style=for-the-badge&logo=cloudinary&logoColor=61DAFB
[Cloudinary-url]: https://cloudinary.com
