# **CourseHub** 

**CourseHub** is a dynamic application designed for seamless course subscription management. It enables learners to browse available courses, subscribe/unsubscribe with a single click, and manage personalized course lists. Initially built with the ServiceNow platform, the app is now transitioning to a Node.js backend for enhanced functionality and scalability.

---
## Screenshots:

### Desktop View:
<div style="display: flex; gap: 10px;">
  <img src="https://github.com/user-attachments/assets/e1795b6f-4c0b-4426-9869-57619bc795f6" alt="Landing Page" width="300">
  <img src="https://github.com/user-attachments/assets/0963a029-9a92-457d-bc1e-dd690e81bcec" alt="Logged User" width="300">
  <img src="https://github.com/user-attachments/assets/e8c0bc55-31bd-4e71-aa3e-d0b2fecd8ba1" alt="Analytics" width="300">
</div>

### Mobile View:
<div style="display: flex; gap: 10px;">
  <img src="https://github.com/user-attachments/assets/1ba243a9-b770-4f14-82f1-ee479da672b2" alt="Mobile Landing Page" width="150">
  <img src="https://github.com/user-attachments/assets/38ddcb74-4c20-4b74-bb24-f05a86bdd47e" alt="Mobile Logged User" width="150">
</div>



---

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)


   
<a name="features"></a>
### Features
- **Browse Available Courses:**: Users can explore a catalog of courses, each containing essential details like title, description, type, and duration.
- **User Authentication**: Role-based authentication, ensuring that admin can manage courses, and users can only view their own subscriptions.
- **Subscribe/Unsubscribe:**: Logged-in users can easily subscribe to courses or remove them from their course cart with a single click.
- **Personalized Course Management**: Subscribed courses are displayed in the user's cart, making it easy to track and manage their learning.
- **Filtered Courses**: All users (logged-in or guest) can filter existing courses by type (online, offline, or hybrid).
- **Search Courses** - All users (logged-in or guest) can search for courses using the search bar.
- **Responsive Design**: The application is fully responsive, ensuring an optimal user experience across various devices, including desktops, tablets, and mobile phones.



<a name="technologies"></a>
### Technologies
CourseHub uses a modern tech stack to provide a responsive and efficient experience for both learners and admin:
- Frontend:
  - React.js
  - Material UI (MUI)
  - Axios for API calls
  - Vite for fast development and bundling
- Backend:
  - Node.js with Express
  - MongoDB (using Mongoose for ORM)
  - JWT-based authentication for secure user login
  - Nodemon for hot reloading during development
- Deployment:
  - Docker for containerization
  - Docker Compose for multi-container setups
  - GitHub Actions for Continuous Integration/Continuous Deployment (CI/CD)



<a name="installation"></a>
### Installation
To get started with CourseHub, follow these steps to set up the development environment:

#### 1. Prerequisites
- Node.js (>= 18.0.0)
- MongoDB (or a cloud service like MongoDB Atlas)
- Docker and Docker Compose (optional, for containerization)

#### 2. Steps
1. Clone the repository:
   
       # Clone repository
         git clone https://github.com/JoeClos/coursehub.git 
      
2. Install Dependencies:
   
       # cd coursehub
      
       # Install all dependencies simultaneously for the front-end, back-end, and root
         npm install

   
4. Set up environment variables:
   - Backend (backend/.env):

         MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority
         JWT_SECRET=your_jwt_secret_key
         PORT=5000

   - Frontend (course-subscription-app/.env)::
     
         VITE_API_BASE_URL=http://localhost:5000
     
5. (Optional) Use Docker:
   If you want to use Docker, run the following command:
   
       docker-compose --env-file ./backend/.env up --build
    This will build the Docker images and run the app.
   
6. Start the development servers:
   To start the application locally:
   
       npm run start
   
    - Frontend: http://localhost:5173
    - Backend: http://localhost:5000.

<a name="usage"></a>
### Usage 
Once the application is running locally, you can perform the following actions:
 1. *Browse Courses*: The home page allows you to view a list of courses.
 2. *Subscribe/Unsubscribe*: Logged-in users can subscribe to or unsubscribe from courses using the "Subscribe" or "Unsubscribe" button.
 3. *View Subscribed Courses*: The cart page displays a personalized list of subscribed courses.
 4. *Register*: Users can register to subscribe to courses. Guests can still browse and search for courses without registration.

#### Admin Features (WIP)
 - Admin can log in to manage courses (create, update, delete).
 - Admin can view and manage all users and their subscriptions.

## Closing Notes
CourseHub aims to redefine the course subscription experience by providing an intuitive platform for learners and administrators alike. Whether you're a learner exploring new opportunities or an admin managing the platform, CourseHub is built with your needs in mind.

I am excited to continue evolving this application, integrating user feedback, and adding innovative features to make learning accessible to everyone.

Thank you for checking out CourseHub! 🚀


