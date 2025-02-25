# Authentication System Documentation

This document outlines the authentication system implemented in this Expo application.

## Overview

The authentication system provides a complete flow for user authentication, including:

- Login and registration forms
- Protected routes with redirection
- User session management
- Error handling for authentication processes
- Tab-based navigation for authenticated users

## Architecture

The authentication system follows a clean architecture approach with the following components:

### 1. Auth Service

Located in `services/authService.ts`, this service is responsible for handling all authentication operations:

- Login
- Registration
- Logout
- Session checking
- User information retrieval

In the current implementation, the service uses AsyncStorage to persist authentication state locally. In a production application, this would typically make API calls to a backend service.

### 2. Auth Context

Located in `context/AuthContext.tsx`, this provides a global state management solution for authentication:

- User information
- Authentication status
- Loading states
- Error handling
- Authentication operations (login, register, logout)

Components can access the authentication state and operations using the `useAuth` hook provided by the context.

### 3. Auth Flow with Expo Router

Located in `app/_layout.tsx`, the application implements a protected route system using Expo Router:

- Redirects unauthenticated users to the login screen
- Redirects authenticated users away from auth screens
- Handles loading states during authentication checks
- Provides a clean separation between authenticated and unauthenticated UI

### 4. UI Components

- `LoginForm.tsx` - Form for user login
- `RegisterForm.tsx` - Form for user registration
- `LoadingScreen.tsx` - Display during authentication operations
- `Button.tsx` - Reusable button component with support for various states

## Usage

### Accessing Auth State

To access the authentication state in any component:

```tsx
import { useAuth } from '../context/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, isLoading, error } = useAuth();

  // Use auth state in your component
}
```

### Authentication Operations

To perform authentication operations:

```tsx
import { useAuth } from '../context/AuthContext';

function MyComponent() {
  const { login, register, logout } = useAuth();

  // Login example
  const handleLogin = async () => {
    try {
      await login({ email: 'user@example.com', password: 'password' });
      // Success - the router will automatically redirect
    } catch (error) {
      // Handle errors
    }
  };

  // Logout example
  const handleLogout = async () => {
    await logout();
    // User will be redirected to login
  };
}
```

### Protected Routes

The application uses a group layout system to protect routes:

- `(app)/*` - Protected routes, requires authentication
- `auth/*` - Public routes for authentication

Navigation between these routes is handled automatically by the auth system based on the user's authentication state.

## Implementation Details

### Mock Data

For demonstration purposes, the auth service includes mock data:

- Test user credentials: `test@example.com` / `password`
- User data is stored in AsyncStorage

### Error Handling

The system includes utilities for error handling located in `utils/errorHandling.ts`:

- Error message extraction
- Error categorization
- Consistent error formatting

## Next Steps

To extend this authentication system for production:

1. Connect to a real backend API
2. Implement token refresh mechanisms
3. Add additional security features (biometrics, 2FA)
4. Improve error handling with more specific error types
5. Add account recovery flows
