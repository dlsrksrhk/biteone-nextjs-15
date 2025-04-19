import style from "./review-editor.module.css";
import { createReviewAction } from "@/actions/create-review-action";

export default function ReviewEditor({ bookId }: { bookId: string }) {
  return (
    <section>
      <form className={style.form_container} action={createReviewAction}>
        <input type="hidden" name="bookId" value={bookId} readOnly />
        <textarea required name="content" placeholder="리뷰를 입력하세요." />
        <div className={style.submit_container}>
          <input required name="author" type="text" placeholder="작성자" />
          <button type="submit">리뷰 등록</button>
        </div>
      </form>
    </section>
  );
}
