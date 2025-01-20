# AI-Powered Course Generator

This project is a MERN stack application that generates a course structure using AI based on a given course title and description. It includes a React client for user interaction and a Node.js/Express server that integrates with MongoDB and the OpenAI API to create detailed course plans.

## Features

- **AI-Powered Course Generation**: Create structured courses with topics, weekly plans, and lessons using the OpenAI API.
- **AI-Powered Slide per Lesson Creation**: Create lesson content in a slide-like format with bullet points using the OpenAI API.
- **Dynamic Input Handling**: Users can input a course title and description, and the system generates a comprehensive course plan.
- **Client + Server Validation**: Validates user inputs for coherence, relevance, and ethical content before generating a course.
- **MongoDB Integration**: Persist generated courses to MongoDB for easy retrieval and further analysis.
- **User-Friendly UI**: Simple UI created with TailwindCSS and Framer Motion and no UI libraries

## Prerequisites

Ensure you have the following installed on your machine:

- Node.js
- MongoDB (local or cloud instance)
- npm or yarn

## Getting Started

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/ShohruzE/context-task.git
   ```
2. **Set Up the Server**:
  - Navigate to the server folder:
    ```bash
    cd server
    ```
  - Install dependencies:
    ```bash
    npm install
    ```
  - Create a .env file in the root of the server directory with the following variables:
    ```env
    MONGODB_CONNECTION_STRING=your-mongodb-connection-string
    OPENAI_API_KEY=your-openai-api-key
    ```
  - Start the server:
    ```bash
    npm run dev
    ```

    
3. **Set Up the Client**:

  - Navigate to the client folder:
  ```bash
  cd ../client
  ```
  - Install dependencies:
  ```bash
  npm install
  ```
  - Start the client:
  ```bash
  npm run dev
  ```

4. **Access the Application**:
Open your browser and navigate to http://localhost:5173

## Tech Stack

- **Frontend:** React, React Router, TailwindCSS, Framer Motion, Lucide
- **Backend:** Node.js, Express.js, MongoDB + Mongoose, OpenAI API, Zod
