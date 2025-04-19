"use client";
import { useActionState, useEffect } from "react";
import style from "./review-editor.module.css";
import { createReviewAction } from "@/actions/create-review-action";

export default function ReviewEditor({ bookId }: { bookId: string }) {
  const [state, formAction, isPending] = useActionState(createReviewAction, {
    status: true,
    message: "",
  });

  useEffect(() => {
    if (state && !state.status) {
      alert(state.message);
    }
  }, [state]);

  return (
    <section>
      <form className={style.form_container} action={formAction}>
        <input type="hidden" name="bookId" value={bookId} readOnly />
        <textarea
          required
          name="content"
          placeholder="리뷰를 입력하세요."
          disabled={isPending}
        />
        <div className={style.submit_container}>
          <input
            required
            name="author"
            type="text"
            placeholder="작성자"
            disabled={isPending}
          />
          <button type="submit" disabled={isPending}>
            {isPending ? "등록중..." : "리뷰 등록"}
          </button>
        </div>
      </form>
    </section>
  );
}
