import BookItem from "@/components/book-item";
import style from "./page.module.css";
import { BookData } from "@/types";
import { delay } from "@/util/delay";
import { Suspense } from "react";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ONEBITE BOOKS",
  description: "원바이트 북스에 오신 것을 환영합니다.",
  openGraph: {
    title: "ONEBITE BOOKS",
    description: "원바이트 북스에 오신 것을 환영합니다.",
    siteName: "ONEBITE BOOKS",
    images: ["/thumbnail.png"],
  },
};

async function AllBooks() {
  console.log("AllBooks 컴포넌트 렌더링");
  await delay(1500);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`
  );

  if (!response.ok) {
    return <div>어머 ! 에러가 발생했어요.</div>;
  }

  const allBooks: BookData[] = await response.json();

  return (
    <div>
      {allBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

async function RecoBooks() {
  console.log("RecoBooks 컴포넌트 렌더링");
  await delay(2000);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    return <div>어머 ! 에러가 발생했어요.</div>;
  }

  const recoBooks: BookData[] = await response.json();

  return (
    <div>
      {recoBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

export default function Home() {
  console.log("Home 컴포넌트 렌더링");
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <Suspense fallback={<BookListSkeleton count={3} />}>
          <RecoBooks />
        </Suspense>
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <Suspense fallback={<BookListSkeleton count={3} />}>
          <AllBooks />
        </Suspense>
      </section>
    </div>
  );
}
