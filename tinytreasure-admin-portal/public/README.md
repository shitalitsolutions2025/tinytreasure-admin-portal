# TinyTreasure Admin Portal

## Overview
The TinyTreasure Admin Portal is a web application designed for managing the TinyTreasure marketplace. This portal allows administrators to change the status of products and donations, ensuring efficient management of the platform.

## Directory Structure
The project is organized into the following main directories:

- **public/**: Contains static files such as HTML and images.
- **src/**: Contains the source code for the application, including components, API interactions, and routing.

## Setup Instructions
To set up the TinyTreasure Admin Portal locally, follow these steps:

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd tinytreasure-admin-portal
   ```

2. **Install Dependencies**
   Make sure you have Node.js installed. Then run:
   ```bash
   npm install
   ```

3. **Run the Application**
   Start the development server:
   ```bash
   npm start
   ```

4. **Access the Application**
   Open your browser and navigate to `http://localhost:3000` to view the application.

## Features
- **User Authentication**: Secure login module to restrict access to authorized users.
- **Product Status Management**: Interface for changing the status of products using the `changeProductStatus` API.
- **Donation Status Management**: Interface for managing donation product statuses using the `changeDonationProductStatus` API.
- **Protected Routes**: Certain routes are protected and require authentication to access.

## API Integration
The application integrates with the following APIs:
- `changeProductStatus`: Updates the status of a product in the marketplace.
- `changeDonationProductStatus`: Updates the status of a donation product.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request for any changes or improvements.

## License
This project is licensed under the MIT License. See the LICENSE file for details.