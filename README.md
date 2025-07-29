# Nexus

A modern React application built with TypeScript, Sass, React Router, and Zustand.

## Features

- ⚛️ **React 19** with TypeScript
- 🎨 **Sass** with CSS Modules
- 🛣️ **React Router** for navigation
- 🗃️ **Zustand** for state management
- 🔐 **Authentication System** with protected routes
- 📝 **ESLint** and **Prettier** for code quality
- 📱 Responsive design

## Authentication System

### Features
- **Login/Logout**: Secure authentication with cookie-based tokens
- **Protected Routes**: Automatic redirection to login for unauthenticated users
- **Remember Me**: Option to save login credentials
- **Environment Switching**: Toggle between development and production APIs
- **User Menu**: Display user information and logout option

### API Integration
- **Backend Communication**: Integrated with backoffice project's API structure
- **Token Management**: HttpOnly cookies for secure token storage
- **Error Handling**: Comprehensive error handling for authentication failures

### Environment Configuration
- **Development**: `https://api.onedegreelabs.io`
- **Production**: `https://api.glimpse.rsvp`
- **Local Storage**: Environment preference stored in browser

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Available Scripts

- `npm start` - Start the development server
- `npm run build` - Build the app for production
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run format` - Format code with Prettier

## Project Structure

```
src/
├── app/              # App configuration and providers
│   ├── store/        # Zustand stores (auth, theme, sidebar)
│   └── providers/    # Context providers
├── pages/            # Page components
│   ├── SignIn/       # Authentication page
│   └── ...           # Other pages
├── shared/           # Shared utilities and components
│   ├── api/          # API communication layer
│   ├── types/        # TypeScript type definitions
│   └── ui/           # Reusable UI components
├── widgets/          # Layout components
│   ├── Header/       # Navigation header
│   └── Sidebar/      # Sidebar navigation
└── styles/           # Global styles
```

## Authentication Flow

1. **Login**: User enters credentials on `/signin` page
2. **Token Storage**: Server sets HttpOnly cookie with authentication token
3. **Route Protection**: Protected routes check authentication status
4. **Auto-redirect**: Unauthenticated users redirected to login
5. **Logout**: Server clears cookie, local state reset

## Technologies Used

- React 19
- TypeScript
- Sass
- React Router DOM
- Zustand
- Axios
- ESLint
- Prettier

## License

This project is licensed under the MIT License.
