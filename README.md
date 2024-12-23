
# Intern Management Backend

## I. Overview

 This repository contains the backend server for the internship management system. It is built with Express.js and uses MongoDB for data storage. The server provides API's for managing internship applications, projects, and intern details.

## II. Features

- Database: MongoDB
- Email Notification: nodemailer
- Authentication: JWT

## III. Folder Structure

1. ***config/***: Contains configuration files for services.
   - ***db.js***: Manages MongoDB connection.

2. ***controllers/***: Contains the logic for handling requests and responses.
    - ***authController.js***: Handles user login and authentication.
    - ***internController.js***: Manages intern details and status updates.
    - ***projectController.js***: Manages projects and project categories (departments).
3. ***middleware/***: Contains middleware functions for authentication and authorization.
    - ***authMiddleware.js***: Middleware to protect routes and check permissions.

4. ***models/***: Contains Mongoose schemas and models for MongoDB collections.
    - ***Intern.js***: Schema for intern details.
    - ***InternshipProject.js***: Schema for internship projects.
    - ***Department.js***: Schema for project departments.
    - ***Admin.js***: Schema for admin users.

5. ***routes/***: Defines the endpoints and routes for your API.
    - ***authRoutes.js***: Routes related to authentication (login, register).
    - ***internRoutes.js***: Routes for intern management (view, update intern info).
    - ***projectRoutes.js***: Routes for managing projects and categories (departments).
1. ***services/***: Contains services for external functionalities.
    - ***emailService.js***: Handles sending emails.

1. ***utils/***: Utility functions and constants.
    - ***validators.js***: Contains validation logic for request data.
    - ***constants.js***: Contains application-wide constants.

2. ***app.js***: Main application setup, route mounting, server configuration and initialization.

3. ***.env***: Port number, environment variables such as database URI and email credentials.

## IV. API Endpoints

### 1. Intern Pages

### 2. Admin Pages

> Auth

- ***Login***: POST /api/auth/admin/login.

> Projects

- ***All Projects***: GET /api/admin/projects
- ***Add Project***: POST /api/admin/projects
- ***Update Project***: PUT /api/admin/projects/{projectId}
- ***Delete Project***: DELETE /api/admin/projects/{projectId}
- ***Project Categories (Departments)***:
- ***Get Categories***: GET /api/admin/projects/departments
- ***Add Category***: POST /api/admin/projects/departments
- ***Update Category***: PUT /api/admin/projects/departments/{departmentId}
- ***Delete Category***: DELETE /api/admin/projects/departments/{departmentId}

> Requests

- ***Get All Pending Requests***: GET /api/admin/interns/pending
- ***Reject/Approve Request***: PUT /api/admin/interns/{internId}/status

> Accepted and Scheduled Interviews

- ***Accepted and Scheduled Requests/Interviews***:
- ***Endpoint***: GET /api/admin/interns/scheduled

> Manage Interns

- ***Ongoing Interns***: GET /api/admin/interns/ongoing
- ***Get rejected interns***: GET /api/admin/interns/rejected
- ***Completed Internships***: GET /api/admin/interns/completed
- ***Update Intern Status***: PUT /api/admin/interns/{internId}/status

## SETUP
 To setup project after to run ***npm install*** command, create file ***nodemon.json*** And asks the owner for the content to be inserted in the file #   s m a r t - l o g - a p i  
 