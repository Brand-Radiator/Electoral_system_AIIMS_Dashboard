// apiService.ts
// export const API_BASE_URL = 'http://165.22.219.69:5002'
export const API_BASE_URL = 'http://localhost:5002';

const apiService = {
  get: async <T>(endpoint: string, queryParams: Record<string, any> = {}): Promise<T> => {
    const url = new URL(`${API_BASE_URL}/${endpoint}`);

    // Append query parameters
    Object.keys(queryParams).forEach(key => {
      url.searchParams.append(key, queryParams[key]);
    });

    try {
      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      return await response.json() as T;
    } catch (error) {
      throw error;
    }
  },

  post: async <T>(endpoint: string, data: any): Promise<T> => {
    const url = `${API_BASE_URL}/${endpoint}`;
  //  console.log(data, "FFDFDFD");

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          // 'Content-Type': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      return await response.json() as T;
    } catch (error) {
      throw error;
    }
  },

  patch: async <T>(endpoint: string, data: any): Promise<T> => {
    const url = `${API_BASE_URL}/${endpoint}`;

    try {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      return await response.json() as T;
    } catch (error) {
      throw error;
    }
  },


  put: async <T>(endpoint: string, data: any): Promise<T> => {
    const url = `${API_BASE_URL}/${endpoint}`;

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      return await response.json() as T;
    } catch (error) {
      throw error;
    }
  },

  delete: async <T>(endpoint: string): Promise<T> => {
    const url = `${API_BASE_URL}/${endpoint}`;

    try {
      const response = await fetch(url, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      return await response.json() as T;
    } catch (error) {
      throw error;
    }
  },
};

export default apiService;
