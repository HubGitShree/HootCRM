# HootCRM

HootCRM is a feature-rich Customer Relationship Management (CRM) system built to streamline customer interactions and sales processes. Designed with simplicity and scalability in mind, HootCRM is ideal for businesses looking to efficiently manage leads, track sales, and improve customer satisfaction.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **User Management**:
  - Role-based access control (Admin and Sales).
  - Secure authentication using JWT.

- **Lead Management**:
  - Create, view, update, and delete leads.
  - Assign leads to specific sales representatives.

- **Sales Pipeline**:
  - Kanban-style drag-and-drop visualization for tracking lead status.
  - Real-time updates on lead progress.

- **Customer Management**:
  - Maintain customer profiles and interaction histories.

- **Task Management**:
  - Track tasks and goals for sales teams.
  - Monitor task completion and deadlines.

- **Analytics and Reports**:
  - Interactive charts and reports for sales insights.
  - Exportable data for business intelligence.

---

## Tech Stack

### Backend:
- **Spring Boot**: Framework for RESTful APIs and application logic.
- **Spring Security**: Authentication and authorization.
- **SQL Server**: Database for managing CRM data.

### Frontend:
- **Angular 18**: Framework for building dynamic user interfaces.
- **Angular Material**: UI components for a clean and responsive design.
- **ng2-charts**: Charting library for data visualization.

---

## Installation

### Prerequisites

- **Java 17+** installed on your system.
- **Node.js (v18+)** and npm installed.
- **SQL Server** configured and running.

### Steps

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/HubGitShree/HootCRM.git
   cd HootCRM
   ```

2. **Backend Setup:**
   - Navigate to the backend folder:
     ```bash
     cd backend
     ```
   - Update `application.properties` or `application.yml` with your SQL Server credentials.
   - Build and run the Spring Boot application:
     ```bash
     ./mvnw spring-boot:run
     ```

3. **Frontend Setup:**
   - Navigate to the frontend folder:
     ```bash
     cd frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the Angular development server:
     ```bash
     ng serve
     ```

4. **Access the Application:**
   - Frontend: `http://localhost:4200`
   - Backend API: `http://localhost:8091`

---

## Usage

### Login
- Admin can create users, assign roles, and manage the system.
- Sales users can access assigned leads and tasks.

### Lead Management
1. Navigate to the "Leads" section.
2. Create a new lead by filling out the form.
3. Assign leads to a specific salesperson.

### Sales Pipeline
- Use the Kanban board to track lead progress.
- Drag and drop leads between stages (e.g., New, In Progress, Closed).

### Analytics
- View real-time charts and reports under the "Analytics" tab.

---

## Project Structure

### Backend (`/backend`):
- **com.hootcrm**
  - `controllers`: REST API endpoints.
  - `services`: Business logic.
  - `repositories`: Database interactions.
  - `entities`: JPA entities for database tables.
  - `config`: Security and application configurations.

### Frontend (`/frontend`):
- **src/app**:
  - `components`: UI components for different pages.
  - `services`: Angular services for API calls.
  - `models`: TypeScript interfaces for data.
  - `routes`: Application routing.

---

## API Documentation

### Authentication
- **POST** `/api/auth/login`
  - Request: `{ "username": "", "password": "" }`
  - Response: JWT token.

### Users
- **GET** `/api/users`
  - Fetch all users.
- **POST** `/api/users`
  - Create a new user.

### Leads
- **GET** `/api/leads`
  - Fetch all leads.
- **POST** `/api/leads`
  - Create a new lead.

### Sales Pipeline
- **GET** `/api/pipeline`
  - Fetch pipeline data.
- **PUT** `/api/pipeline`
  - Update lead stage.

---

## Contributing

We welcome contributions! To contribute:

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature
   ```
5. Create a pull request.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Contact

For queries or support, reach out to the repository owner via [GitHub Issues](https://github.com/HubGitShree/HootCRM/issues).
