import fetchOneBook from "@/lib/fetch-one-book";
import style from "@/pages/book/[id].module.css";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id as string;
  const book = await fetchOneBook(Number(id));
  console.log(book);

  return {
    props: { book },
  };
};

export const getStaticPaths = () => {
  return {
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
    ],
    fallback: true,
  };
};

export default function Page({
  book,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback)
    return (
      <>
        <Head>
          <title>스윗북스</title>
          <meta property="og:image" content="/thumbnail.png" />
          <meta property="og:title" content="스윗북스" />
          <meta
            property="og:description"
            content="당신의 도서관을 만들어보세요!"
          />
        </Head>
        <div>Loading...</div>
      </>
    );

  if (!book) {
    return <div>책을 찾을 수 없습니다.</div>;
  }

  const { title, subTitle, description, author, publisher, coverImgUrl } = book;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:image" content={coverImgUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>
      <div className={style.container}>
        <div
          className={style.cover_img_container}
          style={{ backgroundImage: `url('${coverImgUrl}')` }}
        >
          <img src={coverImgUrl} alt={title} />
        </div>
        <div className={style.title}>{title}</div>
        <div className={style.subTitle}>{subTitle}</div>
        <div className={style.author}>
          {author} | {publisher}
        </div>
        <div className={style.description}>{description}</div>
      </div>
    </>
  );
}
