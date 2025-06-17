import type { NYTimesArchiveResponse } from "../types/news";
import { apiService } from "./apiService";

export const newsService = {
  getArchiveNews: async (
    year: number,
    month: number,
  ): Promise<NYTimesArchiveResponse> => {
    try {
      return await apiService.getArchiveNews(year, month);
    } catch (error) {
      console.error("Error in newsService:", error);
      throw new Error("Failed to load news data");
    }
  },

  setMockMode: (useMock: boolean): void => {
    apiService.setMockMode(useMock);
  },

  testConnection: async (): Promise<boolean> => {
    return await apiService.testConnection();
  },
};
