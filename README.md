# Erino React internship

## About

This is a React.js, Express.js, MongoDB based contact manager application. This web-app will allow for users to add, update and delete contact entries.

## Why MongoDB?

I've used mongodb because of its ease to Setup and its scalability and my unfamiliarity with it (providing me a new learning opportunity).

### Key Technical Decisions

- Frontend: The frontend is built using React for its flexibility and efficient rendering.
- Backend: The backend is built with Express.js, which provides a lightweight framework to handle HTTP calls.

### How It Works

The react application interacts with the backend API to perform CRUD operations. The backend is set up using express.js with API endpoints as instructed that interact with Mongo. Finally, MongoDB stores contact data in a collection.

### Schema

\_id: randomly created using mongoose library feature
firstName: Holds the firstName of contact
lastName: Holds the lastName of contact
email: Holds the email adresses of contacts
phoneNumber: 10 digit contact number
company: The organization of work of the contact
role: Job title of contact at company

## Steps to Set Up and Run the Project

#### 1. Clone the Repository

Firstly, clone the repository from GitHub to local machine

#### 2. Set up the environment variable

Environment variable 'CONNECTION STRING' which links a MongoDB collection to the server and client

#### 3. Start the server side and client side engines

First, navigate to 'erino-client' in directory run 'npm install' and then 'npm run dev'
Second, navigate to 'erino-server' in directory run 'npm install' and then 'npm start'

#### 4. Open localhost client-side on browser

After running 'npm dev', run the website and access the conact management web-application

## Challenges and Solutions

Unfamiliarity with MUI X and MongoDB were the lead challenges I faced in the development of the contact manager application. I faced countless roadblocks to effectively linking the Material UI - Datagrid to the express-js backend architecture. Extracting the correct functions and functionalities that correctly linked the application allowing it to work seamlessly both on the client-side and directly in the database turned out to be a challenging and time consuming process.

To overcome the same, I thoroughly scoured all documentation and had to backtrack code logic using extensive console logging and network logs. I also had to search for various subjective fixes to MUI Datagrid connections.
