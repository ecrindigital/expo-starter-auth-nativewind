/**
 * Utility functions for handling errors
 */

/**
 * Get a user-friendly error message from an error object
 */
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  return 'An unknown error occurred';
};

/**
 * Log an error to the console in development
 */
export const logError = (error: unknown, context?: string): void => {
  if (__DEV__) {
    console.error(`Error${context ? ` in ${context}` : ''}:`, error);
  }
};

/**
 * Categorize errors for better error handling
 */
export enum ErrorCategory {
  NETWORK = 'network',
  AUTHENTICATION = 'authentication',
  VALIDATION = 'validation',
  SERVER = 'server',
  UNKNOWN = 'unknown',
}

/**
 * Categorize an error based on its type or message
 */
export const categorizeError = (error: unknown): ErrorCategory => {
  const message = getErrorMessage(error).toLowerCase();

  if (
    message.includes('network') ||
    message.includes('connection') ||
    message.includes('timeout')
  ) {
    return ErrorCategory.NETWORK;
  }

  if (
    message.includes('authentication') ||
    message.includes('unauthorized') ||
    message.includes('forbidden') ||
    message.includes('token') ||
    message.includes('login') ||
    message.includes('password')
  ) {
    return ErrorCategory.AUTHENTICATION;
  }

  if (
    message.includes('validation') ||
    message.includes('required') ||
    message.includes('invalid') ||
    message.includes('format')
  ) {
    return ErrorCategory.VALIDATION;
  }

  if (
    message.includes('server') ||
    message.includes('500') ||
    message.includes('503') ||
    message.includes('504')
  ) {
    return ErrorCategory.SERVER;
  }

  return ErrorCategory.UNKNOWN;
};
