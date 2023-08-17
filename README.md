# Cafe Management System

This is a Node.js application for managing cafes and employees using MongoDB. It provides RESTful API endpoints for creating, updating, retrieving, and deleting cafes and employees.

## Getting Started

1. Clone this repository to your local machine.
2. Install the required dependencies using `npm install`.
3. Create a `.env` file in the root directory and set your MongoDB connection string and port:

   ```env
   PORT=3001
   MONGODB_URI=your-mongodb-connection-string

1. Run the application using `npm start`.

## Seed Data

To populate your MongoDB database with sample data, you can use the provided seed import script.

1. Open the `importSeedData.js` file.
2. Replace the example seed data with your desired cafe and employee data.
3. Run the seed import script using the command:

   ```env
   node importSeedData.js

This will populate your MongoDB database with the provided seed data.

## API Endpoints

*Cafes*

Create a New Cafe
```bash
  POST /cafes
```

Create a new cafe with the following JSON request body:

```json
{
    "name": "Cafe Name",
    "description": "Cafe Description",
    "logo": "Logo URL",
    "location": "Cafe Location"
}
```

Update Cafe Details
```bash
  PUT /cafes/:id
```

Update the details of an existing cafe with the JSON request body:

```json
{
    "name": "Updated Cafe Name",
    "description": "Updated Cafe Description",
    "logo": "Updated Logo URL",
    "location": "Updated Cafe Location"
}
```

Delete a Cafe
```bash
  DELETE /cafes/:id
```

Deletes an existing cafe and its associated employees.


*Employees*

Create a New Employee
```bash
  POST /employees
```

Create a new employee with the following JSON request body:

```json
{
    "name": "Employee Name",
    "email_address": "employee@example.com",
    "phone_number": "98765432",
    "gender": "Male",
    "cafes": [
        {
            "name": "cafe-a",
            "cafeId": "cafe-id-1",
            "start_date": "2023-08-01T00:00:00Z"
        }
    ]
}
```

Update Employee Details
```bash
  PUT /employees/:id
```

Update the details of an existing employee with the JSON request body:

```json
{
   "name": "Updated Employee Name",
    "email_address": "updated-employee@example.com",
    "phone_number": "87654321",
    "gender": "Female",
    "cafes": [
        {
            "name": "cafe-a",
            "cafeId": "updated-cafe-id-1",
            "start_date": "2023-08-05T00:00:00Z"
        }
    ]
}
```

Delete an Employee
```bash
  DELETE /employees/:id
```

Deletes an existing employee.

## Note

1. Replace `your-mongodb-connection-string` in the .env file with your actual MongoDB connection string.
2. For all endpoints requiring an `id`, replace `:id` with the actual ID of the cafe or employee.

## License

[MIT](https://choosealicense.com/licenses/mit/)

