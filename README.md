# Multiplayer TicTacToe Game

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Stack](#technologies-stack)
- [Project Structure](#project-structure)
  - [Client](#client)
  - [Server](#server)
- [Installation and Setup](#installation-and-setup)
  - [Clone Repository](#clone-repository)
  - [Environment Variables](#environment-variables)
  - [Running the Client](#running-the-client)
  - [Running the Server](#running-the-server)
- [Usage](#usage)
- [References](#references)
- [License](#license)

## Introduction
This project is a real-time multiplayer TicTacToe web application with user authentication, game boards, and chat functionality.
The application includes separate client and server components, supporting real-time interaction and user management.

## Features
- User authentication (Login and Signup).
- Real-time gameplay with an interactive board.
- Join and manage games.
- About and informational pages.

## Technologies Stack
- **Frontend:** React, CSS
- **Backend:** Express.js
- **Environment Management:** dotenv
- **Deployment:** Deployed and accessible at https://tic-tac-toe-muliplayer.vercel.app/

## Project Structure
### Client
The client is responsible for the user interface and interaction. It is built using React.

#### Folder and File Structure
```
client/
|-- src/
    |-- components/
        |-- header.js
        |-- header.css
        |-- Login.js
        |-- Signup.js
        |-- form.css
        |-- joinGame.js
        |-- About.js
        |-- InteractiveBoard.js
        |-- About.css
        |-- InteractiveBoard.css
        |-- game.js
        |-- game.css
        |-- result.js
        |-- result.css
        |-- bord.js
        |-- square.js
        |-- customeinput.js
    |-- App.css
    |-- App.js
    |-- index.js
```

### Server
The server handles API requests and backend logic, including user authentication and game management.

#### Folder and File Structure
```
server/
|-- API/
    |-- index.js
|-- .env (Environment Variables)
```

## Installation and Setup
To run the project locally, follow these steps:

### Prerequisites
Ensure you have the following installed:
- Node.js
- npm or yarn

### Clone the Repository:
``` bash
  git clone https://github.com/DuaRuben/TicTacToeMuliplayer.git
```

### Environment Variables
Create a `.env` file in the `server/` directory with the required environment variables:
```
API_KEY  = YOUR_API_KEY_HERE;
API_SECRET = YOUR_API_SCERET_HERE;
```

### Running the Client
1. Navigate to the `client/` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the client:
   ```bash
   npm start
   ```
   The client should now be running on `http://localhost:3000`.

### Running the Server
1. Navigate to the `server/` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
   The server should now be running on the default port: 3001.

## Usage
- Open the client application in your browser at `http://localhost:3000`.
- Signup or login to access the features.
- Join a game to start playing.
- View results and interact with the interactive board.

## References

- [Stream Chat API Documentation](https://getstream.io/chat/docs/)
- [YouTube Tutorial 1](https://www.youtube.com/watch?v=Iw1YmBoOYb4&t=3878s)
- [YouTube Tutorial 2](https://www.youtube.com/watch?v=i8fAO_zyFAM)

## License
This project is licensed under the MIT License. See the `LICENSE` file for more information.

