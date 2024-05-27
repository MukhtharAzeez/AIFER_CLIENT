
# Frontend Project

This frontend project is created using React with Vite. It includes custom components such as `Loading`, `Button`, `Alert`, `Card`, `InputField`, `Title`, and `EmptyComponent`. The project leverages React hooks like `useState`, `useEffect`, and `useContext` for state management and side effects.

## Table of Contents

- [Project Setup](#project-setup)
- [Available Scripts](#available-scripts)
- [Custom Components](#custom-components)
- [Project Structure](#project-structure)

## Project Setup

To set up the project locally, follow these steps:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/MukhtharAzeez/AIFER_CLIENT.git
    cd AIFER_CLIENT
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Start the development server:**

    ```bash
    npm run dev
    ```

4. **Build the project for production:**

    ```bash
    npm run build
    ```

5. **Preview the production build:**

    ```bash
    npm run serve
    ```

## Available Scripts

In the project directory, you can run the following scripts:

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm run serve`: Previews the production build.

## Custom Components

The project includes several custom components to enhance reusability and maintainability:

- **Loading**: Displays a loading spinner.
- **Button**: A customizable button component.
- **Alert**: Shows alert messages.
- **Card**: A card layout component.
- **InputField**: A customizable input field.
- **Title**: A component for displaying titles.
- **EmptyComponent**: Displays a message when there is no data.

## Project Structure

The project structure is organized as follows:

```
├── public
│   └── index.html                      # The main HTML file
├── src
|   ├── api 
│   │   ├── axios.js                    # Axios Instance
│   │   ├── meter.js                    # API's
│   ├── assets                          # Static assets (images, fonts, etc.)
│   ├── components                      # Custom React components
│   │   └── Shared                      # Context for alert, loading, etc..
│   │       ├── Alert.jsx               # Alert component
│   │       ├── Button.jsx              # Button component
│   │       ├── Card.jsx                # Card component
│   │       ├── EmptyComponent.jsx      # Empty state component
│   │       ├── InputField.jsx          # Input field component
│   │       ├── Loading.jsx             # Loading spinner component
│   │       └── Title.jsx               # Title component
│   │   └── user                        # Context for alert, loading, etc..
│   │       ├── Components 
                only used by the user   # Alert component
│   ├── contexts                        # Contexts for state management
│   │   └── AlertContext.jsx            # Context for alert, loading, etc..
│   ├── pages                           # Page components (if using a multi-page setup)
│   │   ├── Home.jsx                    # Home page component
│   │   └── MeterDetails.jsx            # About page component
│   │   └── PricingPlan.jsx             # Pricing plan component
│   ├── App.jsx                         # Main App component
│   ├── App.css                         # CSS and styling files
│   ├── index.jsx                       # Main entry point for React
│   ├── index.css                       # Global style file. 
│   └── vite.config.js                  # Vite configuration file
├── .gitignore                          # Files and directories to ignore in Git
├── package.json                        # Project metadata and dependencies
├── README.md                           # Project documentation