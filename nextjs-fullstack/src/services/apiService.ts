interface ApiRequestOptions {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  endpoint: string;
  data?: any;
  headers?: Record<string, string>;
}

interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  error?: string;
  data?: T;
}

export async function sendApiRequest<T = any>({
  method,
  endpoint,
  data,
  headers = {}
}: ApiRequestOptions): Promise<ApiResponse<T>> {
  try {
    const config: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    };

    if (data && method !== 'GET') {
      config.body = JSON.stringify(data);
    }

    const response = await fetch(endpoint, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      return {
        success: false,
        error: errorData?.error || `Request failed with status ${response.status}`,
      };
    }

    const responseData = await response.json().catch(() => null);
    return {
      success: true,
      data: responseData,
    };
  } catch (error) {
    return {
      success: false,
      error: 'Network error. Please check your connection and try again.',
    };
  }
}

// Specific function for api calling
export async function registerUser(userData: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) {
  return sendApiRequest({
    method: 'POST',
    endpoint: '/api/auth/register',
    data: userData,
  });
}

export async function loginUser(userData: {
  email: string,
  password: string,
}) {
  return sendApiRequest({
    method: 'POST',
    endpoint: '/api/auth/login',
    data: userData,
  });
}