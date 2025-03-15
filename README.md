# BMS - Book Management System

BMS (Book Management System) is a microservice-based application built using NestJS. It provides authentication, book management, and borrowing/returning functionalities. The system is designed with a TCP-based API Gateway to handle communication between services.

# Postman Collection
[Postman Collection](https://www.postman.com/arts-engineers/workspace/assignment/collection/23156241-b81b0493-7eb0-412a-9c6f-b99b18afbb01?action=share&creator=23156241)


## Project Architecture

The application consists of the following services:

### 1. **Auth Service** (Port: 3001)
Manages user authentication and roles.

#### Endpoints:
- `POST /auth/signup` - User signup
- `POST /auth/signin` - User login
- `DELETE /auth` - Delete user
- `PATCH /auth/change-role` - Update user to admin role

### 2. **Books Service** (Port: 4001)
Handles book-related operations.

#### Endpoints:
- `POST /books` - Add a new book
- `POST /books/{BOOKID}` - Update the book by Book ID
- `GET /books/list` - Retrieve all books
- `GET /books` - Search books by type and author (Query params: `type`, `author`)
- `DELETE /books/{BOOKID}` - Delete a book by Book ID

### 3. **Borrow-Return Service** (Port: 5001)
Manages book borrowing and returning.

#### Endpoints:
- `POST /borrow` - Borrow a book
- `PATCH /return/{BOOKID}` - Return a borrowed book
- `GET /books-borrowed` - Get most frequently borrowed books
- `GET /borrow/most-borrowed` - Get books borrowed by a specific user

### 4. **API Gateway** (Port: 7001)
Acts as a central entry point for all services and uses TCP connections for communication.

#### Connected Services:
- Auth Service
- Books Service
- Borrow-Return Service

## Installation & Setup


### Steps to Run Locally:

1. Clone the repository:
   ```sh
   git clone https://github.com/vraj-verma/books-management-system.git
   cd books-management-system
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start each service:
   ```sh
   npm run start:all
   ```

4. Access API Gateway at: `http://localhost:7001/api/v1`


