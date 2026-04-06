# Finance Data Processing and Access Control Backend

## Overview

This project is a backend system for a finance dashboard where users can manage financial records based on their roles. The main idea was to design a clean and structured backend that handles data properly, enforces access control, and provides useful insights through aggregation APIs.

Instead of just building basic CRUD APIs, the focus was on designing the system in a way that reflects real-world backend thinking — including role-based access, data integrity, and efficient data processing.

---

## Tech Stack

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication

---

## Architecture

I designed this as a **modular monolith**.

The application is structured into modules like:

* Auth
* User
* Record
* Dashboard

Each module follows a clear separation:

* Routes → define endpoints
* Controllers → handle request/response
* Services → contain business logic
* Models → define schema

This keeps the code organized and makes it easier to scale or refactor later if needed.

---

## Features

### 1. Authentication & User Management

* User registration and login using JWT
* Roles supported:

  * Viewer
  * Analyst
  * Admin
* Admin can:

  * View all users
  * Update roles
  * Activate / deactivate users
* Users have an `isActive` flag instead of being deleted

---

### 2. Role-Based Access Control (RBAC)

Access is enforced using middleware.

* Viewer → can only access dashboard summary
* Analyst → can view records and analytics
* Admin → full access (users + records)

This is handled centrally using a reusable role middleware, instead of checking roles inside controllers.

---

### 3. Financial Records Management

* Create, update, delete records (Admin only)
* View records (Analyst + Admin)
* Each record includes:

  * amount
  * type (income / expense)
  * category
  * date
  * notes
  * createdBy / updatedBy

---

### 4. Filtering & Pagination

Records can be filtered using:

* type
* category
* date range

Example:

```
/api/records?type=expense&category=food&startDate=2025-04-01
```

Pagination is also supported:

```
/api/records?page=1&limit=10
```

---

### 5. Soft Delete

Records are not permanently deleted.

Instead:

* `isDeleted = true`

This helps maintain data integrity and reflects real-world financial systems.

---

### 6. Dashboard APIs (Aggregation)

This was a key part of the project.

Implemented using MongoDB aggregation pipelines:

* Total Income
* Total Expense
* Net Balance
* Category-wise totals
* Monthly trends
* Recent transactions

All calculations are done at the database level for efficiency.

---
---
7. Rate Limiting

To improve security and prevent abuse, rate limiting is implemented on the API.

General rate limiting is applied to all APIs to control excessive requests
Stricter limits are applied on authentication endpoints (login/register) to prevent brute-force attacks
Helps protect the server from spam and unnecessary load
---

## API Endpoints (Main)

### Auth

* POST `/api/auth/register`
* POST `/api/auth/login`

### Users (Admin)

* GET `/api/users`
* PATCH `/api/users/:id/role`
* PATCH `/api/users/:id/status`

### Records

* POST `/api/records`
* GET `/api/records`
* PUT `/api/records/:id`
* DELETE `/api/records/:id`

### Dashboard

* GET `/api/dashboard/summary`
* GET `/api/dashboard/categories`
* GET `/api/dashboard/trends`
* GET `/api/dashboard/recent`

---

## Validation & Error Handling

* Basic input validation is implemented (amount, type, date, etc.)
* Proper HTTP status codes are used:

  * 400 → bad request
  * 401 → unauthorized
  * 403 → forbidden
  * 404 → not found
* Centralized error handling middleware is used

---

## Data Modeling Decisions

* Used MongoDB for flexibility and aggregation support
* Records linked to users using `createdBy`
* Enums used for `type` and `role`
* Soft delete used instead of hard delete

---

## Assumptions

* Only admins can modify financial records
* Analysts and viewers cannot create or update data
* Authentication is handled using JWT
* No external integrations or file uploads are included
* Categories are stored as simple strings (not separate collection)

---

## Setup Instructions

```bash
npm install
npm run dev
```

Make sure to add a `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

---

## Final Thoughts

While building this, I focused more on **how the backend should behave in real usage**, rather than just implementing features.

Key focus areas:

* Clean structure
* Role-based access control
* Proper data handling
* Aggregation for analytics

There’s definitely scope to extend this further (pagination improvements, API docs, testing), but the current implementation covers the core backend design and logic clearly.
