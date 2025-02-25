import AsyncStorage from "@react-native-async-storage/async-storage";

import { User, LoginCredentials } from "../types/user";

const AUTH_TOKEN_KEY = "auth_token";
const USER_DATA_KEY = "user_data";

const MOCK_USER: User = {
  id: "1",
  email: "user@example.com",
  name: "Test User",
  avatar: "https://via.placeholder.com/150",
};

export default class AuthService {
  /**
   * Login with email and password
   */
  static async login(credentials: LoginCredentials): Promise<User> {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (!credentials.email || !credentials.password) {
        throw new Error("Email and password are required");
      }

      if (credentials.email === "test@example.com" && credentials.password === "password") {
        const token = `mock-jwt-token-${Date.now()}`;
        await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);

        await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(MOCK_USER));

        return MOCK_USER;
      }

      throw new Error("Invalid email or password");
    } catch (error) {
      throw error;
    }
  }

  /**
   * Register a new user
   */
  static async register(userData: LoginCredentials & { name: string }): Promise<User> {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (!userData.email || !userData.password || !userData.name) {
        throw new Error("All fields are required");
      }

      const newUser = {
        ...MOCK_USER,
        email: userData.email,
        name: userData.name,
      };

      const token = `mock-jwt-token-${Date.now()}`;
      await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);

      await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(newUser));

      return newUser;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Logout the current user
   */
  static async logout(): Promise<void> {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      await AsyncStorage.multiRemove([AUTH_TOKEN_KEY, USER_DATA_KEY]);
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  }

  /**
   * Get the current user profile
   */
  static async getCurrentUser(): Promise<User | null> {
    try {
      const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);

      if (!token) {
        return null;
      }

      const userData = await AsyncStorage.getItem(USER_DATA_KEY);

      if (!userData) {
        return null;
      }

      return JSON.parse(userData) as User;
    } catch (error) {
      console.error("Get current user error:", error);
      return null;
    }
  }

  /**
   * Check if the user is authenticated
   */
  static async isAuthenticated(): Promise<boolean> {
    try {
      const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
      return !!token;
    } catch (error) {
      console.error("Auth check error:", error);
      return false;
    }
  }
}
