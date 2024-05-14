This is a React application that fetches and displays data from the Dog API (https://dogapi.dog). It uses the @tanstack/react-query library for data fetching and caching.
Features

    List all dog breeds
    Display details of a specific breed
    List dog facts
    List dog groups

Prerequisites
Before running the application, make sure you have the following installed:

    Node.js (version 14 or later)
    npm (Node Package Manager)

Installation

    Clone the repository:

git clone https://github.com/your-username/dog-api-app.git

    Navigate to the project directory:

cd dog-api-app

    Install the dependencies:

npm install

Usage

    Start the development server:

npm start

This will start the development server and open the application in your default web browser.

    The application will display the "Dog API" heading and the following components:

    Dog Breeds: A list of all dog breeds fetched from the API.
    Breed Details: Details of a specific breed, including name, minimum and maximum life span, description, and whether it's hypoallergenic or not.
    Dog Facts: A list of dog facts fetched from the API.
    Dog Groups: A list of dog groups fetched from the API.

Dependencies
The application uses the following dependencies:

    @tanstack/react-query: A powerful library for data fetching and caching in React applications.
    react: The core React library.
    react-dom: The entry point to the DOM rendering path for React.
