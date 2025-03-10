import axios from 'axios';
import type { Station } from '@/types/station';

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public details?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

const apiClient = axios.create({
  baseURL: 'https://raw.githubusercontent.com/abax-as',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

export const stationApi = {
  async getStations(): Promise<ApiResponse<Station[]>> {
    try {
      const response = await apiClient.get<Station[]>(
        '/coding-challenge/master/station_codes.json'
      );

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      if (axios.isAxiosError(error)) {
        throw new ApiError(
          error.response?.data?.message || 'Failed to fetch stations',
          error.response?.status,
          { originalError: error }
        );
      }
      throw new ApiError('An unexpected error occurred');
    }
  },
};
