# **CourseHub** 

**CourseHub** is a dynamic application designed for seamless course subscription management. It enables learners to browse available courses, subscribe/unsubscribe with a single click, and manage personalized course lists. Initially built with the ServiceNow platform, the app is now transitioning to a Node.js backend for enhanced functionality and scalability.

## Table of Contents

1. [Features](#features)
2. [Technologies](#technologies)
3. [Installation](#installation)
4. [Usage](#usage)

---
   
<a name="features"></a>
## Features
- **Browse Available Courses:**: Users can explore a catalog of courses, each containing essential details like title, description, type, and duration.
- **User Authentication**: Role-based authentication, ensuring that admins can manage courses, and learners can only view their own subscriptions.
- **Subscribe/Unsubscribe:**: With a simple click, loged in users can subscribe to courses and remove them from their course cart when needed.
- **Personalized Course Management**: Subscribed courses are displayed in the user's cart, making it easy to track and manage their learning.
- **Filtered Courses**: All users can easily filter the existing courses by type: online, offline or hybrid.
- **Search Courses** - All users (loged/unloged) can search courses.

---

<a name="technologies"></a>
## Technologies
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
  - Nodemon
- Deployment:
  - Docker for containerization
  - Docker Compose for multi-container setups
  - GitHub Actions for Continuous Integration/Continuous Deployment (CI/CD)

---

<a name="installation"></a>
## Installation

     

