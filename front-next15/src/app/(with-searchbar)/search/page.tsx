import BookItem from "@/components/book-item";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";
import { BookData } from "@/types";
import { delay } from "@/util/delay";
import { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
  }>;
}): Promise<Metadata> {
  const param = await searchParams;

  return {
    title: `${param.q} 검색 결과`,
    description: `${param.q} 검색 결과입니다.`,
    openGraph: {
      title: `${param.q} 검색 결과`,
      description: `${param.q} 검색 결과입니다.`,
      siteName: "ONEBITE BOOKS",
      images: ["/thumbnail.png"],
    },
  };
}

async function SearchResult({ q }: { q: string }) {
  await delay(1500);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`
  );

  if (!response.ok) {
    return <div>어머 ! 에러가 발생했어요.</div>;
  }

  const books: BookData[] = await response.json();

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
  }>;
}) {
  await delay(1500);

  const param = await searchParams;

  return (
    <Suspense key={param.q} fallback={<BookListSkeleton count={3} />}>
      <SearchResult q={param.q || ""} />
    </Suspense>
  );
}
