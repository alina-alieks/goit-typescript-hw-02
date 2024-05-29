import axios from "axios";
import { Image } from "./types";

axios.defaults.baseURL = "https://api.unsplash.com";
const ACCESS_KEY = "3h13eI8G5eRNqDzhXDTqCm4t8gUB_oRFv59auvyxRTU";

interface APIreturn {
  response: Image[];
  totalPage: number;
}

export default async function apiRequest(
  value: string,
  currentPage: number
): Promise<APIreturn> {
  const response = await axios.get("/search/photos", {
    params: {
      client_id: ACCESS_KEY,
      query: value,
      page: currentPage,
      per_page: 12,
      orientation: "landscape",
      lang: "en",
    },
  });

  return {
    response: response.data.results.map((image: any) => ({
      id: image.id,
      urls: {
        regular: image.urls.regular,
        small: image.urls.small,
      },
      description: image.description,
    })),
    totalPage: response.data.total_pages,
  };
}
