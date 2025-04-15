import SearchableLayout from "@/components/searchable-layout";
import { ReactNode, useEffect, useState } from "react";
import BookItem from "@/components/book-item";
import fetchBooks from "@/lib/fetch-books";
import { useRouter } from "next/router";
import { BookData } from "@/types";
import Head from "next/head";

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
      <Head>
        <title>스윗북스 - 검색결과</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="스윗북스 - 검색결과" />
        <meta
          property="og:description"
          content="당신의 도서관을 만들어보세요!"
        />
      </Head>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
