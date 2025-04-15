import SearchableLayout from "@/components/searchable-layout";
import { ReactNode, useEffect, useState } from "react";
import BookItem from "@/components/book-item";
import fetchBooks from "@/lib/fetch-books";
import { useRouter } from "next/router";
import { BookData } from "@/types";

// export const getStaticProps = async (context: GetStaticProps) => {
//   const q = context.query.q as string; //constext.query 사용 불가능능
//   const books = await fetchBooks(q);
//   console.log(context);

//   return {
//     props: { books },
//   };
// };

export default function Page() {
  console.log("search page!!");
  const router = useRouter();
  const q = router.query.q as string;
  const [books, setBooks] = useState<BookData[]>([]);

  const fetchSerachResult = async (q: string) => {
    const books = await fetchBooks(q);
    setBooks(books);
  };

  useEffect(() => {
    if (q) {
      fetchSerachResult(q);
    }
  }, [q]);

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
