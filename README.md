# Status and CRUD Web Application

## Overview

This project is a full-stack web application that displays a set of status values and provides CRUD (Create, Read, Update, Delete) functionality for a dataset. The project demonstrates the use of React.js, Material-UI, and TypeScript for the frontend and Node.js, Express, and TypeScript for the backend.

---

## Features

### Status Page

- Displays a set of **37 status values** (`pass`, `warn`, `fail`) with a unique ID.
- Provides a color-coded table for an "at-a-glance" view:
  - **Green** for `pass`.
  - **Orange** for `warn`.
  - **Red** for `fail`.

### CRUD Operations Page

- Allows managing a dataset with the following functionalities:
  - **Read/Index**: View all records in a table.
  - **Search**: Filter records based on field values.
  - **Create**: Add a new record (ensuring unique `name`).
  - **Update/Edit**: Edit an existing record.
  - **Delete**: Remove a record.
  - **Copy/Edit**: Duplicate a record and modify it.
- **Optional Feature**: Compare two records and highlight field differences.

---

## Technology Stack

### Frontend

- **Framework**: React.js
- **Styling**: Material-UI
- **Language**: TypeScript
- **Routing**: React Router DOM
- **API Calls**: Axios

### Backend

- **Framework**: Node.js with Express.js
- **Language**: TypeScript
- **Data Storage**: JSON files

---

## Prerequisites

- **Node.js** (v14+)
- **npm** (v6+) or **yarn**
- A web browser (e.g., Chrome, Firefox)

---

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. The backend will run at **http://locahost:3001**.

### Backend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. The frontend will run at **http://localhost:3000**.

---

## Usage

### Accessing the Application

1. Status Page:
   - Visit **http://localhost:3000/** to view the list of 37 status values.
2. CRUD Data Page:
   - Visit **http://localhost:3000/data** to manage the dataset.

### API Endpoints

- GET **/status**: Retrieve the list of status values.
- GET **/data**: Retrieve all data records.
- POST **/data**: Create a new record.
- PUT **/data/:id**: Update an existing record.
- DELETE **/data/:id**: Delete a record.

---

## File Structure

### Backend

```bash
backend/
├── src/
│   ├── controllers/       # Business logic
│   ├── models/            # Data models
│   ├── routes/            # API endpoints
│   ├── data/              # JSON data files
│   ├── app.ts             # Application setup
│   └── server.ts          # Server entry point
├── tsconfig.json          # TypeScript configuration
├── package.json           # Dependencies and scripts
└── .gitignore             # Ignored files and folders
```

### Frontend

```bash
frontend/
├── src/
│   ├── components/        # Reusable components
│   ├── pages/             # Page-level components
│   ├── services/          # API calls
│   ├── App.tsx            # Main app component
│   ├── index.tsx          # Entry point
│   └── index.css          # Global styles
├── tsconfig.json          # TypeScript configuration
├── package.json           # Dependencies and scripts
└── .gitignore             # Ignored files and folders
```
