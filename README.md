# Everstoke Rides Manager

A React application for managing and reviewing mountain bike rides in the Everstoke area.

## Features

- View all mountain bike rides in a sortable table
- Add new rides with details like difficulty, distance, and elevation
- Edit and delete existing rides
- Filter rides by area and difficulty
- Responsive design that works on desktop and mobile
- Real-time data synchronization with Firebase

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- Firebase account (for the backend)

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/ashlynaiu/everstoke-rides.git
   cd everstoke-rides
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Firestore Database
   - Go to Project Settings > General > Your Apps > Web App
   - Register your app and copy the configuration
   - Create a `.env` file in the root directory and add your Firebase configuration:
     ```
     REACT_APP_FIREBASE_API_KEY=your-api-key
     REACT_APP_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
     REACT_APP_FIREBASE_PROJECT_ID=your-project-id
     REACT_APP_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
     REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
     REACT_APP_FIREBASE_APP_ID=your-app-id
     ```

4. **Start the development server**
   ```bash
   npm start
   ```
   This will start the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production to the `build` folder
- `npm run eject` - Ejects the app (use with caution)

## Project Structure

```
src/
  ├── components/     # Reusable UI components
  ├── features/       # Feature-based modules
  │   └── rides/      # Rides feature
  ├── firebase/       # Firebase configuration and services
  ├── hooks/          # Custom React hooks
  ├── pages/          # Page components
  ├── store/          # Redux store configuration
  ├── types/          # TypeScript type definitions
  ├── utils/          # Utility functions
  ├── App.tsx         # Main App component
  └── index.tsx       # Application entry point
```

## Deployment

To deploy the application to production:

1. Build the application:
   ```bash
   npm run build
   ```

2. Deploy to Firebase Hosting:
   ```bash
   firebase login
   firebase init
   firebase deploy
   ```

## Technologies Used

- React 18
- TypeScript
- Redux Toolkit
- Firebase (Firestore, Authentication)
- React Router
- Tailwind CSS
- React Hook Form
- Hero Icons

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Create React App](https://create-react-app.dev/)
- [Firebase](https://firebase.google.com/)
- [Tailwind CSS](https://tailwindcss.com/)
