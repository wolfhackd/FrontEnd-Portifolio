import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useFetchCategoriesWithTech() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API}/category`);
      return res.data;
    },
  });
}
