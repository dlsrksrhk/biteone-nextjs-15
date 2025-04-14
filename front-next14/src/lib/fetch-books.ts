import { BookData } from "@/types";

export default async function fetchBooks(q?: string): Promise<BookData[]> {
  let url = `http://localhost:12345/book`;

  if (q) {
    url += `/search?q=${encodeURIComponent(q)}`;
  }

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
}
