import fetchOneBook from "@/lib/fetch-one-book";
import style from "@/pages/book/[id].module.css";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const id = context.params!.id as string;
  const book = await fetchOneBook(Number(id));
  console.log(book);

  return {
    props: { book },
  };
};

export default function Page({
  book,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!book) {
    return <div>책을 찾을 수 없습니다.</div>;
  }

  const { id, title, subTitle, description, author, publisher, coverImgUrl } =
    book;

  return (
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
  );
}
