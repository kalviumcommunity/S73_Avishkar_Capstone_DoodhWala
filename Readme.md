# DOODHWALA WEB APPLICATION

## Project: DOODHWALA 🥛

### Problem Statement:

- Buyers struggle to find fresh, unadulterated milk in their locality.
- Local milkmen lack digital platforms to manage their customers, orders, and payments.

### Solution:

- A web and mobile-friendly app that connects milk buyers and sellers.
- Buyers can search for milkmen nearby, place daily or subscription-based orders, and pay online or via cash.
- Milkmen can list their products, set prices, manage deliveries, and track payments.

### Key Features & Technical Implementation (MERN Stack)

1. User Authentication (JWT + Google OAuth)

- Buyers & milkmen register and log in using email/password or Google.

2. Role-Based Dashboard

- Buyers: Browse local milkmen, check milk availability, place orders, and track subscriptions.
- Milkmen: Manage product listings, order requests, and deliveries.

3. Search & Location-Based Service (Google Maps Linking)

- Buyers find nearby milkmen based on their current location.
- Milkmen set delivery radius to get orders only from nearby buyers.

4. Order Management System (CRUD Operations)

- Place, update, cancel orders with real-time status updates.
- Buyers choose between one-time orders or daily subscriptions.
- Milkmen accept/reject orders and update delivery status.

5. Payment Gateway Integration (Razorpay/Stripe)

- Buyers can prepay or opt for cash on delivery.
- Milkmen track earnings via dashboard.

6. Notifications & Alerts (WebSockets / Firebase)

- Buyers get alerts for order confirmation, milk delivery, and payment reminders.
- Milkmen get order notifications and reminders.

7. Subscription Model (Scheduled Jobs + Database) (Optional)

- Users can set recurring orders (daily/weekly).
- System automatically generates orders for subscriptions.

8. Review & Ratings System

- Buyers can rate and review milkmen.
- Helps in building trust & credibility.

9. File Upload (For Milkmen Profile)

- Milkmen upload business verification documents & profile photo ( farm, milk pictures etc.).

### Tools & Tech Stack

- Backend: Node.js, Express.js, MongoDB, Mongoose
- Frontend: React.js, Tailwind CSS
- Authentication: JWT, Google OAuth
- Payment Gateway: Razorpay / Stripe
- Notifications: Firebase / WebSockets
- Testing: Jest / Postman
- Deployment: Vercel (Frontend), Render (Backend)

# CURRENT PROGRESS

## Setting up a Github project - branch: GithubSetup

- Github setup completed successfully

## Deploying Backend Server - branch: DeployBackend

- Deployed Backend using Mongo Atlas

## DB Schema created - branch: DBschema

- Created the database Schema named user.js

## Initialized a react/frontend application - branch: initReact

- Initialized a React frontend application, setting up the project structure and essential configurations.

## GET API used - branch: GETapi

- GET API has been implemented to access user details for the Profile


## POST API used - branch: POSTapi

- POST API has been implemented to fetch the signup and login data from the request body, also I did implement the Login and Signup functionality
  in backend as well as frontend.

## Database Read and Write Performed - branch: dbReadWrite

- Implemented database read and write functionality by connecting the server to the database (adding user in database and fetching data from backend for the profile) and making API calls for data operations

## Created frontend components in react - branch: CreateComp

- Created three components Navbar.jsx, Login.jsx and Signup.jsx

## Implemented authentication (username / password) in application - branch: LoginAuth

- Implemented authentication logic for the loggin in of user (authController.js)

## Implemented Navbar Frontend (UI) - branch: Navbar
- Implemented the Navbar frontend components for both milkman and customer and implemented role based navbar rendering.
  
# PLAN

## 📌 Week 1: Project Setup & Authentication

🔹 Goal: Set up the project, environment, authentication, and user roles.

### Day 1: Project Initialization

Create a GitHub repository for the project.
Initialize MERN Stack:
frontend/ → React + Vite.
backend/ → Node.js + Express.
Set up ESLint, Prettier, Husky for code formatting.
Install required dependencies (cors, dotenv, etc.).
Push initial commit to GitHub.

### Day 2: Database Schema & Models

Define MongoDB schema using Mongoose:
User Model (Buyer/Milkman)
Milk Listings Model
Orders Model
Payments Model
Create .env file for storing API keys (MongoDB, JWT Secret).
Connect MongoDB Atlas with Express.js backend.

### Day 3: Backend Authentication (JWT)

Implement User Registration API (/api/auth/register).
Implement User Login API (/api/auth/login).
Encrypt passwords using bcrypt.js.
Generate JWT tokens for authentication.
Middleware to protect routes (authMiddleware.js).
Test APIs using Postman.

### Day 4: Frontend Authentication (Login/Signup UI)

Set up React Router (react-router-dom).
Create Login & Signup pages with form validation.
Use Axios to send API requests to the backend.
Store JWT in localStorage upon login.
Implement Logout functionality.

### Day 5: Google OAuth Integration

Set up Google OAuth in the backend (passport.js or Firebase Auth).
Implement Google login in the frontend.
Test authentication using Google login.

### Day 6: Role-Based Routing

Different dashboards for Buyers and Milkmen.
Implement PrivateRoute in React for authentication.
If logged in:
Buyers → Redirect to Buyer Dashboard.
Milkmen → Redirect to Milkman Dashboard.

### Day 7: Testing & Debugging

Test authentication flows (manual + Postman).
Fix CORS issues, JWT expiration, and frontend bugs.
Document API responses in Postman Collection.

## 📌 Week 2: User Profiles & Listings

🔹 Goal: Allow users to update profiles & milkmen to list products.

### Day 8: User Profile API

Create /api/users/profile endpoint.
Allow users to update name, phone, address.
Implement file upload for profile pictures using Cloudinary.

### Day 9: User Profile Page (Frontend)

Display user details from API.
Implement profile update form.
Allow users to upload profile pictures.

### Day 10: Milk Listings API (Backend)

Create /api/milk/add endpoint for milkmen.
Implement CRUD operations:
Add new listing (POST /api/milk/add).
Update listing (PUT /api/milk/update/:id).
Delete listing (DELETE /api/milk/delete/:id).
Get all listings (GET /api/milk/all).
Day 11: Milk Listings UI (Frontend)
Implement Milk Listings Page for buyers.
Allow milkmen to add/update/delete listings.
Show milk details (price, availability).

### Day 12: Search & Filtering

Integrate Google Maps API for geolocation.
Implement search by location for buyers.
Add filters: price, distance, ratings.

### Day 13: Testing & Debugging

Test profile update and milk listing APIs.
Fix frontend UI bugs.
Improve responsive design.

### Day 14: Final Testing & Deployment

Deploy backend on Render.
Deploy frontend on Vercel.
Document APIs & push to GitHub.

## 📌 Week 3: Order Management

🔹 Goal: Implement order placement & management.

### Day 15: Order API (Backend)

Create /api/orders/place endpoint.
Implement order status tracking (Pending, Delivered, Canceled).
Allow buyers to place orders.

### Day 16: Order Page (Frontend)

Implement Order History Page for buyers.
Allow buyers to view past orders.

### Day 17: Order Management (Milkman)

Create Milkman Dashboard to view incoming orders.
Milkmen can accept/reject orders.

### Day 18: Order Updates & Status

Implement order updates in backend.
Milkmen can change order status (e.g., "Delivered").
Buyers can track order status.

### Day 19: Subscription Model (Backend)

Implement /api/subscriptions for recurring orders.
Use Node-cron to generate orders automatically.

### Day 20: Subscription UI (Frontend)

Allow buyers to subscribe for daily/weekly milk delivery.
Show active subscriptions.

### Day 21: Testing & Debugging

Test order and subscription flows.
Fix backend issues & UI bugs.

## 📌 Week 4: Payments & Reviews

🔹 Goal: Implement payments & ratings.

### Day 22: Payment Gateway Setup

Integrate Razorpay/Stripe for payments.
Implement test transactions.

### Day 23: Payment API (Backend)

Create /api/payments/pay for order payments.
Allow users to view payment history.

### Day 24: Payment UI (Frontend)

Implement Payment Page with Razorpay.
Show payment history in dashboard.

### Day 25: Reviews & Ratings API

Allow buyers to rate & review milkmen.
Implement /api/reviews/add API.

### Day 26: Reviews UI

Display ratings & reviews on milkman profiles.
Allow buyers to submit reviews.

### Day 27: Testing & Fixing Bugs

Test payment flow.
Fix edge cases (failed payments, refund issues).

### Day 28: Final Deployment

Deploy updated backend & frontend.

## 📌 Weeks 5-9: Refinements, Testing & Deployment

🔹 Goal: Polish the app, test it, and deploy fully.

### Week 5: Notifications & Real-Time Updates

Implement WebSockets for order updates.
Send email/SMS notifications for orders.

### Week 6: Security & Performance

Add rate limiting & JWT expiration handling.
Optimize database queries.

### Week 7: Advanced Features & UI Enhancements

Improve UI/UX.
Add dark mode.

### Week 8: Testing & Bug Fixes

Conduct unit & integration tests.
Fix any remaining issues.

### Week 9: Final Deployment & Presentation

Deploy final version.
Create demo video for capstone project submission.
