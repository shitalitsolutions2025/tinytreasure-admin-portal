# TinyTreasure Admin Portal

## Overview
TinyTreasure Admin Portal is a web application designed for managing the TinyTreasure marketplace. This portal allows administrators to change the status of products and donation items, ensuring efficient management of the marketplace.

## Features
- User authentication with a login module.
- Manage product statuses using the `changeProductStatus` API.
- Manage donation product statuses using the `changeDonationProductStatus` API.
- Protected routes to ensure only authenticated users can access certain features.

## Project Structure
```
tinytreasure-admin-portal
├── public
│   ├── index.html          # Main HTML entry point
│   └── README.md           # Documentation for the public directory
├── src
│   ├── api
│   │   ├── changeProductStatus.ts          # API for changing product status
│   │   └── changeDonationProductStatus.ts   # API for changing donation product status
│   ├── components
│   │   ├── Login.tsx                       # User authentication component
│   │   ├── ProductStatusManager.tsx        # Component for managing product statuses
│   │   └── DonationStatusManager.tsx       # Component for managing donation statuses
│   ├── routes
│   │   ├── PrivateRoute.tsx                # Route protection component
│   │   └── AppRoutes.tsx                   # Main application routes
│   ├── App.tsx                             # Main application component
│   ├── index.tsx                           # Entry point for the React application
│   └── types
│       └── index.ts                        # TypeScript types and interfaces
├── package.json                             # npm configuration file
├── tsconfig.json                            # TypeScript configuration file
└── README.md                                # Project documentation
```

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd tinytreasure-admin-portal
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage
1. Start the development server:
   ```
   npm start
   ```
2. Open your browser and navigate to `http://localhost:3000` to access the TinyTreasure Admin Portal.

## API Integration
The project integrates with the following APIs:
- `changeProductStatus`: Updates the status of a product in the marketplace.
- `changeDonationProductStatus`: Updates the status of a donation product.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.