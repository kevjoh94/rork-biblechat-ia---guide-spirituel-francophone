import { Alert } from 'react-native';

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

export class ApiException extends Error {
  status?: number;
  code?: string;

  constructor(message: string, status?: number, code?: string) {
    super(message);
    this.name = 'ApiException';
    this.status = status;
    this.code = code;
  }
}

export const handleApiError = (error: unknown): ApiError => {
  console.error('API Error:', error);

  if (error instanceof ApiException) {
    return {
      message: error.message,
      status: error.status,
      code: error.code,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
    };
  }

  return {
    message: 'Une erreur inattendue s\'est produite',
  };
};

export const showApiError = (error: ApiError) => {
  Alert.alert(
    'Erreur',
    error.message,
    [{ text: 'OK' }]
  );
};

export const makeApiRequest = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new ApiException(
        `Erreur ${response.status}: ${response.statusText}`,
        response.status
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiException) {
      throw error;
    }

    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new ApiException(
        'Erreur de connexion. Vérifiez votre connexion internet.',
        0,
        'NETWORK_ERROR'
      );
    }

    throw new ApiException(
      'Une erreur inattendue s\'est produite',
      500,
      'UNKNOWN_ERROR'
    );
  }
};

export const retryWithBackoff = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> => {
  let lastError: Error;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      
      if (attempt === maxRetries) {
        break;
      }

      // Exponential backoff
      const delay = baseDelay * Math.pow(2, attempt);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError!;
};